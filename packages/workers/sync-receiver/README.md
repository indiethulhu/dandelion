# Sync Receiver Worker

A Cloudflare Worker that receives synchronization data for specific regions.

## Features

- Accepts POST requests to `/sync-receive/:region` endpoints
- Logs the payload and region information
- Returns a JSON response with status, region, and timestamp

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

### POST /sync-receive/:region

Receives data for the specified region.

**Request Example:**

```bash
curl -X POST https://sync-receiver.indie.workers.dev/sync-receive/us-west \
  -H "Content-Type: application/json" \
  -d '{"data": "example sync payload", "timestamp": "2025-04-05T12:00:00Z"}'
```

**Response Example:**

```json
{
  "status": "ok",
  "region": "us-west",
  "received": true,
  "timestamp": "2025-04-05T12:34:56Z"
}
```

## Configuration

The worker is configured using `wrangler.toml` and can be deployed to different environments (staging, production).

## Testing on workers.dev

After deployment, the worker is accessible at your `workers.dev` subdomain.

### Example Test

```bash
curl -X POST https://dandelion-sync-receiver.indie.workers.dev/sync-receive/us-west \
  -H "Content-Type: application/json" \
  -d '{"data": "example sync payload", "timestamp": "2025-04-05T12:00:00Z"}'
```

**Expected Response:**

```json
{
  "status": "ok",
  "region": "us-west",
  "received": true,
  "timestamp": "..."
}
```

You can also paste the URL in a browser to confirm basic availability (but note that `GET` is not allowed).

## Region Handling

The `sync-receiver` worker assumes that incoming requests are already region-routed. Clients should only call this endpoint after retrieving their region (e.g., from `region-info` or `sync-router`) and caching it.

This worker does not determine the user's region; it expects to be called with a specific region already known. The main responsibilities here include:

- Receiving synchronization payloads
- Logging or persisting the data
- Handing off to backend storage or queues (future work)

For dynamic region selection, see the `sync-router` or `region-info` workers.
