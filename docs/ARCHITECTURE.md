# Project Que — System Architecture & Conventions

## 1. Overview

`project_que` is a market trading information dashboard structured as a unified **pnpm monorepo workspace**.

## 2. Directory Structure

```text
project_que/
├── app/
│   ├── client/               # React 19 + Vite frontend
│   │   ├── src/              # Application components, assets & styles
│   │   ├── tsconfig.json     # Vite composite TS references
│   │   └── vite.config.ts    # Frontend dev server & build config
│   └── server/               # Express + TypeScript backend
│       ├── src/              # API server entrypoint & routes
│       └── tsconfig.json     # NodeNext TS config
├── docs/
│   └── ARCHITECTURE.md       # Project architecture docs
├── eslint.config.js          # Shared root linter config
├── package.json              # Workspace root orchestrator
├── pnpm-lock.yaml            # Single unified workspace lockfile
└── pnpm-workspace.yaml       # Monorepo workspace definition
```

**Note on omitted files:** Transient build outputs (`node_modules`), version control folders (`.git`), and static assets (`public/*` , `assets/*`) are omitted from the tree above to emphasize system structure.

## 3. Environment & Runtime Conventions

- **Package Manager:** `pnpm` (enforced via `devEngines` in root `package.json`, target version `^11.9.0`).
- **Dependency Management:** Single consolidated `pnpm-lock.yaml` at the root directory managing dependencies across all workspace projects (`app/client`, `app/server`).
- **Module System:** ES Modules (`"type": "module"` across all packages).
- **TypeScript Setup:**
  - **Server:** `NodeNext` module resolution with strict type-checking.
  - **Client:** Vite composite reference setup (`tsconfig.app.json` for React DOM, `tsconfig.node.json` for Vite config).

## 4. Networking & Ports

| Service    | Technology      | Port   | Access URL              | Notes                                |
| ---------- | --------------- | ------ | ----------------------- | ------------------------------------ |
| **Client** | React-TS / Vite | `5173` | `http://localhost:5173` | Development server with `/api` proxy |
| **Server** | Express / TS    | `3000` | `http://localhost:3000` | REST API / WebSocket backend         |

Both ports are forwarded in `.devcontainer/devcontainer.json`. In development, requests sent to `http://localhost:5173/api` are proxied directly to `http://localhost:3000`.

## 5. Development & Orchestration

- **Root Script Execution:** Workspace commands use `pnpm --filter <package_name>` (`client` and `server`) to maintain path independence and build graph awareness.
- **Server Execution:** Express runs in development using `tsx watch src/index.ts` for fast server reloads.
- **Parallel Execution:** Running `pnpm dev` at the root uses `concurrently` to spin up both client and server processes in parallel.
- **Code Quality:** Centralized ESLint Flat Config (`eslint .`) and Prettier (`prettier --write .`) run at the workspace root across all sub-packages.
