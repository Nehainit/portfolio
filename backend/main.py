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

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL = "openai/gpt-oss-120b"
API_URL = "https://api.groq.com/openai/v1/chat/completions"
CONTEXT_PATH = Path(
    os.getenv(
        "CONTEXT_PATH",
        Path(__file__).resolve().parents[1] / "frontend/src/content/context.md",
    )
)
PROMPT_PATH = Path(__file__).resolve().parents[1] / "frontend/src/content/chat-instructions.md"

PORTFOLIO = json.loads((Path(__file__).with_name("portfolio.json")).read_text(encoding="utf-8"))


def build_system_prompt(context: str) -> str:
    instructions = PROMPT_PATH.read_text(encoding="utf-8").strip()
    return f"{instructions}\n\n### CONTEXT\n{context}"


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
    return PORTFOLIO["experience"]


@app.get("/api/case-studies")
def case_studies():
    return PORTFOLIO["case_studies"]


@app.get("/api/socials")
def socials():
    return PORTFOLIO["socials"]


@app.post("/api/chat")
def chat(payload: ChatRequest):
    if not GROQ_API_KEY:
        return JSONResponse(
            {"error": "GROQ_API_KEY is not configured"},
            status_code=500,
        )

    try:
        system_prompt = build_system_prompt(load_context())
    except OSError as error:
        return JSONResponse({"error": f"Context file error: {error}"}, status_code=500)

    body = json.dumps(
        {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
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
            "Authorization": f"Bearer {GROQ_API_KEY}",
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
            {"error": f"Groq API error: {detail}"},
            status_code=error.code,
        )
    except Exception as error:
        return JSONResponse({"error": f"Server error: {error}"}, status_code=500)

    reply = (data.get("choices") or [{}])[0].get("message", {}).get(
        "content",
        "Sorry, I couldn't generate a response.",
    )
    return {"reply": reply}
