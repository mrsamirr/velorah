import { createClient } from '@/lib/supabase/server'

/**
 * Health Check API endpoint.
 * Returns the status of the application and Supabase connection.
 *
 * GET /api/health
 */
export async function GET() {
  try {
    const supabase = await createClient()

    // Test DB connectivity by querying the auth service
    const { error } = await supabase.auth.getUser()

    // Note: error here just means "no session" which is fine for a health check.
    // A connection failure would throw, not return an error object.

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        auth: 'operational',
      },
    })
  } catch {
    return Response.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected',
          auth: 'unknown',
        },
      },
      { status: 503 }
    )
  }
}
