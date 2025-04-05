/**
 * SyncReceiver Worker
 * 
 * A Cloudflare Worker that receives sync data for a specific region.
 */

export interface Env {
  // Define your environment variables here
}

export default {
  /**
   * Handle incoming POST requests to the /sync-receive/:region endpoint
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Get the URL and parse it
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Check if this is a sync-receive request
    if (!path.startsWith('/sync-receive/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Check if this is a POST request
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { 
        status: 405,
        headers: { 'Allow': 'POST' }
      });
    }
    
    // Extract the region from the path (everything after /sync-receive/)
    const region = path.substring('/sync-receive/'.length);
    
    // Parse the request body
    let payload: any;
    try {
      payload = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Invalid JSON payload'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Log the request details
    console.log(`Processing sync data for region: ${region}`);
    console.log(`Payload:`, JSON.stringify(payload));
    
    // Return a JSON response with the status and region
    return new Response(
      JSON.stringify({
        status: 'ok',
        region: region,
        received: true,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
