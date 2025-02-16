// CORS Configuration
const ALLOWED_ORIGINS = Deno.env.get('ALLOWED_ORIGINS')?.split(',') || ['https://protradecrm.com'];

// Function to handle CORS
function handleCors(request: Request) {
  const origin = request.headers.get('origin') ?? '';
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response('CORS not allowed', {
      status: 403,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin',
      },
    });
  }
  return null; // CORS check passed
}

// Main Function Handler
export const onRequest = async (req: Request) => {
  // Step 1: Run CORS Check
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;  // Return immediately if CORS fails

  // Step 2: Handle preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': req.headers.get('origin') ?? '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Step 3: Send Response
  return new Response("Hello from send-invite function", {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': req.headers.get('origin') ?? '*',
    },
  });
};
