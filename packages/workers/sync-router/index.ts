/**
 * SyncRouter Worker
 * 
 * A Cloudflare Worker that handles sync requests and routes them based on region.
 */

import type { ExecutionContext } from '@cloudflare/workers-types';

export interface Env {
  // Define your environment variables here
  // Ensure @cloudflare/workers-types is installed in package.json for ExecutionContext typing
}

export default {
  /**
   * Handle incoming requests to the /sync/* endpoint
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Get the URL and parse it
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Check if this is a sync request
    if (!path.startsWith('/sync/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Extract the region from the path (everything after /sync/)
    const region = path.substring(6); // Remove '/sync/' prefix
    
    // Log the request details
    console.log(`Processing ${request.method} request for region: ${region}`);
    
    // Return a JSON response with the status and region
    return new Response(
      JSON.stringify({
        status: 'ok',
        region: region,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
