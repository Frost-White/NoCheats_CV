import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Shield - Detect CV Attacks",
  description:
    "Detect white text attacks and prompt injection attempts in uploaded CVs using AI",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect fill='%230f0f0f' width='180' height='180'/><path fill='%236366f1' d='M90 30c33.137 0 60 26.863 60 60s-26.863 60-60 60-60-26.863-60-60 26.863-60 60-60zm0 15c-24.853 0-45 20.147-45 45s20.147 45 45 45 45-20.147 45-45-20.147-45-45-45zm0 12c18.225 0 33 14.775 33 33s-14.775 33-33 33-33-14.775-33-33 14.775-33 33-33z'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {children}
        <footer className="fixed bottom-0 left-0 right-0 py-4 px-4 text-center text-gray-500 text-xs">
          CV Shield — powered by Gemini AI
        </footer>
      </body>
    </html>
  );
}
