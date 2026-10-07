The portfolio chat uses a FastAPI backend and Groq. Install the backend dependencies with `pip install -r backend/requirements.txt`, set `GROQ_API_KEY` in the backend environment, and start it from the repository root with `uvicorn backend.main:app --host 0.0.0.0 --port 4000`.

Set `NEXT_PUBLIC_API_URL` for the frontend if the backend is hosted somewhere other than `http://localhost:4000`.

To update the chat, edit `backend/context.md` for Neha's facts and `backend/chat-instructions.md` for how the assistant should respond. The backend's experience, case-study, and social API data lives in `backend/portfolio.json`.
