import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";

// Rate limiting: store IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove timestamps older than the window
  const validTimestamps = timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW
  );

  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    return false; // Rate limited
  }

  // Add current timestamp
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  return true; // Not rate limited
}

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    // Set up the worker for pdf-parse
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (error) {
    throw new Error(
      `Failed to extract text from PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientIp = getClientIp(request);
     if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 5 requests per minute." },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided or file is not a valid File object" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const bufferNode = Buffer.from(buffer);

    // Extract text from PDF
    let cvText = await extractTextFromPdf(bufferNode);

    // Check if text was successfully extracted
    if (cvText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract readable text from this PDF" },
        { status: 400 }
      );
    }

    // Truncate text if too long (max 15,000 characters)
    const maxLength = 15000;
    if (cvText.length > maxLength) {
      cvText = cvText.substring(0, maxLength);
    }

    // Analyze with Gemini
    const analysisResult = await analyzeWithGemini(cvText);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("API error:", error);

    if (
      error instanceof Error &&
      error.message.includes("GEMINI_API_KEY")
    ) {
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while analyzing the CV",
      },
      { status: 500 }
    );
  }
}
