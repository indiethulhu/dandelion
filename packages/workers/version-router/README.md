# Version Router Worker

A Cloudflare Worker that provides version information for users.

## Features

- Accepts GET requests to `/version/:userId` endpoints
- Returns version information for the specified user
- Simple hashing algorithm to assign different versions for demo purposes

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

### GET /version/:userId

Returns version information for the specified user.

**Request Example:**

```bash
curl -X GET https://dandelion-version-router.indie.workers.dev/version/user123
```

**Response Example:**

```json
{
  "status": "ok",
  "userId": "user123",
  "version": "stable",
  "releaseDate": "2025-03-15",
  "features": ["core", "basic"]
}
```

## Configuration

The worker is configured using `wrangler.toml` and can be deployed to different environments (staging, production).

## Testing on workers.dev

After deployment, the worker is accessible at your `workers.dev` subdomain.

### Example Test

```bash
curl -X GET https://dandelion-version-router.indie.workers.dev/version/user123
```

**Expected Response:**

```json
{
  "status": "ok",
  "userId": "user123",
  "version": "stable",
  "releaseDate": "2025-03-15",
  "features": ["core", "basic"]
}
```

You can also open this URL in a browser to confirm it's working.

## Version Routing Strategy

This worker is designed to return version information for users based on their `userId`. It uses a deterministic hashing algorithm to assign users to a release channel such as `stable`, `beta`, or `alpha`.

Clients should fetch this version information once per session or login. The returned version details (name, release date, features) can be cached on the client and used to load the appropriate frontend assets or activate specific feature flags.

This allows for dynamic version control, A/B testing, and progressive rollout of features across different user segments.
