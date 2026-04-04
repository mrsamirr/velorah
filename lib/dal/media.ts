import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import { log } from '@/lib/logger'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
])

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Magic byte signatures for allowed image types.
 * Prevents MIME spoofing by checking the actual file header.
 */
const MAGIC_BYTES: Array<{ mime: string; bytes: number[] }> = [
  { mime: 'image/jpeg', bytes: [0xFF, 0xD8, 0xFF] },
  { mime: 'image/png', bytes: [0x89, 0x50, 0x4E, 0x47] },
  { mime: 'image/gif', bytes: [0x47, 0x49, 0x46] },
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] }, // RIFF header
]

async function detectMimeFromBytes(file: File): Promise<string | null> {
  const buffer = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  for (const { mime, bytes } of MAGIC_BYTES) {
    if (bytes.every((b, i) => buffer[i] === b)) {
      // WebP needs additional check for WEBP signature at offset 8
      if (mime === 'image/webp') {
        const webpSig = [0x57, 0x45, 0x42, 0x50]
        if (!webpSig.every((b, i) => buffer[i + 8] === b)) continue
      }
      return mime
    }
  }
  // SVG: check for XML/SVG text content (cannot use magic bytes)
  if (file.type === 'image/svg+xml') {
    const text = await file.slice(0, 256).text()
    if (text.includes('<svg') || text.includes('<?xml')) return 'image/svg+xml'
  }
  return null
}

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
    return { error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG.' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: 'File too large. Maximum size is 5MB.' }
  }

  // Verify MIME via magic bytes — don't trust Content-Type header
  const detectedMime = await detectMimeFromBytes(file)
  if (!detectedMime || !ALLOWED_MIME_TYPES.has(detectedMime)) {
    return { error: 'File content does not match an allowed image type.' }
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
    log.error('Upload failed', { context: 'media.upload', errorMessage: uploadError.message })
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
  const user = await requireAuth()
  const supabase = await createClient()

  // Verify user owns this file path (must be under their userId prefix)
  if (!path.startsWith(`${user.id}/`)) {
    return { success: false, error: 'Forbidden' }
  }

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    log.error('Delete failed', { context: 'media.delete', errorMessage: error.message })
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
