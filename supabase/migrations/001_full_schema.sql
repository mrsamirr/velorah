-- ============================================================================
-- Velorah Full Schema Migration
-- Run in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================================

-- ============================================================================
-- 1. ALTER PROFILES TABLE
-- ============================================================================

-- Drop and recreate the role check to include 'reader'
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('reader', 'author', 'editor', 'admin'));

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS follower_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS following_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS article_count INTEGER NOT NULL DEFAULT 0;

-- Generate usernames for existing profiles that don't have one
UPDATE public.profiles
SET username = LOWER(REPLACE(display_name, ' ', '-')) || '-' || SUBSTRING(id::TEXT FROM 1 FOR 8)
WHERE username IS NULL;

-- Now make username NOT NULL + UNIQUE
ALTER TABLE public.profiles ALTER COLUMN username SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- ============================================================================
-- 2. CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  article_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 3. ALTER ARTICLES TABLE
-- ============================================================================

-- Drop and recreate the status check
ALTER TABLE public.articles DROP CONSTRAINT IF EXISTS articles_status_check;
ALTER TABLE public.articles ADD CONSTRAINT articles_status_check
  CHECK (status IN ('draft', 'published', 'archived', 'under_review'));

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS content_raw TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS cover_image_alt TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS allow_comments BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS comment_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS bookmark_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS share_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS word_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;

-- Generate slugs for existing articles
UPDATE public.articles
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || SUBSTRING(id::TEXT FROM 1 FOR 8)
WHERE slug IS NULL;

ALTER TABLE public.articles ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON public.articles(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_articles_scheduled_at ON public.articles(scheduled_at) WHERE scheduled_at IS NOT NULL;

-- Full-text search column
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(content, '')), 'C')
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_articles_fts ON public.articles USING GIN (fts);

-- ============================================================================
-- 4. TAGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  article_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are viewable by everyone"
  ON public.tags FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON public.tags FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- 5. ARTICLE_TAGS JOIN TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.article_tags (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Article tags are viewable by everyone"
  ON public.article_tags FOR SELECT USING (true);

CREATE POLICY "Authors can manage own article tags"
  ON public.article_tags FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.articles WHERE id = article_id AND author_id = auth.uid())
  );

-- ============================================================================
-- 6. COMMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  is_edited BOOLEAN NOT NULL DEFAULT false,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visible comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (is_hidden = false OR author_id = auth.uid());

CREATE POLICY "Authenticated users can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = author_id);

CREATE TRIGGER set_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 7. LIKES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT likes_target_check CHECK (
    (article_id IS NOT NULL AND comment_id IS NULL) OR
    (article_id IS NULL AND comment_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_likes_user_article ON public.likes(user_id, article_id) WHERE article_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_likes_user_comment ON public.likes(user_id, comment_id) WHERE comment_id IS NOT NULL;

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are viewable by everyone"
  ON public.likes FOR SELECT USING (true);

CREATE POLICY "Users can manage own likes"
  ON public.likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON public.likes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 8. BOOKMARKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 9. FOLLOWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT follows_no_self CHECK (follower_id != following_id),
  UNIQUE(follower_id, following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON public.follows(following_id);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Follows are viewable by everyone"
  ON public.follows FOR SELECT USING (true);

CREATE POLICY "Users can manage own follows"
  ON public.follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
  ON public.follows FOR DELETE
  USING (auth.uid() = follower_id);

-- ============================================================================
-- 10. NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'mention', 'system')),
  entity_type TEXT,
  entity_id UUID,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id, is_read, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = recipient_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- ============================================================================
-- 11. READING HISTORY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  scroll_percentage INTEGER NOT NULL DEFAULT 0 CHECK (scroll_percentage BETWEEN 0 AND 100)
);

CREATE INDEX IF NOT EXISTS idx_reading_history_user ON public.reading_history(user_id, read_at DESC);

ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading history"
  ON public.reading_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own reading history"
  ON public.reading_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history"
  ON public.reading_history FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 12. REPORTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('article', 'comment', 'profile')),
  entity_id UUID NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'harassment', 'misinformation', 'copyright', 'other')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can view all reports"
  ON public.reports FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update reports"
  ON public.reports FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- 13. RPC FUNCTIONS
-- ============================================================================

