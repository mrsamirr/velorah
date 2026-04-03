import { createClient } from '@/lib/supabase/server'

/**
 * RSS 2.0 feed with the latest 50 published articles.
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://velorah.blog'
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('title, slug, excerpt, published_at, profiles!articles_author_id_fkey(display_name)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50)

  const items = (articles || [])
    .map((article) => {
      const author = (article.profiles as unknown as { display_name: string } | null)?.display_name || 'Unknown'
      const pubDate = article.published_at ? new Date(article.published_at).toUTCString() : ''
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/article/${article.slug}</link>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <author>${author}</author>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${baseUrl}/article/${article.slug}</guid>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Velorah Blog</title>
    <link>${baseUrl}</link>
    <description>Thoughts, essays, and stories from the Velorah community.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
