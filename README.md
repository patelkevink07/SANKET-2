# SANKET

**S**ocial **An**alytics & Network **K**nowledge **E**xtraction **T**echnology

An AI-driven social media analytics platform for real-time sentiment tracking, vernacular (Hindi/Hinglish) NLP, and influence-network mapping — built as a solution for **Smart India Hackathon 2026, Problem Statement #26152**, authored by the **National Technical Research Organisation (NTRO)**.

This repository contains two parts that currently run **independently**:

| | Status |
|---|---|
| **Frontend** (`/src`) — full dashboard UI | ✅ Built, running on demo/mock data |
| **Backend** (`/backend`) — FastAPI service | 🚧 Phase 1 skeleton live; sentiment, demographics, and network analysis logic written and unit-tested, not yet wired to live endpoints or connected to the frontend |

If you're evaluating this project: the **frontend** is what you see running live and shows the intended end-state UX. The **backend** is real, working infrastructure for the next phase, not a finished pipeline yet — see [Backend Status](#backend-status--roadmap) below for exactly what's implemented versus in progress.

---

## Project Structure

```
TEAM-SANKET/
├── backend/                    # FastAPI service (Python)
│   ├── app/
│   │   ├── api/v1/              # posts, ingestion (live) · sentiment, demographics, network (in progress)
│   │   ├── core/                 # config, database
│   │   ├── models/                # SQLAlchemy models (Author, Post, IngestionJob)
│   │   ├── schemas/                # Pydantic schemas
│   │   ├── services/                # sentiment scoring, demographics, network analysis logic
│   │   └── workers/                  # background scoring worker
│   ├── tests/                          # pytest suite (in-memory SQLite, no Docker needed)
│   ├── check_author_diversity.py         # utility script to inspect ingested author diversity
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md                           # backend-specific setup notes
├── src/                                       # React frontend
│   ├── components/                              # dashboard, network graph, knowledge hub, etc.
│   ├── data/                                       # mock data used by the current UI
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## Frontend

### Tech Stack
- [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for charts
- [Motion](https://motion.dev/) for animation
- [Lucide React](https://lucide.dev/) for icons
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) for generative reasoning
- Express (dev server / static serving)

### Running the Frontend

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run lint        # type-check (tsc --noEmit)
npm run clean         # remove build artifacts
```

> **Note:** The dashboard currently renders from data in `src/data/` (mock data), not from the FastAPI backend below — the two aren't wired together yet.

## Backend

