# SABINE Control - God View Dashboard

Real-time command and control dashboard for the SABINE multi-agent orchestration platform. Monitor agent activity, manage tasks, and oversee distributed multi-agent workflows in real-time.

## Features

### 📊 Three-Tab Interface

- **Overview Tab**: Unified view combining orchestration statistics, recent task board, and live event stream
- **Task Board Tab**: Full-width Kanban board with complete task lifecycle management  
- **Event Stream Tab**: Full-width real-time log of all agent activities (200+ events)

### 🎯 Core Components

- **Orchestration Status**: Real-time statistics dashboard showing:
  - Total task count and ready-to-run tasks (dependencies met)
  - In-progress, completed, and failed task counts
  - Status breakdown with color-coded badges
  - Auto-refreshes every 30 seconds

- **Task Board**: Interactive Kanban workflow with 5 status columns:
  - **Queued**: Tasks ready for execution
  - **Awaiting Approval**: Tasks requiring human review
  - **In Progress**: Currently executing tasks
  - **Completed**: Successfully finished tasks
  - **Failed**: Tasks with errors
  
  Each task card displays:
  - Priority level (P1-P10)
  - Task title and description
  - Agent role with color-coded badges
  - Dependencies count
  - Expandable details (timestamps, metadata, error messages)
  
  Actions available:
  - One-click task approval for tasks awaiting review
  - Manual dispatch button to trigger next available task
  - Expand/collapse for detailed task inspection

- **Live Event Stream**: Real-time agent activity log featuring:
  - 11 event types (task_started, task_completed, tool_call, agent_thought, error, etc.)
  - Role badges identifying which agent performed the action
  - Event metadata and task linking
  - Color-coded event types for quick scanning
  - Pause/resume controls for live updates
  - Event count display
  - Connection status indicator (green dot = connected)

- **Agent Pulse**: Header badge showing live connection status
  - Pulsing green indicator for active connection
  - Latest event preview with role, content snippet, and timestamp
  - Real-time updates as agents produce new events

### 🤖 Agent Roles

Six specialized agent types with distinct color coding:
- **Architect** (Violet) - System-level orchestration and planning
- **Backend** (Blue) - Backend services and API development
- **Frontend** (Emerald) - Frontend components and UI operations
- **Data/AI** (Amber) - Data pipelines and AI/ML integration
- **PM** (Pink) - Product requirements and prioritization
- **QA** (Red) - Quality assurance and security testing

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js with App Router | 14.2.21 |
| **Language** | TypeScript | 5.3.x |
| **UI Library** | React | 18.2.x |
| **Database** | Supabase (PostgreSQL) | SDK 2.39.x |
| **Styling** | Tailwind CSS | 3.4.x |
| **Animation** | Framer Motion | 11.18.x |
| **Icons** | Lucide React | 0.469.x |
| **Utilities** | clsx, tailwind-merge | Latest |

### Architecture

- **Client-Side Rendering** with `'use client'` directives
- **Real-Time Subscriptions** via Supabase Postgres Changes (`postgres_changes`)
- **External API Integration** with SABINE Orchestrator (FastAPI backend)
- **Component-Based Architecture** with custom hooks for state management
- **Responsive Design** with 1800px max-width layout

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account with PostgreSQL database
- SABINE Orchestrator API (FastAPI backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/strugcity/dream-team.git
cd dream-team
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory with your Supabase and API credentials:

```env
# Supabase Connection
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# SABINE Orchestrator API
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=your-api-key-if-needed
```

You can reference `.env.example` for the expected format.

### Database Setup

The dashboard requires two PostgreSQL tables in your Supabase project:

1. **task_queue**: Stores task information and status
2. **agent_events**: Stores real-time agent activity logs

Refer to `docs/architecture/PROJECT_ATLAS.md` for detailed entity relationship diagrams and schema information.

### Development

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The dashboard will automatically connect to:
- Supabase for real-time task and event data
- SABINE Orchestrator API for task management operations

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

## API Integration

The dashboard integrates with the SABINE Orchestrator API for task management:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/tasks` | POST | Create new task |
| `/tasks/{id}` | GET | Retrieve task details |
| `/tasks/{id}/approve` | POST | Approve task awaiting review |
| `/tasks/{id}/complete` | POST | Mark task as completed |
| `/tasks/{id}/fail` | POST | Mark task as failed |
| `/tasks/dispatch` | POST | Dispatch next available task to agents |
| `/orchestration/status` | GET | Get task count statistics |

API requests include optional `X-API-Key` header for authentication when configured.

## Real-Time Features

The dashboard uses Supabase real-time subscriptions to provide instant updates:

- **Task Updates**: Automatic UI refresh when tasks are created, updated, or completed
- **Event Streaming**: Live log of agent activities as they happen
- **Connection Status**: Visual indicator showing real-time connection health
- **Auto-Refresh**: Orchestration status refreshes every 30 seconds

Real-time channels subscribe to `postgres_changes` events on `task_queue` and `agent_events` tables.

## Project Structure

```
dream-team/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Main dashboard (3-tab interface)
│   │   ├── layout.tsx      # Root layout and metadata
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── AgentPulse.tsx         # Header activity indicator
│   │   ├── LiveLog.tsx            # Real-time event stream
│   │   ├── OrchestrationStatus.tsx # Statistics dashboard
│   │   ├── TaskBoard.tsx          # Kanban task board
│   │   └── index.ts               # Component exports
│   ├── hooks/              # Custom React hooks
│   │   └── useTaskActions.ts     # API integration hook
│   └── lib/                # Utilities and configuration
│       ├── supabase.ts           # Supabase client setup
│       └── utils.ts              # Helper functions
├── docs/
│   └── architecture/
│       └── PROJECT_ATLAS.md      # Comprehensive technical documentation
├── test/                   # Test files
├── .env.example           # Environment variable template
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment configuration
```

## Documentation

For detailed technical documentation, including:
- Entity relationship diagrams
- System component diagrams
- Data flow diagrams
- API endpoint specifications
- Event type taxonomy
- Security considerations

See: [`docs/architecture/PROJECT_ATLAS.md`](docs/architecture/PROJECT_ATLAS.md)

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment with zero configuration:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_API_KEY` (optional)
3. Deploy - Vercel will automatically build and deploy on every push to main

The `vercel.json` configuration file is included with optimized build settings.

### Other Platforms

The dashboard is a standard Next.js application and can be deployed to any platform supporting Node.js:

```bash
npm run build    # Creates optimized production build
npm run start    # Starts production server on port 3000
```

Ensure environment variables are configured in your hosting platform.

## Part of Project Dream Team

This dashboard is **Phase 5** of the SABINE multi-agent orchestration platform:

| Phase | Component | Description |
|-------|-----------|-------------|
| Phase 1 | The Nervous System | Role-based routing from markdown personas |
| Phase 2 | The Hands | E2B Sandbox for code execution + GitHub sync |
| Phase 3 | The Pulse | Task queue with dependency chains & auto-dispatch |
| Phase 4 | The Gantry | Slack integration + real-time event stream |
| **Phase 5** | **God View** | **This dashboard - Real-time monitoring and control** |

## Contributing

This is a private project for Strug City Engineering. For questions or issues, please contact the development team.

## License

Private - Strug City Engineering
