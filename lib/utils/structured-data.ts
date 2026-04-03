const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://velorah.com'

/**
 * Build JSON-LD structured data for an article.
 */
export function buildArticleJsonLd(article: {
  title: string
  excerpt: string | null
  slug: string
  cover_image_url: string | null
  author_name: string | null
  published_at: string | null
  updated_at: string
  word_count: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    image: article.cover_image_url || undefined,
    url: `${SITE_URL}/article/${article.slug}`,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at,
    wordCount: article.word_count,
    author: article.author_name
      ? { '@type': 'Person', name: article.author_name }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Velorah',
      url: SITE_URL,
    },
  }
}

/**
 * Build JSON-LD structured data for a person/profile.
 */
export function buildPersonJsonLd(profile: {
  display_name: string
  username: string
  bio: string | null
  avatar_url: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.display_name,
    url: `${SITE_URL}/author/${profile.username}`,
    description: profile.bio || undefined,
    image: profile.avatar_url || undefined,
  }
}

/**
 * Build JSON-LD breadcrumb list.
 */
export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}
