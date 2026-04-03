const WORDS_PER_MINUTE = 200

/**
 * Calculate reading time and word count from text content.
 */
export function calculateReadingTime(content: string): {
  readTimeMinutes: number
  wordCount: number
} {
  const text = content.replace(/<[^>]*>/g, ' ').trim()
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return { readTimeMinutes, wordCount }
}