-- Increment like count on articles
CREATE OR REPLACE FUNCTION public.increment_like_count(target_article_id UUID, delta INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.articles
  SET like_count = GREATEST(0, like_count + delta)
  WHERE id = target_article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment comment count on articles
CREATE OR REPLACE FUNCTION public.increment_comment_count(target_article_id UUID, delta INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.articles
  SET comment_count = GREATEST(0, comment_count + delta)
  WHERE id = target_article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment bookmark count on articles
CREATE OR REPLACE FUNCTION public.increment_bookmark_count(target_article_id UUID, delta INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.articles
  SET bookmark_count = GREATEST(0, bookmark_count + delta)
  WHERE id = target_article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment comment like count
CREATE OR REPLACE FUNCTION public.increment_comment_like_count(target_comment_id UUID, delta INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.comments
  SET like_count = GREATEST(0, like_count + delta)
  WHERE id = target_comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update follower counts
CREATE OR REPLACE FUNCTION public.update_follower_counts(p_follower_id UUID, p_following_id UUID, delta INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles SET following_count = GREATEST(0, following_count + delta) WHERE id = p_follower_id;
  UPDATE public.profiles SET follower_count = GREATEST(0, follower_count + delta) WHERE id = p_following_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update article count on profiles
CREATE OR REPLACE FUNCTION public.update_article_count(p_author_id UUID, delta INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles SET article_count = GREATEST(0, article_count + delta) WHERE id = p_author_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generate a unique slug
CREATE OR REPLACE FUNCTION public.generate_unique_slug(base_slug TEXT, table_name TEXT DEFAULT 'articles')
RETURNS TEXT AS $$
DECLARE
  candidate TEXT := base_slug;
  counter INTEGER := 1;
  slug_exists BOOLEAN;
BEGIN
  LOOP
    EXECUTE format('SELECT EXISTS(SELECT 1 FROM public.%I WHERE slug = $1)', table_name)
    INTO slug_exists USING candidate;
    IF NOT slug_exists THEN
      RETURN candidate;
    END IF;
    candidate := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Full-text search for articles
CREATE OR REPLACE FUNCTION public.search_articles(search_query TEXT, result_limit INTEGER DEFAULT 20, result_offset INTEGER DEFAULT 0)
RETURNS TABLE(
  id UUID,
  title TEXT,
  excerpt TEXT,
  slug TEXT,
  cover_image_url TEXT,
  author_id UUID,
  like_count INTEGER,
  view_count INTEGER,
  read_time_minutes INTEGER,
  published_at TIMESTAMPTZ,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id, a.title, a.excerpt, a.slug, a.cover_image_url,
    a.author_id, a.like_count, a.view_count, a.read_time_minutes,
    a.published_at,
    ts_rank(a.fts, websearch_to_tsquery('english', search_query)) AS rank
  FROM public.articles a
  WHERE a.status = 'published'
    AND a.fts @@ websearch_to_tsquery('english', search_query)
  ORDER BY rank DESC
  LIMIT result_limit
  OFFSET result_offset;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create notification helper
CREATE OR REPLACE FUNCTION public.create_notification(
  p_recipient_id UUID,
  p_actor_id UUID,
  p_type TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_message TEXT
)
RETURNS UUID AS $$
DECLARE
  notif_id UUID;
BEGIN
  -- Don't notify self
  IF p_recipient_id = p_actor_id THEN
    RETURN NULL;
  END IF;

  INSERT INTO public.notifications (recipient_id, actor_id, type, entity_type, entity_id, message)
  VALUES (p_recipient_id, p_actor_id, p_type, p_entity_type, p_entity_id, p_message)
  RETURNING id INTO notif_id;

  RETURN notif_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 14. UPDATE handle_new_user TO GENERATE USERNAME
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter INTEGER := 0;
BEGIN
  base_username := LOWER(REGEXP_REPLACE(
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    '[^a-z0-9-]', '', 'g'
  ));

  -- Ensure minimum length
  IF LENGTH(base_username) < 3 THEN
    base_username := base_username || 'user';
  END IF;

  final_username := base_username;
  LOOP
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username);
    counter := counter + 1;
    final_username := base_username || counter::TEXT;
  END LOOP;

  INSERT INTO public.profiles (id, email, display_name, username, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    final_username,
    'author'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 15. STORAGE BUCKETS
-- ============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('covers', 'covers', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('article-media', 'article-media', true) ON CONFLICT DO NOTHING;

-- Storage policies: anyone can view, authenticated users can upload to own folder
CREATE POLICY "Public avatar access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users upload own avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::TEXT);
CREATE POLICY "Users delete own avatars" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::TEXT);

CREATE POLICY "Public cover access" ON storage.objects FOR SELECT USING (bucket_id = 'covers');
CREATE POLICY "Users upload own covers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'covers' AND (storage.foldername(name))[1] = auth.uid()::TEXT);
CREATE POLICY "Users delete own covers" ON storage.objects FOR DELETE USING (bucket_id = 'covers' AND (storage.foldername(name))[1] = auth.uid()::TEXT);

CREATE POLICY "Public article media access" ON storage.objects FOR SELECT USING (bucket_id = 'article-media');
CREATE POLICY "Users upload own article media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'article-media' AND (storage.foldername(name))[1] = auth.uid()::TEXT);
CREATE POLICY "Users delete own article media" ON storage.objects FOR DELETE USING (bucket_id = 'article-media' AND (storage.foldername(name))[1] = auth.uid()::TEXT);
