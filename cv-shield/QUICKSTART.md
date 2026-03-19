# CV Shield - Quick Start Guide

Welcome to CV Shield! This is a complete production-ready application for detecting adversarial attacks in CVs.

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Google Gemini API key** ([Get one here](https://ai.google.dev/))
- A terminal/command prompt
- A code editor (VS Code recommended)

## 🚀 Setup Instructions

### Step 1: Navigate to the Project

```bash
cd path/to/cv-shield
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14 and React
- Tailwind CSS for styling
- pdf-parse for PDF text extraction
- lucide-react for icons
- TypeScript for type safety
- All development dependencies

The installation may take 2-3 minutes.

### Step 3: Configure Environment Variables

1. In the cv-shield folder, copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Replace `your_actual_api_key_here` with your real key from Google AI Studio.

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### Step 4: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

### Step 5: Open in Browser

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

You should see the CV Shield interface with a drag-and-drop upload area.

## 🧪 Testing the Application

1. **Prepare a test PDF**:
   - Use a normal CV/resume PDF (max 5MB)
   - Or create a simple test PDF with some text

2. **Upload and analyze**:
   - Drag and drop the PDF onto the upload zone
   - Click "Analyze" button
   - Wait for the analysis (usually 2-5 seconds)

3. **View results**:
   - You'll see a report with:
     - Verdict (Clean / Suspicious / Attacked)
     - Confidence score
     - Any detected threats
     - Recommendations

## 📁 Project Structure

```
cv-shield/
├── app/                    # Next.js app directory
│   ├── api/analyze/       # API endpoint for PDF analysis
│   ├── page.tsx           # Main UI page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── UploadZone.tsx    # File upload component
│   ├── ResultCard.tsx    # Results display
│   └── AttackBadge.tsx   # Threat badges
├── lib/                   # Utilities
│   └── gemini.ts         # Gemini API client
├── types/                # TypeScript types
│   └── analysis.ts       # Type definitions
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── README.md             # Full documentation
```

## 🛠️ Available Commands

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔑 Key Features

✅ **White Text Detection** - Finds hidden text attacks
✅ **Prompt Injection Detection** - Identifies AI manipulation attempts
✅ **Rate Limiting** - 5 requests/minute protection
✅ **Dark Theme** - Professional security aesthetic
✅ **Real-time Analysis** - Fast AI-powered scanning
✅ **Detailed Reports** - Severity levels and samples

## ⚙️ API Details

### Endpoint: POST /api/analyze

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "file=@your_cv.pdf"
```

**Response (Success):**
```json
{
  "verdict": "clean",
  "confidence": 0.95,
  "summary": "No attacks detected in this CV.",
  "attacks_found": [],
  "recommendation": "This CV is safe for processing."
}
```

**Response (Error - Rate Limited):**
```
Status: 429
{ "error": "Rate limit exceeded. Maximum 5 requests per minute." }
```

## 🐛 Troubleshooting

### Problem: Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Problem: Can't connect to Gemini API
- Check your API key is correct in `.env.local`
- Ensure your Gemini API quota hasn't been exceeded
- Verify your internet connection

### Problem: PDF extraction fails
- Ensure PDF is not password protected
- Check PDF is not image-only (must have extractable text)
- Maximum PDF size is 5MB

### Problem: Installation fails
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

## 📚 More Information

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Google Gemini API**: https://ai.google.dev/docs
- **pdf-parse**: https://www.npmjs.com/package/pdf-parse

## 🚀 Deploying to Production

### Option 1: Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Add your `GEMINI_API_KEY` in Environment Variables
5. Deploy!

### Option 2: Traditional Server

```bash
# Build for production
npm run build

# Start server
npm start
```

The app will be available at http://your-domain:3000

## 📝 Notes

- The application processes PDFs server-side and doesn't store uploaded files
- Rate limiting is in-memory (resets when server restarts - use Redis for production)
- Maximum text extraction: 15,000 characters
- Analysis typically takes 2-5 seconds

## ✨ Success!

You're all set! CV Shield is now running and ready to analyze CVs for adversarial attacks.

For questions or issues, check the README.md for detailed documentation.

---

**Happy scanning! 🛡️**
