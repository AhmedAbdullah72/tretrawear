import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: 'healthy',
  }

  return new Response(JSON.stringify(health), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})