### Tech Stack
- [FastAPI](https://fastapi.tiangolo.com/) 0.115
- [SQLAlchemy](https://www.sqlalchemy.org/) 2.0 + PostgreSQL (`psycopg2-binary`)
- [Pydantic](https://docs.pydantic.dev/) / Pydantic Settings
- [Alembic](https://alembic.sqlalchemy.org/) (migrations, not yet in active use — see below)
- [pytest](https://docs.pytest.org/) + `httpx` for testing
- Docker / Docker Compose

### Running the Backend

```bash
cd backend
cp ../.env.example .env   # or create backend/.env directly — see Environment Variables below
docker compose up --build
```

- API: `http://localhost:8000`
- Interactive docs (auto-generated from Pydantic schemas): `http://localhost:8000/docs`
- Postgres: `localhost:5432` (user/pass/db all `sanket`)

Tables are created automatically on startup in dev (`Base.metadata.create_all`). Once this moves toward production, switch to `alembic upgrade head` instead — `create_all` can only create new tables, not alter existing ones.

### Running Backend Tests (no Docker/Postgres needed)

```bash
cd backend
pip install -r requirements.txt
pytest tests/ -v
```

The test suite runs against an in-memory SQLite DB, so it checks application logic quickly without needing Postgres running. The sentiment tests specifically test the *scoring logic* using fake pipeline callables — they don't download or run a real Hugging Face model (that only happens when you run the actual worker/endpoint with internet access).

## Backend Status & Roadmap

**Live right now** (wired into `app/main.py`, reachable at `/api/v1/...`):
- `POST /api/v1/posts` — upsert a post and its author. This is the endpoint every ingestion worker (Reddit first, then Telegram) writes through. Idempotent — re-posting the same `platform` + `platform_post_id` updates engagement counts rather than duplicating rows.
- `GET /api/v1/posts` — list posts, filterable by `platform`, `from`, `to`. Defaults to the last 7 days when no window is given.
- `POST /api/v1/ingestion/jobs`, `PATCH /api/v1/ingestion/jobs/{id}/complete`, `GET /api/v1/ingestion/jobs` — ingestion job lifecycle tracking.

**Written and unit-tested, but not yet live** (code exists in `app/api/v1/`, `app/services/`, and `app/workers/`, but isn't included in `app/main.py` and is missing at least one required database model):
- **Sentiment** — `app/services/sentiment.py` (`score_text`) and a `POST /sentiment/score-pending` endpoint that scores un-scored posts. Depends on a `SentimentScore` database model that hasn't been added to `app/models/models.py` yet.
- **Demographics** — `app/services/demographics.py` (`infer_language`, `infer_demographics`, `detect_bot_signals`).
- **Network analysis** — `app/services/network.py` (`build_edges_from_posts`, `compute_influencers`).

**Not started:** the `edges` table (for network analysis) and the `sentiment_scores` table.

**Next up:** a real Reddit ingestion worker (via PRAW) that calls `POST /api/v1/ingestion/jobs` at the start of a run, `POST /api/v1/posts` per post pulled, and `PATCH /api/v1/ingestion/jobs/{id}/complete` when finished — then wiring the sentiment/demographics/network routers into `main.py` once their database models exist.

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `API_V1_PREFIX` | Prefix for backend API routes (default `/api/v1`) |
| `CORS_ORIGINS` | Comma-separated allowed origins (default includes `localhost:5173` and `localhost:3000`) |
| `DATABASE_URL` | Postgres connection string (default `postgresql://sanket:sanket@localhost:5432/sanket`) |
| `ENVIRONMENT` | Runtime environment (`development` / `production`) |
| `REDDIT_CLIENT_ID` | Reddit API client ID ([create one here](https://www.reddit.com/prefs/apps)) — optional at boot, only needed when the Reddit ingestion job actually runs |
| `REDDIT_CLIENT_SECRET` | Reddit API client secret — optional at boot |
| `REDDIT_USER_AGENT` | User agent string for Reddit API requests (default `sanket-ingestion/0.1`) |

> You'll also need a **Gemini API key** for the frontend's `@google/genai` integration — see [Google AI Studio's documentation](https://ai.google.dev/gemini-api/docs/api-key).

## Utility Scripts

`backend/check_author_diversity.py` — reads the database directly (no server required) and reports how many distinct authors are behind the ingested posts for a platform, to check whether there's enough multi-person data to build a meaningful network graph from, versus effectively one account broadcasting.

```bash
cd backend
python check_author_diversity.py
```

## Problem Statement

**Organization:** National Technical Research Organisation (NTRO)
**Event:** Smart India Hackathon 2026
**Problem Statement:** #26152

Security and monitoring agencies need to track fast-moving, multilingual social media conversations to detect coordinated disinformation, incitement, and influence operations — a task that outpaces manual monitoring and is largely invisible to English-only analytics tools. SANKET aims to address this gap with vernacular-aware sentiment analysis, network mapping, and rapid situational reporting.

## Team

Built By Patel Kevin Krunalbhai
Student Of LD College Of Engineering

Built by **Team SANKET** for Smart India Hackathon 2026.


## Acknowledgements

- [Google AI Studio](https://aistudio.google.com/) for the frontend project scaffold
- [National Technical Research Organisation (NTRO)](https://www.ntro.gov.in/) for Problem Statement #26152
- [Smart India Hackathon](https://www.sih.gov.in/) 2026
