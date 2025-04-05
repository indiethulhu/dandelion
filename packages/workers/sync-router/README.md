# Sync Router Worker

A Cloudflare Worker that handles synchronization requests and routes them based on region identifiers.

## Features

- Accepts requests to `/sync/*` endpoints
- Extracts region identifiers from the URL path (e.g., `/sync/us-west`)
- Logs the region and request method
- Returns a JSON response with status and region information

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

### GET /sync/:region

Returns a JSON response indicating the region was processed successfully.

**Example Response:**

```json
{
  "status": "ok",
  "region": "us-west"
}
```

## Configuration

The worker is configured using `wrangler.toml` and can be deployed to different environments (staging, production).

## Testing on workers.dev

After deployment, the worker is available at your Cloudflare `workers.dev` subdomain.

### Example Test

To test the deployed worker:

```bash
curl https://dandelion-sync-router.indie.workers.dev/sync/us-west
```

Expected response:

```json
{
  "status": "ok",
  "region": "us-west"
}
```

You can also open this URL in a browser to confirm it's working:
[https://dandelion-sync-router.indie.workers.dev/sync/us-west](https://dandelion-sync-router.indie.workers.dev/sync/us-west)

## Region Caching Strategy

The `sync-router` worker is primarily intended for first-time region detection. Clients should call this endpoint once per session or login to determine which region to sync with. The response includes a region identifier (e.g., `us-east`) which can be cached client-side (e.g., in `localStorage` or memory).

Subsequent sync operations should bypass `sync-router` entirely and interact directly with the region-specific endpoint, such as:

```bash
POST /sync-receive/us-east
```

This approach reduces latency and server load while maintaining region affinity.

Note: Although the worker executes close to the user (thanks to Cloudflare’s edge), it’s still important to explicitly route data to the correct region to ensure consistency in data operations and storage behavior.
