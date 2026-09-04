import json
import os
import urllib.error
import urllib.request
from pathlib import Path
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

HF_TOKEN = os.getenv("HF_TOKEN")
MODEL = "Qwen/Qwen2.5-72B-Instruct"
API_URL = "https://router.huggingface.co/v1/chat/completions"
CONTEXT_PATH = Path(
    os.getenv(
        "CONTEXT_PATH",
        Path(__file__).resolve().parents[1] / "frontend/public/neha-context.md",
    )
)

EXPERIENCE = [
    {
        "role": "Freelance AI Engineer",
        "company": "Client Projects (Remote)",
        "period": "Oct 2025 - Dec 2025",
        "description": "Built AI automation workflows using Langflow and OpenAI, including a Loan Against Property module and Cash Flow RAG system.",
        "technologies": ["Langflow", "OpenAI", "RAG"],
    },
    {
        "role": "Associate Data Engineer",
        "company": "Cummins Inc.",
        "period": "Jun 2024 - Aug 2025",
        "description": "Managed Oracle-to-data-lake migration, built SSIS ETL pipelines, performed Databricks and Snowflake QA, and reduced data latency with Databricks workflows.",
        "technologies": ["Databricks", "SSIS", "PySpark", "SQL"],
    },
    {
        "role": "Data Engineer",
        "company": "Infomo India Pvt Ltd",
        "period": "Jan 2023 - Jun 2024",
        "description": "Led real-time data pipelines and dashboards with Amazon S3, Kafka, Apache Druid, PySpark, and FastAPI; built recommendations and Telco feature extraction workflows.",
        "technologies": ["Kafka", "PySpark", "FastAPI", "Machine Learning"],
    },
    {
        "role": "Data Science Intern",
        "company": "YMeet LLC",
        "period": "May 2022 - Jun 2022",
        "description": "Built a generative chatbot using Hugging Face T5 Transformers.",
        "technologies": ["Python", "Hugging Face", "NLP"],
    },
]

CASE_STUDIES = [
    {
        "area": "Insurance AI",
        "title": "Margin Intelligence",
        "summary": "AI intelligence layer combining machine learning, document analysis, workflow automation, and explainable human review.",
        "description": "Owned the AI/ML layer, including model development, Langflow orchestration, Python APIs, OCR, anomaly and document-integrity signals, explainable outputs, and auditable results. Presented the project at a conference in Singapore.",
        "technologies": ["Python", "Langflow", "Machine Learning", "Generative AI", "OCR", "PostgreSQL"],
        "proof_image": "/margin-intelligence-conference.png",
        "proof_caption": "Conference proof - Singapore - 2026",
    },
    {
        "area": "E-commerce AI",
        "title": "RapidSKU",
        "summary": "Chrome extension helping Meesho suppliers reduce shipping charges and speed up catalog listings.",
        "description": "A Manifest V3 Chrome extension combining shipping-cost optimisation and reusable catalog autofill inside the Meesho supplier workflow. The product has 420+ registered users and 50+ paying customers.",
        "technologies": ["Chrome Extension", "Manifest V3", "JavaScript", "UPI", "Cashfree"],
    },
    {
        "area": "AI Learning Platform · Work in progress",
        "title": "Qurio",
        "summary": "A learn-by-doing AI education platform with guided courses, interactive practice, and an AI learning companion.",
        "description": "A Next.js learning platform for AI, RAG systems, and modern engineering with phase-based courses, interactive assignments, progress tracking, gamification, Clerk authentication, Supabase sync, and Anthropic-powered learning guidance. The product is still actively being developed.",
        "technologies": ["Next.js", "React", "TypeScript", "Clerk", "Supabase", "Anthropic"],
        "project_url": "https://theqrio.com/",
    },
    {
        "area": "RAG",
        "title": "RAG Criminal Defense Research",
        "summary": "Private, locally hosted RAG system for law firms to query criminal defense research material.",
        "github_url": "https://github.com/Nehainit/RAG_criminal-defense-research",
    },
    {
        "area": "AI Agents",
        "title": "AI-Powered ATS",
        "summary": "Applicant tracking workflow with AI-assisted candidate screening and match scoring.",
        "github_url": "https://github.com/Nehainit/AI-powered-ATS",
    },
    {
        "area": "Voice AI",
        "title": "CodeDuck Voice Agent",
        "summary": "Local-first desktop voice coding agent for speaking requests to a coding assistant.",
        "description": "An Electron companion with a local FastAPI service for voice capture, coding context, local model orchestration, and approval-based patch previews.",
        "technologies": ["Electron", "FastAPI", "Ollama", "Whisper", "LangChain"],
        "github_url": "https://github.com/Nehainit/Voice_Agent",
    },
    {
        "area": "Document AI",
        "title": "OCR Comparison",
        "summary": "OCR comparison project for evaluating document text extraction approaches.",
        "description": "A document-AI project focused on comparing OCR outputs and extraction quality across different approaches.",
        "technologies": ["OCR", "Python", "Document AI"],
        "github_url": "https://github.com/Nehainit/OCR_comparision",
    },
    {
        "area": "ETL",
        "title": "AI-Powered ETL Pipeline",
        "summary": "LLM-driven ETL pipeline for automatic schema detection and mapping.",
        "github_url": "https://github.com/Nehainit/AI-ETL-PIPELINE",
    },
    {
        "area": "Data Quality",
        "title": "Real-Time Data Quality Monitor",
        "summary": "AI-powered anomaly detection and root cause analysis for streaming data quality monitoring.",
        "github_url": "https://github.com/Nehainit/data-quality-monitor",
    },
    {
        "area": "Document AI",
        "title": "Bank Statement Extractor",
        "summary": "AI document extraction workflow for parsing bank statements into structured transaction data.",
        "github_url": "https://github.com/Nehainit/bank-statment-extractor",
    },
    {
        "area": "BI Automation",
        "title": "Automated Report Generator",
        "summary": "LLM-powered business intelligence reporting across multiple data sources.",
        "github_url": "https://github.com/Nehainit/automated-report-generator",
    },
    {
        "area": "Langflow",
        "title": "Cash Flow Intelligence",
        "summary": "Financial analysis workflow built with Langflow for cash-flow-oriented intelligence.",
        "github_url": "https://github.com/Nehainit",
    },
    {
        "area": "Langflow",
        "title": "Credit Risk Assessment",
        "summary": "AI-driven credit risk scoring workflow for assessing borrower risk signals.",
        "github_url": "https://github.com/Nehainit",
    },
]

