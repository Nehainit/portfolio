# Portfolio

This project is split into two folders:

- `frontend/` - Next.js portfolio UI
- `backend/` - FastAPI API for the chat widget

## Getting Started

Start the backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
HF_TOKEN=your_huggingface_token uvicorn main:app --reload --port 4000
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The frontend uses `http://localhost:4000` for chat by default. Set `NEXT_PUBLIC_API_URL` if the backend runs somewhere else.

Set `NEXT_PUBLIC_CAL_URL` to your Cal.com booking link to show the calendar button in the contact section. Without it, the button opens an email.

Chat context lives at `frontend/public/neha-context.md`. The backend reads that path by default; set `CONTEXT_PATH` to use another file.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
