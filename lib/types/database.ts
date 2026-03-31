/**
 * Database type definitions.
 * 
 * These types mirror the Supabase schema and are used throughout the DAL.
 * For production, generate these automatically with:
 *   npx supabase gen types typescript --project-id kffsglguvqnuhbfanpor > lib/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string
          bio: string | null
          avatar_url: string | null
          role: 'author' | 'editor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string
          bio?: string | null
          avatar_url?: string | null
          role?: 'author' | 'editor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          bio?: string | null
          avatar_url?: string | null
          role?: 'author' | 'editor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          cover_image_url: string | null
          category: string | null
          status: 'draft' | 'published'
          author_id: string
          like_count: number
          view_count: number
          read_time_minutes: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content?: string
          excerpt?: string | null
          cover_image_url?: string | null
          category?: string | null
          status?: 'draft' | 'published'
          author_id: string
          like_count?: number
          view_count?: number
          read_time_minutes?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          cover_image_url?: string | null
          category?: string | null
          status?: 'draft' | 'published'
          author_id?: string
          like_count?: number
          view_count?: number
          read_time_minutes?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
    }
    Functions: {
      increment_view_count: {
        Args: { article_id: string }
        Returns: void
      }
    }
  }
}
