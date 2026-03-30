import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sunke Venkateswarlu | Full Stack & Generative AI Engineer",
  description:
    "Portfolio of Sunke Venkateswarlu — Full Stack & Generative AI Engineer specializing in LangChain, LangGraph, CrewAI, Agentic Workflows, ReactJS, NodeJS, and FastAPI.",
  keywords: [
    "Sunke Venkateswarlu",
    "Full Stack Engineer",
    "Generative AI",
    "LangChain",
    "LangGraph",
    "CrewAI",
    "RAG",
    "FAISS",
    "ReactJS",
    "NodeJS",
    "FastAPI",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
