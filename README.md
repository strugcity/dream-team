# SABINE Dashboard - God View

Real-time monitoring dashboard for the SABINE multi-agent orchestration platform.

## Features

- **LiveLog**: Real-time event stream with Supabase Realtime subscriptions
- **TaskBoard**: Kanban-style task visualization by status
- **OrchestrationStatus**: System metrics and task counts
- Role-based color coding for all agent types

## Tech Stack

- Next.js 14 with App Router
- Supabase client with real-time subscriptions
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_API_KEY=your-api-key-if-needed
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is configured for Vercel deployment. Connect your GitHub repo and it will auto-deploy.

## Part of Project Dream Team

This dashboard is Phase 5 of the SABINE multi-agent orchestration platform:

| Phase | Component | Description |
|-------|-----------|-------------|
| Phase 1 | The Nervous System | Role-based routing from markdown personas |
| Phase 2 | The Hands | E2B Sandbox for code execution + GitHub sync |
| Phase 3 | The Pulse | Task queue with dependency chains & auto-dispatch |
| Phase 4 | The Gantry | Slack integration + real-time event stream |
| **Phase 5** | **God View** | **This dashboard** |

## License

Private - Strug City Engineering
