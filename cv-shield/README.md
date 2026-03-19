# CV Shield

A production-ready web application that detects white text attacks, keyword stuffing, and prompt injection attempts embedded in uploaded CVs using AI-powered analysis.

## Features

- **White Text Attack Detection**: Identifies hidden text attacks in PDFs
- **Prompt Injection Detection**: Flags attempts to manipulate AI resume screeners
- **Multi-threat Analysis**: Detects keyword stuffing, obfuscation, and Unicode manipulation
- **Real-time Analysis**: Fast, AI-powered scanning powered by Google Gemini
- **Rate Limiting**: 5 requests per minute per IP to prevent abuse
- **Dark Theme UI**: Clean, professional security-focused interface

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **PDF Processing**: pdf-parse
- **AI Analysis**: Google Gemini API (gemini-1.5-flash)
- **Icons**: lucide-react

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## How It Works

1. **Upload**: Drop a PDF file (max 5MB) into the upload zone
2. **Extract**: The application extracts text from the PDF using pdf-parse
3. **Analyze**: The extracted text is sent to Google Gemini API for security analysis
4. **Report**: You receive a detailed report showing:
   - Verdict: Clean, Suspicious, or Attacked
   - Confidence score
   - Specific threats detected with severity levels
   - Recommendations for next steps

## API Reference

### POST /api/analyze

**Request**: `multipart/form-data`
- `file`: PDF file to analyze (required, max 5MB)

**Response**: JSON object with analysis results
```json
{
  "verdict": "clean" | "suspicious" | "attacked",
  "confidence": 0.5,
  "summary": "No attacks detected in this CV.",
  "attacks_found": [],
  "recommendation": "This CV appears safe for processing."
}
```

**Error Responses**:
- `400`: Invalid file format or size exceeds 5MB
- `429`: Rate limit exceeded (5 requests per minute)
- `500`: Server error

## Project Structure

```
cv-shield/
├── app/
│   ├── page.tsx              # Main upload page
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global Tailwind styles
│   └── api/
│       └── analyze/
│           └── route.ts      # PDF analysis API endpoint
├── components/
│   ├── UploadZone.tsx        # Drag-drop file upload component
│   ├── ResultCard.tsx        # Analysis results display
│   └── AttackBadge.tsx       # Individual threat display
├── lib/
│   └── gemini.ts             # Gemini API client
├── types/
│   └── analysis.ts           # TypeScript type definitions
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .env.local.example
├── .gitignore
└── README.md
```

## Rate Limiting

The API implements in-memory rate limiting:
- **Limit**: 5 requests per minute per IP address
- **Window**: 1 minute
- **Response**: 429 Too Many Requests when exceeded

## Security Considerations

- PDF files are processed server-side and not stored
- API key is kept secure in environment variables
- Input validation on file type and size
- XSS protection through React's built-in sanitization
- Rate limiting prevents abuse

## Supported Attack Types

- **White Text**: Hidden text attacks with matching background color
- **Keyword Stuffing**: Repetitive keywords with no semantic connection
- **Prompt Injection**: Malicious instructions targeting AI systems
- **Obfuscation**: Base64-encoded or obfuscated strings
- **Unicode Manipulation**: Zero-width spaces, RTL overrides, homoglyphs
- **Other**: Additional adversarial techniques

## Limitations

- Maximum PDF file size: 5MB
- Maximum text extraction: 15,000 characters
- Requires readable PDF (not image-only)
- Requires active Gemini API key

## License

MIT

---

**CV Shield — powered by Gemini AI**
