/**
 * Database type definitions.
 *
 * These types mirror the Supabase schema and are used throughout the DAL.
 * For production, generate these automatically with:
 *   npx supabase gen types typescript --project-id <id> > lib/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ArticleStatus = 'draft' | 'published' | 'archived' | 'under_review'
export type UserRole = 'reader' | 'author' | 'editor' | 'admin'
export type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'system'
export type ReportReason = 'spam' | 'harassment' | 'misinformation' | 'copyright' | 'other'
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed'
export type EntityType = 'article' | 'comment' | 'profile'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string
          username: string
          bio: string | null
          avatar_url: string | null
          cover_image_url: string | null
          website_url: string | null
          location: string | null
          social_links: Json
          role: UserRole
          is_verified: boolean
          email_notifications: boolean
          follower_count: number
          following_count: number
          article_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string
          username: string
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          website_url?: string | null
          location?: string | null
          social_links?: Json
          role?: UserRole
          is_verified?: boolean
          email_notifications?: boolean
          follower_count?: number
          following_count?: number
          article_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          username?: string
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          website_url?: string | null
          location?: string | null
          social_links?: Json
          role?: UserRole
          is_verified?: boolean
          email_notifications?: boolean
          follower_count?: number
          following_count?: number
          article_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          content_raw: string | null
          excerpt: string | null
          cover_image_url: string | null
          cover_image_alt: string | null
          category: string | null
          category_id: string | null
          status: ArticleStatus
          author_id: string
          is_featured: boolean
          is_pinned: boolean
          allow_comments: boolean
          meta_title: string | null
          meta_description: string | null
          canonical_url: string | null
          like_count: number
          view_count: number
          comment_count: number
          bookmark_count: number
          share_count: number
          word_count: number
          read_time_minutes: number
          language: string
          scheduled_at: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string
          content_raw?: string | null
          excerpt?: string | null
          cover_image_url?: string | null
          cover_image_alt?: string | null
          category?: string | null
          category_id?: string | null
          status?: ArticleStatus
          author_id: string
          is_featured?: boolean
          is_pinned?: boolean
          allow_comments?: boolean
          meta_title?: string | null
          meta_description?: string | null
          canonical_url?: string | null
          like_count?: number
          view_count?: number
          comment_count?: number
          bookmark_count?: number
          share_count?: number
          word_count?: number
          read_time_minutes?: number
          language?: string
          scheduled_at?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          content_raw?: string | null
          excerpt?: string | null
          cover_image_url?: string | null
          cover_image_alt?: string | null
          category?: string | null
          category_id?: string | null
          status?: ArticleStatus
          author_id?: string
          is_featured?: boolean
          is_pinned?: boolean
          allow_comments?: boolean
          meta_title?: string | null
          meta_description?: string | null
          canonical_url?: string | null
          like_count?: number
          view_count?: number
          comment_count?: number
          bookmark_count?: number
          share_count?: number
          word_count?: number
          read_time_minutes?: number
          language?: string
          scheduled_at?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          sort_order: number
          article_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          sort_order?: number
          article_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          sort_order?: number
          article_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          article_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          article_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          article_count?: number
          created_at?: string
        }
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
      comments: {
        Row: {
          id: string
          article_id: string
          author_id: string
          parent_id: string | null
          body: string
          is_edited: boolean
          is_hidden: boolean
          like_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          article_id: string
          author_id: string
          parent_id?: string | null
          body: string
          is_edited?: boolean
          is_hidden?: boolean
          like_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          author_id?: string
          parent_id?: string | null
          body?: string
          is_edited?: boolean
          is_hidden?: boolean
          like_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          article_id: string | null
          comment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id?: string | null
          comment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string | null
          comment_id?: string | null
          created_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          article_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string
          actor_id: string | null
          type: NotificationType
          entity_type: string | null
          entity_id: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          recipient_id: string
          actor_id?: string | null
          type: NotificationType
          entity_type?: string | null
          entity_id?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          recipient_id?: string
          actor_id?: string | null
          type?: NotificationType
          entity_type?: string | null
          entity_id?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      reading_history: {
        Row: {
          id: string
          user_id: string
          article_id: string
          read_at: string
          scroll_percentage: number
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          read_at?: string
          scroll_percentage?: number
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          read_at?: string
          scroll_percentage?: number
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          entity_type: EntityType
          entity_id: string
          reason: ReportReason
          description: string | null
          status: ReportStatus
          resolved_by: string | null
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          entity_type: EntityType
          entity_id: string
          reason: ReportReason
          description?: string | null
          status?: ReportStatus
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          entity_type?: EntityType
          entity_id?: string
          reason?: ReportReason
          description?: string | null
          status?: ReportStatus
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
        }
      }
    }
    Functions: {
      increment_view_count: {
        Args: { article_id: string }
        Returns: void
      }
      increment_like_count: {
        Args: { target_article_id: string; delta?: number }
        Returns: void
      }
      increment_comment_count: {
        Args: { target_article_id: string; delta?: number }
        Returns: void
      }
      increment_bookmark_count: {
        Args: { target_article_id: string; delta?: number }
        Returns: void
      }
      increment_comment_like_count: {
        Args: { target_comment_id: string; delta?: number }
        Returns: void
      }
      update_follower_counts: {
        Args: { p_follower_id: string; p_following_id: string; delta?: number }
        Returns: void
      }
      update_article_count: {
        Args: { p_author_id: string; delta?: number }
        Returns: void
      }
      generate_unique_slug: {
        Args: { base_slug: string; table_name?: string }
        Returns: string
      }
      search_articles: {
        Args: { search_query: string; result_limit?: number; result_offset?: number }
        Returns: {
          id: string
          title: string
          excerpt: string | null
          slug: string
          cover_image_url: string | null
          author_id: string
          like_count: number
          view_count: number
          read_time_minutes: number
          published_at: string | null
          rank: number
        }[]
      }
      create_notification: {
        Args: {
          p_recipient_id: string
          p_actor_id: string
          p_type: string
          p_entity_type: string
          p_entity_id: string
          p_message: string
        }
        Returns: string | null
      }
    }
  }
}