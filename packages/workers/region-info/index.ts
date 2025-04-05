/**
 * RegionInfo Worker
 * 
 * A Cloudflare Worker that provides region information for users.
 */

export interface Env {
  // Define your environment variables here
}

interface RegionData {
  slug: string;
  name: string;
  dataCenter: string;
  latency: number; // in ms
}

// Dummy region data store
const REGIONS: Record<string, RegionData> = {
  'us-west': {
    slug: 'us-west',
    name: 'US West (San Francisco)',
    dataCenter: 'SFO',
    latency: 15
  },
  'us-east': {
    slug: 'us-east',
    name: 'US East (New York)',
    dataCenter: 'NYC',
    latency: 18
  },
  'eu-central': {
    slug: 'eu-central',
    name: 'Europe Central (Frankfurt)',
    dataCenter: 'FRA',
    latency: 25
  },
  'ap-southeast': {
    slug: 'ap-southeast',
    name: 'Asia Pacific Southeast (Singapore)',
    dataCenter: 'SIN',
    latency: 40
  }
};

// List of region slugs for random selection
const REGION_SLUGS = Object.keys(REGIONS);

export default {
  /**
   * Handle incoming GET requests to the /region/:userId endpoint
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Get the URL and parse it
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Check if this is a region request
    if (!path.startsWith('/region/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Check if this is a GET request
    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { 
        status: 405,
        headers: { 'Allow': 'GET' }
      });
    }
    
    // Extract the userId from the path
    const userId = path.substring('/region/'.length);
    
    // Log the request
    console.log(`Fetching region info for user: ${userId}`);
    
    // Determine which region to return based on userId
    // This is dummy logic - in a real app, this would check geolocation or a database
    
    // Simple hashing of userId to determine region for demo purposes
    const userIdSum = userId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const regionIndex = userIdSum % REGION_SLUGS.length;
    const regionSlug = REGION_SLUGS[regionIndex];
    
    // Get the region info
    const regionInfo = REGIONS[regionSlug];
    
    // Return a JSON response with the region info
    return new Response(
      JSON.stringify({
        status: 'ok',
        userId: userId,
        region: regionInfo
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
