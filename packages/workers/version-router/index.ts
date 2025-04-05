/**
 * VersionRouter Worker
 * 
 * A Cloudflare Worker that provides version information for users.
 */

export interface Env {
  // Define your environment variables here
}

interface VersionInfo {
  version: string;
  releaseDate: string;
  features: string[];
}

// Dummy version data store
const VERSIONS: Record<string, VersionInfo> = {
  'default': {
    version: 'stable',
    releaseDate: '2025-03-15',
    features: ['core', 'basic']
  },
  'beta': {
    version: 'beta-2.1.0',
    releaseDate: '2025-04-01',
    features: ['core', 'basic', 'experimental']
  },
  'alpha': {
    version: 'alpha-3.0.0',
    releaseDate: '2025-04-10',
    features: ['core', 'basic', 'experimental', 'preview']
  }
};

export default {
  /**
   * Handle incoming GET requests to the /version/:userId endpoint
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Get the URL and parse it
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Check if this is a version request
    if (!path.startsWith('/version/')) {
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
    const userId = path.substring('/version/'.length);
    
    // Log the request
    console.log(`Fetching version info for user: ${userId}`);
    
    // Determine which version to return based on userId
    // This is dummy logic - in a real app, this would check a database
    let versionKey = 'default';
    
    // Simple hashing of userId to determine version for demo purposes
    const userIdSum = userId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    if (userIdSum % 10 === 0) {
      versionKey = 'alpha';
    } else if (userIdSum % 5 === 0) {
      versionKey = 'beta';
    }
    
    // Get the version info
    const versionInfo = VERSIONS[versionKey];
    
    // Return a JSON response with the version info
    return new Response(
      JSON.stringify({
        status: 'ok',
        userId: userId,
        ...versionInfo
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
