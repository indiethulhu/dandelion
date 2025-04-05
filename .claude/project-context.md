# Dandelion - Project Context Summary

**Repository Type**: Monorepo using [Turborepo](https://turbo.build/repo)  
**Maintainer**: Indiethulhu  
**Philosophy**: An opinionated Edge-first monorepo template for building web applications

---

## 🧩 Structure

### Apps
- `bo`: Frontend React app
  - React 18.2.0
  - React Router
  - Zustand
  - TypeScript
  - Vite
  - Has basic `Login` and `Dashboard` pages

---

### Packages
- `ambient-ui`: UI components (placeholder for now)
- `cli`: Command-line tooling (to be defined)
- `core`: Core logic layer (currently empty)
- `db`: Database layer (implementation TBD)
- `durable-objects`: Likely Cloudflare Durable Objects logic
- `workers`: Cloudflare Workers or other edge runtime modules

---

### Services
- `motherbase`: .NET Core background worker
  - Logs “Motherbase is alive” every 5 seconds
  - Dockerized

---

## 🧪 Build & Tooling
- Turborepo orchestrates builds across apps/packages
- NPM v10.8.1
- Scripts:
  - `dev`
  - `build`
  - `clean`

---

## 🌍 Technologies
- **Frontend**: React, Zustand, Vite, TypeScript
- **Edge/Infra**: Cloudflare Workers, Durable Objects
- **Backend**: .NET Core (`motherbase`)
- **Infra**: Docker containers

---

## 🛠 Current State
- Early stage / boilerplate setup
- Lots of placeholder packages
- Intentional layout for Edge-first dev
- Designed for scale but currently light on implementation

---

## 🧠 Claude Usage Notes
- Don’t edit files unless told to
- Use `edit_file` with `dryRun: true` for diffs unless asked to write
- Never change `motherbase` unless explicitly told to
- Use consistent structure with `bo` as reference for frontend