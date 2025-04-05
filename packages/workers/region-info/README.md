# Region Info Worker

A Cloudflare Worker that provides region information for users.

## Features

- Accepts GET requests to `/region/:userId` endpoints
- Returns region information for the specified user
- Simple hashing algorithm to assign different regions for demo purposes

## Usage

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Deploy

```bash
npm run deploy
```

## API Endpoints

### GET /region/:userId

Returns region information for the specified user.

**Request Example:**

```bash
curl -X GET https://dandelion-region-info.indie.workers.dev/region/user123
```

**Response Example:**

```json
{
  "status": "ok",
  "userId": "user123",
  "region": {
    "slug": "us-west",
    "name": "US West (San Francisco)",
    "dataCenter": "SFO",
    "latency": 15
  }
}
```

## Configuration

The worker is configured using `wrangler.toml` and can be deployed to different environments (staging, production).

## Region Resolution Strategy

This worker is intended to be called once per session or login. It returns region metadata for the provided `userId`, including the region slug, human-readable name, data center code, and estimated latency.

Clients should cache the result in memory or persistent storage (e.g., `localStorage`). Subsequent requests (e.g., data sync or saves) should use this region information to target the appropriate backend endpoints or regional workers directly.

This approach avoids redundant calls and enables optimal routing to the correct region-specific infrastructure.
