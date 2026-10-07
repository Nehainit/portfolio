The portfolio chat calls Groq through the Next.js `/api/chat` route. Set `GROQ_API_KEY` in the Netlify site's environment variables with Functions access, then redeploy the site. The browser does not need `NEXT_PUBLIC_API_URL` or a separate FastAPI server for chat.

To update the chat, edit `frontend/src/content/context.md` for Neha's facts and `frontend/src/content/chat-instructions.md` for how the assistant should respond. The backend's experience, case-study, and social API data lives in `backend/portfolio.json`.

The optional FastAPI backend can still be started from the repository root after `pip install -r backend/requirements.txt` with `uvicorn backend.main:app --host 0.0.0.0 --port 4000`.
