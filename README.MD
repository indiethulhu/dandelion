# Dandelion

An opinionated **Edge-first monorepo template** for building multi-tenant web applications, optimized for the modern web stack.

Created by **Indiethulhu**. Bootstrapped by AI. Operated at the edge.

---

## 🧱 Architecture Overview

Dandelion is built around the following principles:

- **Cloudflare-first**: Durable Objects, Workers, and D1 are treated as first-class primitives.
- **Composable services**: Modular workers for routing, versioning, syncing, and region detection.
- **Monorepo sanity**: Uses `npm workspaces` and `turborepo` for build orchestration.

---

## 🛰️ Services & Workers

| Worker             | Purpose                                       |
|--------------------|-----------------------------------------------|
| `sync-router`      | Determines the user’s region and routes sync  |
| `sync-receiver`    | Accepts and logs region-specific sync data    |
| `version-router`   | Assigns users to beta/stable app versions     |
| `region-info`      | Returns metadata for region-aware routing     |

Each worker is independently deployed to Cloudflare and follows a consistent structure.

---

## 🚀 Usage

This repo is a template and playground for building multi-region, edge-native SaaS platforms.

Future components may include:
- Per-user D1 DB provisioning
- Kafka-style queue integration
- CDN-backed UI deployments
- Durable Object coordination
- In-browser LLM companions 👀

---

## 🧪 Local Development

Install dependencies:

```bash
npm install
```

Run all dev processes:

```bash
npm run dev
```

Deploy a worker:

```bash
npm run deploy --workspace=@indiethulhu/dandelion-workers-sync-router
```

---

## 🧙‍♂️ Notes

> This project is part of a larger platform effort. See [indiethulhu.com](https://indiethulhu.com) for updates.

