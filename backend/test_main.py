import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from backend import main


class ChatProviderTest(unittest.TestCase):
    def test_chat_uses_groq_and_keeps_frontend_response(self):
        class Response:
            def __enter__(self):
                return self

            def __exit__(self, *args):
                pass

            def read(self):
                return b'{"choices":[{"message":{"content":"Hello!"}}]}'

        with patch.object(main, "GROQ_API_KEY", "test-key"), patch.object(
            main.urllib.request, "urlopen", return_value=Response()
        ) as urlopen:
            result = main.chat(main.ChatRequest(messages=[main.Message(role="user", content="Hi")]))

        request = urlopen.call_args.args[0]
        body = json.loads(request.data)
        self.assertEqual(request.full_url, "https://api.groq.com/openai/v1/chat/completions")
        self.assertEqual(request.get_header("Authorization"), "Bearer test-key")
        self.assertEqual(body["model"], "llama-3.3-70b-versatile")
        self.assertEqual(body["messages"][-1], {"role": "user", "content": "Hi"})
        self.assertEqual(result, {"reply": "Hello!"})

    def test_missing_groq_key_names_required_setting(self):
        with patch.object(main, "GROQ_API_KEY", None):
            result = main.chat(main.ChatRequest(messages=[]))

        self.assertEqual(result.status_code, 500)
        self.assertEqual(json.loads(result.body), {"error": "GROQ_API_KEY is not configured"})

    def test_chat_reads_instructions_and_context_from_files(self):
        class Response:
            def __enter__(self):
                return self

            def __exit__(self, *args):
                pass

            def read(self):
                return b'{"choices":[{"message":{"content":"Hello!"}}]}'

        with tempfile.TemporaryDirectory() as directory:
            instructions = Path(directory) / "instructions.md"
            context = Path(directory) / "context.md"
            instructions.write_text("Custom instruction", encoding="utf-8")
            context.write_text("Test fact", encoding="utf-8")
            with patch.object(main, "GROQ_API_KEY", "test-key"), patch.object(
                main, "PROMPT_PATH", instructions, create=True
            ), patch.object(main, "CONTEXT_PATH", context), patch.object(
                main.urllib.request, "urlopen", return_value=Response()
            ) as urlopen:
                main.chat(main.ChatRequest(messages=[]))

        body = json.loads(urlopen.call_args.args[0].data)
        self.assertEqual(body["messages"][0]["content"], "Custom instruction\n\n### CONTEXT\nTest fact")


if __name__ == "__main__":
    unittest.main()
