# Project Que

A market trading information dashboard built as a modern full-stack monorepo.

## Stack Architecture

- **Workspace:** `pnpm` Monorepo Workspaces
- **Frontend:** React 19 + TypeScript + Vite (`app/client`)
- **Backend:** Express + TypeScript + `tsx` (`app/server`)
- **Tooling:** Centralized ESLint v10 Flat Config, Prettier, Concurrently
- **Environment:** VS Code Dev Container (Includes Node.js 22, eslint, nvm, yarn, pnpm, Oh My Zsh and the TypeScript compiler.)

## Quickstart

### 1. Open in Dev Container

1. Copy `setup.example.sh` to `setup.sh` (git-ignored) and add your personal git details:
   ```bash
   cp setup.example.sh setup.sh
   ```
2. Open this workspace in VS Code and select **"Reopen in Container"**.
   _Dependencies are automatically installed into an isolated Docker volume on container creation via `setup.sh`._

_(If developing locally outside Docker, run `pnpm install`)._

### 2. Run Development Servers

Start both client (`:5173`) and server (`:3000`) in parallel:

```bash
pnpm dev
```
