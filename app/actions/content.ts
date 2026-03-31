'use server'

import { revalidatePath } from 'next/cache'
import {
  createArticle as dalCreateArticle,
  updateArticle as dalUpdateArticle,
  deleteArticle as dalDeleteArticle,
} from '@/lib/dal/articles'
import { updateProfile as dalUpdateProfile } from '@/lib/dal/profiles'
import {
  CreateArticleSchema,
  UpdateArticleSchema,
  UpdateProfileSchema,
  type ArticleFormState,
  type ProfileFormState,
} from '@/lib/schemas/content'

/**
 * Content Server Actions
 *
 * SECURITY:
 * - All input validated with Zod BEFORE any DB calls
 * - Auth + ownership checked inside the DAL (defense in depth)
 * - Return values contain only what the client needs
 * - Server Actions are reachable via POST — always re-validate
 */

export async function createArticleAction(
  state: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState & { id?: string }> {
  // 1. Validate input
  const validatedFields = CreateArticleSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    excerpt: formData.get('excerpt') || undefined,
    cover_image_url: formData.get('cover_image_url') || undefined,
    category: formData.get('category') || undefined,
    status: formData.get('status') || 'draft',
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Delegate to DAL (handles auth + DB insert)
  const result = await dalCreateArticle(validatedFields.data)

  if ('error' in result) {
    return { message: result.error }
  }

  // 3. Revalidate affected paths
  revalidatePath('/author')
  revalidatePath('/feed')

  return { id: result.id }
}

export async function updateArticleAction(
  articleId: string,
  state: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  // 1. Validate input
  const raw: Record<string, unknown> = {}
  const title = formData.get('title')
  const content = formData.get('content')
  const excerpt = formData.get('excerpt')
  const cover_image_url = formData.get('cover_image_url')
  const category = formData.get('category')
  const status = formData.get('status')

  if (title) raw.title = title
  if (content) raw.content = content
  if (excerpt) raw.excerpt = excerpt
  if (cover_image_url) raw.cover_image_url = cover_image_url
  if (category) raw.category = category
  if (status) raw.status = status

  const validatedFields = UpdateArticleSchema.safeParse(raw)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Delegate to DAL (handles auth + ownership + DB update)
  const result = await dalUpdateArticle(articleId, validatedFields.data)

  if (!result.success) {
    return { message: result.error || 'Failed to update article' }
  }

  // 3. Revalidate affected paths
  revalidatePath('/author')
  revalidatePath('/feed')
  revalidatePath(`/article/${articleId}`)

  return { message: 'Article updated successfully' }
}

export async function deleteArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  // Delegate to DAL (handles auth + ownership + DB delete)
  const result = await dalDeleteArticle(articleId)

  if (!result.success) {
    return { success: false, error: result.error || 'Failed to delete article' }
  }

  // Revalidate affected paths
  revalidatePath('/author')
  revalidatePath('/feed')

  return { success: true }
}

export async function publishArticleAction(
  articleId: string
): Promise<{ success: boolean; error?: string }> {
  const result = await dalUpdateArticle(articleId, {
    status: 'published',
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  revalidatePath('/author')
  revalidatePath('/feed')

  return { success: true }
}

export async function updateProfileAction(
  state: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  // 1. Validate input
  const raw: Record<string, unknown> = {}
  const display_name = formData.get('display_name')
  const bio = formData.get('bio')
  const avatar_url = formData.get('avatar_url')

  if (display_name) raw.display_name = display_name
  if (bio !== null) raw.bio = bio
  if (avatar_url) raw.avatar_url = avatar_url

  const validatedFields = UpdateProfileSchema.safeParse(raw)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Delegate to DAL
  const result = await dalUpdateProfile(validatedFields.data)

  if (!result.success) {
    return { message: result.error || 'Failed to update profile' }
  }

  revalidatePath('/author')
  return { message: 'Profile updated successfully' }
}
