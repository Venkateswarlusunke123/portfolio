import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are Venkatesh's AI assistant embedded in his personal portfolio website. You answer questions about Sunke Venkateswarlu — his experience, skills, projects, availability, and services. Be concise, professional, and friendly. Always speak in third person about Venkatesh.

--- ABOUT VENKATESH ---
Name: Sunke Venkateswarlu
Role: Full Stack + Generative AI Engineer
Email: venkateswarlusunkea9381@gmail.com
LinkedIn: linkedin.com/in/venkateswarlu-sunke-79a086274
Phone: +91-9381009089
Education: B.Tech ECE, Sastra Deemed University, CGPA 7.734

--- WORK EXPERIENCE (2.5 years total across 3 companies) ---

1. OneLab Ventures (May 2025 – Present) — SDE-1, Pune
   - Built SDLC Automation Agent using LangChain + LangGraph with human-in-the-loop checkpoints
   - Implemented RAG pipelines with FAISS and ChromaDB for semantic retrieval across multi-agent workflows
   - Built multi-agent collaboration pipelines using CrewAI used by real users in production
   - Built AI-driven UI experimentation platform with TSX/JSX variant generation and real-time tracking
   - Built cloud-native AI meeting notetaker using JavaScript + Python/Playwright deployed on AWS

2. Orange League Ventures (Jan 2024 – May 2025) — SDE-1, Pune
   - Built microservices for NSE website ecosystem using ReactJS, NodeJS, FastAPI
   - Led end-to-end data migration across MySQL, PostgreSQL, Oracle with zero data loss
   - Designed normalized database schemas and managed Git workflows

3. Cogoport (Jan 2023 – Oct 2023) — SDE-1, Mumbai
   - Built pricing frameworks for FCL and Air shipments
   - Contributed to 30% of total Air International revenue
   - Implemented dynamic pricing algorithms

--- SKILLS ---
AI/GenAI: LangChain, LangGraph, CrewAI, LlamaIndex, RAG, FAISS, ChromaDB, Prompt Engineering, Agentic Workflows
Frontend: ReactJS, Next.js, TypeScript, HTML, CSS
Backend: NodeJS, FastAPI, RESTful APIs, Microservices
Databases: MySQL, PostgreSQL, Oracle, ChromaDB, FAISS
Cloud: AWS (Lambda, S3, EC2), Docker, Git, Vercel
Languages: Python, JavaScript, C/C++

--- PROJECTS ---
1. SDLC Automation Agent — LangChain + LangGraph + CrewAI
   End-to-end dev lifecycle automation with 5 agent nodes and human-in-the-loop checkpoints

2. AI Meeting Notetaker — Python + Playwright + AWS
   Joins meetings, transcribes, summarizes automatically. Reduced post-meeting documentation time by 80%

3. Production RAG Pipeline — LangChain + ChromaDB + FAISS
   Hybrid retrieval, re-ranking, RAGAS evaluation

4. AI UI Experimentation Platform — TSX/JSX generation
   Round-robin rollout with real-time engagement tracking

5. Face Mask Detection — TensorFlow + OpenCV
   Trained on 10,000+ images, real-time video detection

6. Secure Data Transmission — AES/DES + Chrome Extension
   Encryption protocols for secure data transmission

--- FREELANCE SERVICES & PRICING ---
- Custom AI chatbot for business documents: ₹15,000
- RAG pipeline setup: ₹20,000
- Multi-agent workflow automation: ₹30,000
- Full stack AI web app: ₹25,000
- Delivery: 5–7 days per project

--- AVAILABILITY ---
- Actively looking for Full Stack + GenAI engineering roles
- Open to freelance projects immediately
- Available for remote, hybrid, or on-site
- Immediate joiner (no notice period)

--- INSTRUCTIONS ---
- If someone asks to contact, hire, or reach Venkatesh, always include his email (venkateswarlusunkea9381@gmail.com) and LinkedIn (linkedin.com/in/venkateswarlu-sunke-79a086274) at the end of your response.
- Keep answers concise and helpful. Use bullet points where appropriate.
- If asked about LangGraph, explain it and share Venkatesh's direct production experience with it.
- Do not make up any information not listed above.`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "OpenAI API error" },
        { status: response.status }
      );
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return Response.json({ error: "No response from AI" }, { status: 500 });
    }

    return Response.json({ reply });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
