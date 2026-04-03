import type { Metadata } from 'next'

const SITE_NAME = 'Velorah®'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://velorah.com'

/**
 * Generate article page metadata.
 */
export function generateArticleMetadata(article: {
  title: string
  excerpt: string | null
  meta_title: string | null
  meta_description: string | null
  cover_image_url: string | null
  slug: string
  author_name: string | null
  published_at: string | null
}): Metadata {
  const title = article.meta_title || article.title
  const description = article.meta_description || article.excerpt || ''

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/article/${article.slug}`,
      images: article.cover_image_url ? [{ url: article.cover_image_url }] : [],
      siteName: SITE_NAME,
      publishedTime: article.published_at || undefined,
      authors: article.author_name ? [article.author_name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  }
}

/**
 * Generate profile page metadata.
 */
export function generateProfileMetadata(profile: {
  display_name: string
  username: string
  bio: string | null
  avatar_url: string | null
}): Metadata {
  const title = `${profile.display_name} (@${profile.username})`
  const description = profile.bio || `Read articles by ${profile.display_name} on ${SITE_NAME}`

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${SITE_URL}/author/${profile.username}`,
      images: profile.avatar_url ? [{ url: profile.avatar_url }] : [],
    },
  }
}
