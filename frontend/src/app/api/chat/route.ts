import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

type Message = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return Response.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
  }

  let messages: Message[];
  try {
    const payload = await request.json();
    if (!Array.isArray(payload?.messages) || !payload.messages.every(
      (message: Message) =>
        (message?.role === "user" || message?.role === "assistant") &&
        typeof message.content === "string",
    )) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }
    messages = payload.messages;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let systemPrompt: string;
  try {
    const contentDir = join(process.cwd(), "src", "content");
    const [instructions, context] = await Promise.all([
      readFile(join(contentDir, "chat-instructions.md"), "utf8"),
      readFile(join(contentDir, "context.md"), "utf8"),
    ]);
    systemPrompt = `${instructions.trim()}\n\n### CONTEXT\n${context.trim()}`;
  } catch (error) {
    console.error("Chat context could not be loaded", error);
    return Response.json({ error: "Chat context is unavailable" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });
    if (!response.ok) {
      console.error("Groq API returned", response.status, await response.text());
      return Response.json({ error: "Groq API error" }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string") {
      return Response.json({ error: "Groq returned no reply" }, { status: 502 });
    }
    return Response.json({ reply });
  } catch (error) {
    console.error("Groq request failed", error);
    return Response.json({ error: "Groq request failed" }, { status: 502 });
  }
}
