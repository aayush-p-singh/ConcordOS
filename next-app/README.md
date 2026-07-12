# ConcordOS

ConcordOS is a modern Next.js application that demonstrates an enterprise-style AI operating system for managing decisions, coordinating agents, and surfacing negotiation outcomes. The experience is built around a dark, dashboard-first interface and is designed to feel like a command center for business planning and AI-assisted decision workflows.

## What this app does

The product experience revolves around four core ideas:

- Decision management: create, review, and track important business decisions.
- Multi-agent collaboration: simulate inputs from different departments such as Engineering, Finance, and Marketing.
- Negotiation workflow: collect perspectives, compare them, and produce a final recommendation.
- Operational visibility: show activity, pending approvals, and progress in a dashboard-oriented UI.

In practice, this app acts as a prototype for an internal AI operating system where human and AI actors can work together to reach decisions more quickly.

## Main features

- A polished dashboard with summary cards for active decisions, running agents, approvals, and recent activity.
- Dedicated pages for decisions, agents, negotiation outcomes, settings, and new-decision creation.
- A Convex-powered backend for storing decisions, agent opinions, and negotiation results.
- A reusable UI layer built with Tailwind CSS and shadcn-style components.
- Theme support and a dark visual system designed for a futuristic product experience.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Convex for backend data and real-time server functions
- Lucide React for icons
- shadcn-style component primitives in the UI layer

## Project structure

- app/: route-level pages and layouts for dashboard, decisions, negotiation, agents, settings, and more.
- components/: reusable UI components such as sidebars, cards, navbars, timelines, and result views.
- convex/: schema, queries, and mutations for decisions, agents, negotiation, and audit data.
- lib/: shared helpers and utilities.
- public/: static assets.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at http://localhost:3000.

## Available scripts

- npm run dev: start the development server
- npm run build: create a production build
- npm run start: run the production build locally
- npm run lint: run ESLint checks
- npm run typecheck: run TypeScript checks

## Architecture overview

The frontend is rendered by Next.js and organized around route-based pages in the app directory. The UI is composed of modular components that represent dashboard cards, negotiation views, and navigation. Data and business logic are handled through Convex functions, which provide a lightweight backend layer for storing structured records and powering queries.

This makes the app easy to extend. New decision types, agent roles, or negotiation rules can be added by updating the schema and adding new Convex functions and UI routes.

## Notes

This project is best viewed as a product demo and design prototype rather than a full enterprise system. It focuses on experience, structure, and workflow simulation while showing how a Next.js app can be combined with Convex to build interactive, data-backed interfaces.

