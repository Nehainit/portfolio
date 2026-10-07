import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { POST } from "../src/app/api/chat/route.ts";

const originalFetch = globalThis.fetch;
const originalKey = process.env.GROQ_API_KEY;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.GROQ_API_KEY;
  else process.env.GROQ_API_KEY = originalKey;
});

test("chat route sends portfolio context to Groq and returns a reply", async () => {
  process.env.GROQ_API_KEY = "test-key";
  let sentRequest;
  globalThis.fetch = async (url, options) => {
    sentRequest = { url, options };
    return Response.json({ choices: [{ message: { content: "Hi from Neha" } }] });
  };

  const response = await POST(new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "Hi" }] }),
  }));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { reply: "Hi from Neha" });
  assert.equal(sentRequest.url, "https://api.groq.com/openai/v1/chat/completions");
  assert.equal(sentRequest.options.headers.Authorization, "Bearer test-key");
  const body = JSON.parse(sentRequest.options.body);
  assert.equal(body.model, "llama-3.3-70b-versatile");
  assert.match(body.messages[0].content, /Neha Dubey/);
  assert.deepEqual(body.messages[1], { role: "user", content: "Hi" });
});

test("chat route reports a missing server key", async () => {
  delete process.env.GROQ_API_KEY;
  const response = await POST(new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [] }),
  }));

  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: "GROQ_API_KEY is not configured" });
});
