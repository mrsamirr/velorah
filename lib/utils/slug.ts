import slugify from 'slugify'

/**
 * Generate a URL-friendly slug from a title.
 */
export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })
}

/**
 * Ensure a slug is unique by appending a suffix if needed.
 * Uses the Supabase RPC function for atomicity.
 */
export async function ensureUniqueSlug(
  supabase: { rpc: (fn: string, args: Record<string, unknown>) => PromiseLike<{ data: unknown; error: unknown }> },
  baseSlug: string,
  tableName: string = 'articles'
): Promise<string> {
  const { data, error } = await supabase.rpc('generate_unique_slug', {
    base_slug: baseSlug,
    table_name: tableName,
  })

  if (error || !data) {
    // Fallback: append timestamp
    return `${baseSlug}-${Date.now().toString(36)}`
  }

  return data as string
}
