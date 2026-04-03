import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
])

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Upload a file to Supabase Storage.
 * Validates MIME type and file size.
 */
export async function uploadFile(
  bucket: 'avatars' | 'covers' | 'article-media',
  file: File
): Promise<{ url: string } | { error: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, GIF, WebP, SVG.` }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: `File too large. Maximum size is 5MB.` }
  }

  // Build path: userId/timestamp-filename
  const extension = file.name.split('.').pop() || 'img'
  const safeName = `${Date.now()}.${extension}`
  const path = `${user.id}/${safeName}`

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    console.error('Upload failed:', uploadError.message)
    return { error: 'Failed to upload file' }
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path)

  return { url: publicUrl.publicUrl }
}

/**
 * Delete a file from Supabase Storage.
 */
export async function deleteFile(
  bucket: 'avatars' | 'covers' | 'article-media',
  path: string
): Promise<{ success: boolean; error?: string }> {
  await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    console.error('Delete failed:', error.message)
    return { success: false, error: 'Failed to delete file' }
  }

  return { success: true }
}

/**
 * Get the public URL for a file in storage.
 */
export function getPublicUrl(
  bucket: 'avatars' | 'covers' | 'article-media',
  path: string
): string {
  const supabaseUrl = process.env.SUPABASE_URL!
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}