SOCIALS = [
    {
        "name": "Email",
        "handle": "nehadubey1021@gmail.com",
        "description": "For collaborations, AI systems, and project conversations.",
        "url": "mailto:nehadubey1021@gmail.com",
    },
    {
        "name": "GitHub",
        "handle": "Nehainit",
        "description": "AI, RAG, data engineering, and automation projects.",
        "url": "https://github.com/Nehainit",
    },
    {
        "name": "LinkedIn",
        "handle": "nehadubey11",
        "description": "Professional updates on AI and data engineering.",
        "url": "https://www.linkedin.com/in/nehadubey11/",
    },
    {
        "name": "X (Twitter)",
        "handle": "@aboutneha",
        "description": "Updates on AI, data engineering, and projects.",
        "url": "https://x.com/aboutneha",
    },
]


def build_system_prompt(context: str) -> str:
    return f"""You are an AI assistant that responds as Neha Dubey - an AI Engineer.

Your job is to answer questions naturally, confidently, and professionally on Neha's behalf using the context provided.

### BASIC CONVERSATION
Handle greetings and small talk naturally:
- "hi" -> "Hi! I'm Neha. What would you like to know about me?"
- "thank you" -> "You're welcome! Feel free to ask anything else."
Never say "information not found" for greetings or general questions.

### CONTEXT
{context}

### RULES
- Speak as Neha at all times. Use "I" not "she".
- Be warm, confident, clear, and concise.
- Use the context above to answer questions about experience, skills, projects, etc.
- For technical questions (RAG, LLM, data engineering), answer from Neha's perspective with her real experience.
- Keep responses short (2-4 sentences) unless a detailed explanation is needed.
- If asked something truly outside the context, say so politely."""


def load_context() -> str:
    return CONTEXT_PATH.read_text(encoding="utf-8").strip()


class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "*")],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/api/experience")
def experience():
    return EXPERIENCE


@app.get("/api/case-studies")
def case_studies():
    return CASE_STUDIES


@app.get("/api/socials")
def socials():
    return SOCIALS


@app.post("/api/chat")
def chat(payload: ChatRequest):
    if not HF_TOKEN:
        return JSONResponse(
            {"error": "HF_TOKEN is not configured"},
            status_code=500,
        )

    try:
        context = load_context()
    except OSError as error:
        return JSONResponse({"error": f"Context file error: {error}"}, status_code=500)

    body = json.dumps(
        {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": build_system_prompt(context)},
                *[message.model_dump() for message in payload.messages],
            ],
            "max_tokens": 512,
            "temperature": 0.7,
        }
    ).encode()

    request = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {HF_TOKEN}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            data = json.loads(response.read())
    except urllib.error.HTTPError as error:
        detail = error.read().decode()
        return JSONResponse(
            {"error": f"HuggingFace API error: {detail}"},
            status_code=error.code,
        )
    except Exception as error:
        return JSONResponse({"error": f"Server error: {error}"}, status_code=500)

    reply = (data.get("choices") or [{}])[0].get("message", {}).get(
        "content",
        "Sorry, I couldn't generate a response.",
    )
    return {"reply": reply}
