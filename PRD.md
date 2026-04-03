# Velorah — Production Blog Platform PRD

Document version: 3.0
Date: 2026-04-03
Status: Approved for implementation
Supersedes: DOCUMENTATION.md v2.0

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack](#2-tech-stack)
3. [Architecture Overview](#3-architecture-overview)
4. [Database Schema — Complete Field Reference](#4-database-schema--complete-field-reference)
5. [Module A: Experience Shell and Navigation](#5-module-a-experience-shell-and-navigation)
6. [Module B: Identity and Access (NextAuth)](#6-module-b-identity-and-access-nextauth)
7. [Module C: Author Profiles and Social](#7-module-c-author-profiles-and-social)
8. [Module D: Content Engine — Articles](#8-module-d-content-engine--articles)
9. [Module E: Categories and Tags](#9-module-e-categories-and-tags)
10. [Module F: Engagement — Comments, Likes, Bookmarks](#10-module-f-engagement--comments-likes-bookmarks)
11. [Module G: Media and File Management](#11-module-g-media-and-file-management)
12. [Module H: Search and Discovery](#12-module-h-search-and-discovery)
13. [Module I: Author Dashboard and Analytics](#13-module-i-author-dashboard-and-analytics)
14. [Module J: Admin Panel and Moderation](#14-module-j-admin-panel-and-moderation)
15. [Module K: Content Delivery APIs](#15-module-k-content-delivery-apis)
16. [Module L: Notifications](#16-module-l-notifications)
17. [Module M: SEO and Performance](#17-module-m-seo-and-performance)
18. [Module N: Legal and Policy](#18-module-n-legal-and-policy)
19. [Security Specification](#19-security-specification)
20. [API Reference — Complete Endpoint Catalog](#20-api-reference--complete-endpoint-catalog)
21. [Environment Variables](#21-environment-variables)
22. [Delivery Roadmap](#22-delivery-roadmap)
23. [Open Questions](#23-open-questions)

---

## 1. Executive Summary

Velorah is a fully operational, production-grade blogging and publication platform for long-form writing. It serves three user classes:

- **Readers**: discover, read, search, comment on, like, and bookmark articles through a cinematic editorial experience.
- **Authors**: write rich-text articles with media, manage drafts, track analytics, build a public profile, and moderate comments on their content.
- **Admins**: moderate all content and users, manage categories/tags, view platform-wide analytics, and enforce content policies.

The platform is built on Next.js (App Router), uses NextAuth for authentication with multiple providers, and persists all data in Supabase Postgres with Row Level Security enforced at every table.

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js (App Router) | 16.x | Server Components, Server Actions, Middleware |
| Language | TypeScript | 5.x | Strict mode enabled |
| Auth | NextAuth.js (Auth.js) | v5 | @auth/supabase-adapter, OAuth + Credentials + Magic Link |
| Database | Supabase Postgres | Latest | RLS, triggers, stored procedures, full-text search |
| ORM/Client | @supabase/supabase-js + @supabase/ssr | 2.x | Typed with generated Database types |
| Styling | Tailwind CSS | 4.x | Custom design tokens in globals.css |
| Validation | Zod | 4.x | Server-side input validation on all mutations |
| Rich Text | TipTap or MDX | TBD | WYSIWYG editor with sanitized HTML output |
| File Storage | Supabase Storage | - | Bucket-based with signed URLs and size limits |
| Rate Limiting | @upstash/ratelimit | - | Redis-backed, replaces current in-memory limiter |
| Email | Resend or Nodemailer | - | Transactional emails: verification, notifications |
| Deployment | Vercel | - | Edge middleware, ISR, image optimization |

### Key Dependencies to Add

```
next-auth @auth/supabase-adapter    # Auth
@upstash/ratelimit @upstash/redis   # Rate limiting
@tiptap/react @tiptap/starter-kit   # Rich text editor
sanitize-html                       # HTML sanitization
slugify                             # URL-safe slug generation
sharp                               # Image optimization
resend                              # Transactional email
jsonwebtoken                        # Supabase JWT signing for RLS
```

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                     │
│  Next.js Client Components · TopNavBar · Footer · Editor│
└──────────────┬──────────────────────────┬───────────────┘
               │ Server Components        │ Client fetch
               ▼                          ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Next.js App Router     │  │    API Routes (/api/*)   │
│   Server Components      │  │    GET/POST/PATCH/DELETE  │
│   Server Actions         │  │    Rate-limited           │
│   Middleware (auth gate)  │  │    Validated with Zod     │
└──────────┬───────────────┘  └──────────┬───────────────┘
           │                             │
           ▼                             ▼
┌─────────────────────────────────────────────────────────┐
│              Data Access Layer (lib/dal/*)               │
│   auth.ts · articles.ts · profiles.ts · comments.ts     │
│   categories.ts · tags.ts · likes.ts · bookmarks.ts     │
│   notifications.ts · media.ts · follows.ts              │
│                                                         │
│   Every function: requireAuth() → ownership check → RLS │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Supabase Postgres                      │
│   next_auth schema (sessions, accounts, users, tokens)   │
│   public schema (profiles, articles, comments, ...)      │
│   storage (media bucket)                                 │
│   RLS on every table · Triggers · RPC functions          │
└─────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Middleware** (`middleware.ts`): refreshes NextAuth session token on every request; redirects unauthenticated users from protected routes.
2. **Server Component / Action**: calls DAL functions which internally call `auth()` from NextAuth to verify session.
3. **DAL**: executes parameterized queries via Supabase client with the user's JWT injected for RLS enforcement.
4. **Database**: RLS policies enforce row-level access; triggers maintain `updated_at` and derived fields.

---

## 4. Database Schema — Complete Field Reference

### 4.1 NextAuth Schema (`next_auth.*`)

These tables are managed by the `@auth/supabase-adapter` and should not be modified manually.

#### `next_auth.users`

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| name | TEXT | nullable |
| email | TEXT | UNIQUE, nullable |
| emailVerified | TIMESTAMPTZ | nullable |
| image | TEXT | nullable |

#### `next_auth.accounts`

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| userId | UUID | FK → next_auth.users(id) ON DELETE CASCADE |
| type | TEXT | NOT NULL |
| provider | TEXT | NOT NULL |
| providerAccountId | TEXT | NOT NULL |
| refresh_token | TEXT | nullable |
| access_token | TEXT | nullable |
| expires_at | BIGINT | nullable |
| token_type | TEXT | nullable |
| scope | TEXT | nullable |
| id_token | TEXT | nullable |
| session_state | TEXT | nullable |
| | | UNIQUE(provider, providerAccountId) |

#### `next_auth.sessions`

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| sessionToken | TEXT | UNIQUE, NOT NULL |
| userId | UUID | FK → next_auth.users(id) ON DELETE CASCADE |
| expires | TIMESTAMPTZ | NOT NULL |

#### `next_auth.verification_tokens`

| Field | Type | Constraints |
|-------|------|-------------|
| identifier | TEXT | NOT NULL |
| token | TEXT | PK, UNIQUE |
| expires | TIMESTAMPTZ | NOT NULL |
| | | UNIQUE(token, identifier) |

### 4.2 Public Schema (`public.*`)

#### `profiles`

Linked 1:1 with `next_auth.users`. Created automatically via trigger on signup.

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | — | PK, FK → next_auth.users(id) ON DELETE CASCADE | User identity |
| email | TEXT | — | NOT NULL | Contact/login email |
| username | TEXT | — | UNIQUE, NOT NULL | URL-safe handle (e.g. @julianth) |
| display_name | TEXT | '' | NOT NULL | Public display name |
| bio | TEXT | NULL | max 500 chars | Short biography |
| avatar_url | TEXT | NULL | — | Profile image URL |
| cover_image_url | TEXT | NULL | — | Profile banner image |
| website_url | TEXT | NULL | — | Personal website link |
| location | TEXT | NULL | max 100 chars | City/country |
| social_links | JSONB | '{}' | — | `{twitter, github, linkedin, instagram}` |
| role | TEXT | 'author' | CHECK IN ('reader','author','editor','admin') | Access level |
| is_verified | BOOLEAN | false | NOT NULL | Staff-verified badge |
| email_notifications | BOOLEAN | true | NOT NULL | Opt-in for email notifications |
| follower_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized count |
| following_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized count |
| article_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized count |
| created_at | TIMESTAMPTZ | now() | NOT NULL | Registration date |
| updated_at | TIMESTAMPTZ | now() | NOT NULL | Last profile edit |

**Indexes**: `profiles_username_idx` (UNIQUE), `profiles_role_idx`
**RLS**: SELECT public; INSERT/UPDATE own row only; DELETE cascade from next_auth.users

#### `articles`

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | gen_random_uuid() | PK | Article identity |
| title | TEXT | — | NOT NULL, 1–200 chars | Headline |
| slug | TEXT | — | UNIQUE, NOT NULL | URL-safe path segment |
| content | TEXT | '' | NOT NULL | Sanitized HTML body |
| content_raw | TEXT | '' | NOT NULL | Raw editor state (TipTap JSON or MDX) |
| excerpt | TEXT | NULL | max 500 chars | Manual or auto-generated summary |
| cover_image_url | TEXT | NULL | — | Hero image |
| cover_image_alt | TEXT | NULL | max 200 chars | Accessibility alt text |
| status | TEXT | 'draft' | NOT NULL, CHECK IN ('draft','published','archived','under_review') | Lifecycle state |
| author_id | UUID | — | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Owner |
| category_id | UUID | NULL | FK → categories(id) ON DELETE SET NULL | Primary category |
| is_featured | BOOLEAN | false | NOT NULL | Editor's pick flag |
| is_pinned | BOOLEAN | false | NOT NULL | Author-pinned to profile |
| allow_comments | BOOLEAN | true | NOT NULL | Comment gate |
| meta_title | TEXT | NULL | max 70 chars | SEO title override |
| meta_description | TEXT | NULL | max 160 chars | SEO description |
| canonical_url | TEXT | NULL | — | Canonical link for syndicated content |
| like_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| comment_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| bookmark_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| view_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| share_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| read_time_minutes | INTEGER | 1 | NOT NULL, >= 1 | Auto-calculated (content words ÷ 200) |
| word_count | INTEGER | 0 | NOT NULL, >= 0 | Auto-calculated |
| language | TEXT | 'en' | NOT NULL | ISO 639-1 code |
| created_at | TIMESTAMPTZ | now() | NOT NULL | First save |
| updated_at | TIMESTAMPTZ | now() | NOT NULL | Last edit |
| published_at | TIMESTAMPTZ | NULL | — | First publish timestamp |
| scheduled_at | TIMESTAMPTZ | NULL | — | Future publish schedule |

**Indexes**: `idx_articles_slug` (UNIQUE), `idx_articles_author_id`, `idx_articles_status`, `idx_articles_published_at` (DESC), `idx_articles_category_id`, `idx_articles_is_featured`, `idx_articles_fts` (GIN on tsvector)
**RLS**: SELECT published OR own; INSERT/UPDATE/DELETE own only; admin override

#### `categories`

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | gen_random_uuid() | PK | Category identity |
| name | TEXT | — | UNIQUE, NOT NULL, 1–50 chars | Display name |
| slug | TEXT | — | UNIQUE, NOT NULL | URL segment |
| description | TEXT | NULL | max 300 chars | Category description |
| color | TEXT | NULL | — | Hex color for UI badges |
| icon | TEXT | NULL | — | Material icon name |
| sort_order | INTEGER | 0 | NOT NULL | Display ordering |
| article_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| created_at | TIMESTAMPTZ | now() | NOT NULL | — |

**RLS**: SELECT public; INSERT/UPDATE/DELETE admin only

#### `tags`

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | gen_random_uuid() | PK | Tag identity |
| name | TEXT | — | UNIQUE, NOT NULL, 1–30 chars | Display label |
| slug | TEXT | — | UNIQUE, NOT NULL | URL segment |
| article_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| created_at | TIMESTAMPTZ | now() | NOT NULL | — |

**RLS**: SELECT public; INSERT authenticated; UPDATE/DELETE admin only

#### `article_tags` (junction)

| Field | Type | Constraints |
|-------|------|-------------|
| article_id | UUID | FK → articles(id) ON DELETE CASCADE |
| tag_id | UUID | FK → tags(id) ON DELETE CASCADE |
| | | PK(article_id, tag_id) |

**RLS**: follows parent article policy

#### `comments`

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | gen_random_uuid() | PK | Comment identity |
| article_id | UUID | — | NOT NULL, FK → articles(id) ON DELETE CASCADE | Parent article |
| author_id | UUID | — | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Commenter |
| parent_id | UUID | NULL | FK → comments(id) ON DELETE CASCADE | Thread reply parent |
| body | TEXT | — | NOT NULL, 1–5000 chars | Sanitized comment text |
| is_edited | BOOLEAN | false | NOT NULL | Edit flag |
| is_hidden | BOOLEAN | false | NOT NULL | Moderation hide |
| like_count | INTEGER | 0 | NOT NULL, >= 0 | Denormalized |
| created_at | TIMESTAMPTZ | now() | NOT NULL | — |
| updated_at | TIMESTAMPTZ | now() | NOT NULL | — |

**Indexes**: `idx_comments_article_id`, `idx_comments_parent_id`, `idx_comments_author_id`
**RLS**: SELECT where not hidden OR own; INSERT authenticated; UPDATE own only; DELETE own or admin

#### `likes`

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Row identity |
| user_id | UUID | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Liker |
| article_id | UUID | NULL, FK → articles(id) ON DELETE CASCADE | Liked article |
| comment_id | UUID | NULL, FK → comments(id) ON DELETE CASCADE | Liked comment |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | — |
| | | UNIQUE(user_id, article_id) | One like per article |
| | | UNIQUE(user_id, comment_id) | One like per comment |
| | | CHECK(article_id IS NOT NULL OR comment_id IS NOT NULL) | Must target something |

**RLS**: SELECT public; INSERT/DELETE own only

#### `bookmarks`

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Row identity |
| user_id | UUID | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Bookmarker |
| article_id | UUID | NOT NULL, FK → articles(id) ON DELETE CASCADE | Saved article |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | — |
| | | UNIQUE(user_id, article_id) | One bookmark per article |

**RLS**: SELECT/INSERT/DELETE own only

#### `follows`

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Row identity |
| follower_id | UUID | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Who follows |
| following_id | UUID | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Who is followed |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | — |
| | | UNIQUE(follower_id, following_id) | No duplicate follows |
| | | CHECK(follower_id != following_id) | Cannot self-follow |

**RLS**: SELECT public; INSERT/DELETE own follower_id only

#### `notifications`

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | gen_random_uuid() | PK | Notification identity |
| recipient_id | UUID | — | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Who receives |
| actor_id | UUID | NULL | FK → profiles(id) ON DELETE SET NULL | Who triggered |
| type | TEXT | — | NOT NULL, CHECK IN ('like','comment','follow','mention','system','article_published') | Event type |
| entity_type | TEXT | NULL | CHECK IN ('article','comment','profile') | What was acted on |
| entity_id | UUID | NULL | — | ID of entity |
| message | TEXT | NULL | max 500 chars | Display text |
| is_read | BOOLEAN | false | NOT NULL | Read state |
| created_at | TIMESTAMPTZ | now() | NOT NULL | — |

**Indexes**: `idx_notifications_recipient_id`, `idx_notifications_is_read`
**RLS**: SELECT/UPDATE own recipient_id only; INSERT system or trigger only

#### `reading_history`

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Row identity |
| user_id | UUID | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Reader |
| article_id | UUID | NOT NULL, FK → articles(id) ON DELETE CASCADE | Article read |
| read_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | When read |
| scroll_percentage | INTEGER | DEFAULT 0, CHECK BETWEEN 0 AND 100 | How far user scrolled |
| | | UNIQUE(user_id, article_id) | Upsert on re-read |

**RLS**: SELECT/INSERT/UPDATE own only

#### `reports`

| Field | Type | Default | Constraints | Description |
|-------|------|---------|-------------|-------------|
| id | UUID | gen_random_uuid() | PK | Report identity |
| reporter_id | UUID | — | NOT NULL, FK → profiles(id) ON DELETE CASCADE | Who reported |
| entity_type | TEXT | — | NOT NULL, CHECK IN ('article','comment','profile') | What type |
| entity_id | UUID | — | NOT NULL | ID of reported entity |
| reason | TEXT | — | NOT NULL, CHECK IN ('spam','harassment','misinformation','copyright','other') | Report category |
| description | TEXT | NULL | max 1000 chars | Details |
| status | TEXT | 'pending' | NOT NULL, CHECK IN ('pending','reviewed','resolved','dismissed') | Moderation status |
| resolved_by | UUID | NULL | FK → profiles(id) ON DELETE SET NULL | Admin who resolved |
| resolved_at | TIMESTAMPTZ | NULL | — | Resolution timestamp |
| created_at | TIMESTAMPTZ | now() | NOT NULL | — |

**RLS**: INSERT authenticated; SELECT own reports or admin; UPDATE admin only

### 4.3 Database Functions and Triggers

| Function | Type | Purpose |
|----------|------|---------|
| `handle_updated_at()` | TRIGGER | Auto-set `updated_at = now()` BEFORE UPDATE on all tables |
| `handle_new_user()` | TRIGGER | Create public.profiles row AFTER INSERT on next_auth.users |
| `increment_view_count(article_id UUID)` | RPC (SECURITY DEFINER) | Atomic view count increment |
| `increment_like_count(article_id UUID, delta INT)` | RPC (SECURITY DEFINER) | Atomic like count adjustment (+1/-1) |
| `increment_comment_count(article_id UUID, delta INT)` | RPC (SECURITY DEFINER) | Atomic comment count adjustment |
| `increment_bookmark_count(article_id UUID, delta INT)` | RPC (SECURITY DEFINER) | Atomic bookmark count adjustment |
| `update_follower_counts(follower UUID, following UUID, delta INT)` | RPC (SECURITY DEFINER) | Update both profiles' follower/following counts |
| `update_article_count(author_id UUID, delta INT)` | RPC (SECURITY DEFINER) | Update profile article_count |
| `generate_unique_slug(title TEXT, table_name TEXT)` | RPC | Generate slug, append `-2`, `-3` on collision |
| `search_articles(query TEXT, lim INT, off INT)` | RPC | Full-text search with ts_rank ordering |

### 4.4 Supabase Storage Buckets

| Bucket | Access | Max File Size | Allowed MIME Types |
|--------|--------|--------------|-------------------|
| `avatars` | Public read; authenticated upload own | 2 MB | image/jpeg, image/png, image/webp |
| `covers` | Public read; authenticated upload own | 5 MB | image/jpeg, image/png, image/webp |
| `article-media` | Public read; authenticated upload | 10 MB | image/*, video/mp4, application/pdf |

---

## 5. Module A: Experience Shell and Navigation

### Purpose
Consistent visual and navigational frame across all pages.

### File Map

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout: fonts, theme tokens, metadata, SessionProvider |
| `components/TopNavBar.tsx` | Fixed nav: brand, section links, auth-aware actions, mobile menu |
| `components/Footer.tsx` | Site footer: legal, company, social links |
| `components/MobileMenu.tsx` | **NEW** — slide-out mobile navigation panel |
| `components/ThemeProvider.tsx` | **NEW** — dark/light mode provider |
| `components/UserMenu.tsx` | **NEW** — authenticated user dropdown (profile, dashboard, sign out) |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| A-01 | Fixed top navigation with brand anchor, section links (Essays, Collections, Philosophy), and auth CTA | P0 |
| A-02 | Scroll-aware nav: transparent on hero pages, solid on scroll | P0 |
| A-03 | Auth-aware nav: show Sign In for anonymous; show avatar + UserMenu for authenticated | P0 |
| A-04 | Responsive mobile menu with slide-out panel and all nav links | P0 |
| A-05 | Footer with Company, Legal, and Connect link groups | P0 |
| A-06 | Active route highlighting in nav via `usePathname()` | P1 |
| A-07 | SessionProvider wrapping in root layout for NextAuth client hooks | P0 |

### Implementation Notes (Migration from Current)

- Current `TopNavBar.tsx` has a non-functional mobile `<button>`. Replace with `MobileMenu` component using `Dialog` or sheet pattern.
- Add `SessionProvider` from `next-auth/react` to root layout.
- Replace hardcoded "Sign In" link with conditional rendering based on `useSession()`.

---

## 6. Module B: Identity and Access (NextAuth)

### Purpose
Authenticate users via multiple providers, establish secure sessions, protect routes, and integrate with Supabase RLS.

### File Map

| File | Purpose |
|------|---------|
| `lib/auth.ts` | **NEW** — NextAuth configuration: providers, adapter, callbacks |
| `app/api/auth/[...nextauth]/route.ts` | **NEW** — NextAuth API route handler |
| `middleware.ts` | Auth gate: protect `/author/*`, `/publish/*`, `/settings/*`, `/admin/*` |
| `app/signin/page.tsx` | Sign-in UI: OAuth buttons + email/password form |
| `app/signup/page.tsx` | Sign-up UI: OAuth + credentials registration form |
| `lib/dal/auth.ts` | Server-side auth helpers: `getCurrentUser()`, `requireAuth()`, `requireRole()` |
| `lib/schemas/auth.ts` | Zod schemas: SignUpSchema, SignInSchema |
| `types/next-auth.d.ts` | **NEW** — TypeScript extensions for session and JWT types |

### Auth Providers

| Provider | Type | Priority | Notes |
|----------|------|----------|-------|
| Google | OAuth 2.0 | P0 | Most common social login |
| GitHub | OAuth 2.0 | P0 | Developer audience |
| Email Magic Link | Passwordless | P1 | Via Resend/Nodemailer |
| Credentials | Email + Password | P1 | For users who prefer traditional auth |

### NextAuth Configuration (`lib/auth.ts`)

```typescript
// Key configuration points:
{
  adapter: SupabaseAdapter({ url, secret }),
  providers: [Google, GitHub, Resend, Credentials],
  session: { strategy: "database" },   // Database sessions, not JWT-only
  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/signin",
  },
  callbacks: {
    session({ session, user }) {
      // 1. Attach user.id and role to session
      // 2. Sign Supabase JWT with user.id as sub
      //    for RLS enforcement on client queries
      session.user.id = user.id
      session.user.role = user.role
      session.supabaseAccessToken = signJWT(...)
      return session
    },
  },
}
```

### Protected Route Map

| Route Pattern | Required Role | Middleware Action |
|--------------|--------------|-------------------|
| `/author/*` | authenticated | Redirect → /signin |
| `/publish/*` | authenticated | Redirect → /signin |
| `/settings/*` | authenticated | Redirect → /signin |
| `/admin/*` | admin | Redirect → /signin (or 403 if authenticated but not admin) |
| `/api/articles` POST/PATCH/DELETE | authenticated | Return 401 |
| `/api/admin/*` | admin | Return 403 |

### Security Requirements

| ID | Requirement |
|----|------------|
| B-SEC-01 | Use database sessions (not stateless JWT) so sessions can be revoked |
| B-SEC-02 | CSRF protection on all auth POST routes (built into NextAuth) |
| B-SEC-03 | Encrypted cookies with `httpOnly`, `secure`, `sameSite: lax` |
| B-SEC-04 | Rate limit auth endpoints: 5 attempts per minute per IP |
| B-SEC-05 | Generic error messages on failed login (no account enumeration) |
| B-SEC-06 | Sign Supabase JWT in session callback to pass user identity to RLS |
| B-SEC-07 | Password policy: minimum 8 chars, 1 letter, 1 number, 1 special char |
| B-SEC-08 | Email verification required before first article publish |
| B-SEC-09 | OAuth accounts auto-linked by verified email |
| B-SEC-10 | Session expiry: 30 days idle, absolute max 90 days |

### Validation Schemas

```typescript
// SignUpSchema
{
  displayName: z.string().min(2).max(50).trim(),
  email:       z.string().email().trim().toLowerCase(),
  password:    z.string().min(8)
               .regex(/[a-zA-Z]/)    // at least one letter
               .regex(/[0-9]/)       // at least one number
               .regex(/[^a-zA-Z0-9]/) // at least one special char
}

// SignInSchema
{
  email:    z.string().email().trim().toLowerCase(),
  password: z.string().min(1)
}
```

### Migration Notes (from current Supabase Auth)

- Replace `@supabase/ssr` auth calls with NextAuth `auth()` / `useSession()`.
- Remove `lib/supabase/middleware.ts` session refresh logic; NextAuth middleware handles this.
- Keep Supabase client for data operations; inject `supabaseAccessToken` for RLS.
- Remove `app/api/auth/callback/route.ts` (PKCE); NextAuth manages OAuth callbacks via `/api/auth/[...nextauth]`.

---

## 7. Module C: Author Profiles and Social

### Purpose
Public author identity, social connections (follow/unfollow), and profile management.

### File Map

| File | Purpose |
|------|---------|
| `app/author/[username]/page.tsx` | **NEW** — Public author profile page |
| `app/settings/page.tsx` | **NEW** — Account settings: profile edit, social links, notifications |
| `app/settings/security/page.tsx` | **NEW** — Password change, linked accounts, sessions |
| `components/AuthorCard.tsx` | **NEW** — Reusable author preview card |
| `components/FollowButton.tsx` | **NEW** — Follow/unfollow with optimistic UI |
| `lib/dal/profiles.ts` | Profile CRUD + follow operations |
| `lib/dal/follows.ts` | **NEW** — Follow/unfollow DAL |
| `lib/schemas/content.ts` | UpdateProfileSchema (existing, extended) |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| C-01 | Public profile page at `/author/[username]` with bio, avatar, stats, article list | P0 |
| C-02 | Follow/unfollow other authors (authenticated only) | P1 |
| C-03 | Follower and following counts displayed on profile | P1 |
| C-04 | Settings page: edit display_name, username, bio, avatar, cover image, website, location, social links | P0 |
| C-05 | Username uniqueness enforced at DB and validation layer | P0 |
| C-06 | Username format: 3–30 chars, alphanumeric + underscores/hyphens, no spaces | P0 |
| C-07 | Avatar upload to Supabase Storage `avatars` bucket (max 2MB, images only) | P0 |
| C-08 | Cover image upload to `covers` bucket (max 5MB) | P1 |
| C-09 | Social links validation: valid URLs for twitter, github, linkedin, instagram | P1 |
| C-10 | Email notification preference toggle | P1 |
| C-11 | Security settings: change password, view active sessions, revoke sessions | P2 |
| C-12 | Verified author badge display for `is_verified = true` | P2 |

### Profile Update Schema

```typescript
{
  display_name:    z.string().min(2).max(50).trim().optional(),
  username:        z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  bio:             z.string().max(500).optional(),
  avatar_url:      z.string().url().optional().or(z.literal('')),
  cover_image_url: z.string().url().optional().or(z.literal('')),
  website_url:     z.string().url().optional().or(z.literal('')),
  location:        z.string().max(100).optional(),
  social_links:    z.object({
    twitter:   z.string().url().optional().or(z.literal('')),
    github:    z.string().url().optional().or(z.literal('')),
    linkedin:  z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
  }).optional(),
  email_notifications: z.boolean().optional(),
}
```

---

## 8. Module D: Content Engine — Articles

### Purpose
Full article lifecycle: create, edit, preview, publish, schedule, archive, and delete.

### File Map

| File | Purpose |
|------|---------|
| `app/article/[slug]/page.tsx` | **NEW** — Dynamic article detail (replaces static /article) |
| `app/publish/page.tsx` | Article editor (create new) |
| `app/publish/[id]/page.tsx` | **NEW** — Article editor (edit existing) |
| `components/Editor.tsx` | **NEW** — TipTap rich text editor component |
| `components/ArticleCard.tsx` | **NEW** — Reusable article preview card |
| `components/ArticleRenderer.tsx` | **NEW** — Sanitized HTML renderer for article body |
| `components/TableOfContents.tsx` | **NEW** — Auto-generated from H2/H3 headings |
| `app/actions/content.ts` | Server actions: create, update, delete, publish, schedule |
| `lib/dal/articles.ts` | Article CRUD DAL |
| `lib/schemas/content.ts` | Article validation schemas |
| `lib/utils/slug.ts` | **NEW** — Slug generation and collision handling |
| `lib/utils/sanitize.ts` | **NEW** — HTML sanitization with allowlisted tags |
| `lib/utils/reading-time.ts` | **NEW** — Word count and reading time calculation |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| D-01 | WYSIWYG rich text editor with: bold, italic, headings (H2-H4), blockquote, code block, bullet/numbered lists, links, images, horizontal rule | P0 |
| D-02 | Article slug auto-generated from title; editable; unique enforcement | P0 |
| D-03 | Draft auto-save every 30 seconds (debounced) | P0 |
| D-04 | Cover image upload with alt text field | P0 |
| D-05 | Category selection (single) from predefined list | P0 |
| D-06 | Tag input (multi, max 5) with autocomplete from existing tags or create new | P0 |
| D-07 | Excerpt: manual entry or auto-generate from first 150 words of content | P1 |
| D-08 | Article preview mode (renders as public view without publishing) | P0 |
| D-09 | Publish immediately or schedule for future date/time | P1 |
| D-10 | Status transitions: draft → published, draft → scheduled → published, published → archived, any → draft | P0 |
| D-11 | Article detail page at `/article/[slug]` with content, metadata, author card, ToC, engagement buttons | P0 |
| D-12 | View count increment on article open (debounced, unique per session) | P0 |
| D-13 | Read time and word count auto-calculated on save | P0 |
| D-14 | SEO fields: meta_title, meta_description, canonical_url | P1 |
| D-15 | Pin article to top of author profile (max 3 pinned) | P2 |
| D-16 | Related articles section based on category and tags | P2 |
| D-17 | Allow comments toggle per article | P1 |
| D-18 | Delete article with confirmation (soft → RLS, hard delete after 30 days or immediately by admin) | P1 |
| D-19 | Content sanitization: strip script tags, event handlers, dangerous HTML on save | P0 |
| D-20 | Inline image upload within editor content to `article-media` bucket | P1 |

### Validation Schemas

```typescript
// CreateArticleSchema
{
  title:            z.string().min(1).max(200).trim(),
  slug:             z.string().min(1).max(250).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  content:          z.string().min(1),
  content_raw:      z.string().min(1),
  excerpt:          z.string().max(500).optional(),
  cover_image_url:  z.string().url().optional().or(z.literal('')),
  cover_image_alt:  z.string().max(200).optional(),
  category_id:      z.string().uuid().optional(),
  tag_ids:          z.array(z.string().uuid()).max(5).optional(),
  status:           z.enum(['draft', 'published']).default('draft'),
  scheduled_at:     z.string().datetime().optional(),
  meta_title:       z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
  canonical_url:    z.string().url().optional().or(z.literal('')),
  allow_comments:   z.boolean().default(true),
}
```

---

## 9. Module E: Categories and Tags

### Purpose
Organize articles into browsable taxonomies.

### File Map

| File | Purpose |
|------|---------|
| `app/category/[slug]/page.tsx` | **NEW** — Category archive page |
| `app/tag/[slug]/page.tsx` | **NEW** — Tag archive page |
| `lib/dal/categories.ts` | **NEW** — Category CRUD DAL |
| `lib/dal/tags.ts` | **NEW** — Tag CRUD DAL |
| `app/admin/categories/page.tsx` | **NEW** — Admin: manage categories |
| `app/admin/tags/page.tsx` | **NEW** — Admin: manage tags |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| E-01 | Predefined categories managed by admins (CRUD in admin panel) | P0 |
| E-02 | Category archive page showing all published articles in category, paginated | P0 |
| E-03 | Tags: authors can create new or select existing during article editing | P0 |
| E-04 | Tag archive page showing all published articles with tag, paginated | P0 |
| E-05 | Max 5 tags per article | P0 |
| E-06 | Tag autocomplete API endpoint | P1 |
| E-07 | Category and tag article counts maintained via triggers | P1 |
| E-08 | Slug auto-generated for new categories/tags | P0 |

---

## 10. Module F: Engagement — Comments, Likes, Bookmarks

### Purpose
Reader interaction with content and community building.

### File Map

| File | Purpose |
|------|---------|
| `components/CommentSection.tsx` | **NEW** — Threaded comment display and input |
| `components/CommentItem.tsx` | **NEW** — Single comment with reply, like, edit, delete |
| `components/LikeButton.tsx` | **NEW** — Article/comment like with optimistic UI |
| `components/BookmarkButton.tsx` | **NEW** — Save article with optimistic UI |
| `components/ShareButton.tsx` | **NEW** — Copy link, share to social |
| `app/author/bookmarks/page.tsx` | **NEW** — User's saved articles list |
| `lib/dal/comments.ts` | **NEW** — Comment CRUD DAL |
| `lib/dal/likes.ts` | **NEW** — Like/unlike DAL |
| `lib/dal/bookmarks.ts` | **NEW** — Bookmark CRUD DAL |
| `app/actions/engagement.ts` | **NEW** — Server actions for likes, comments, bookmarks |
| `lib/schemas/engagement.ts` | **NEW** — Validation schemas |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| F-01 | Like/unlike articles (authenticated, one per user per article) | P0 |
| F-02 | Like/unlike comments (authenticated, one per user per comment) | P1 |
| F-03 | Bookmark/unbookmark articles | P0 |
| F-04 | View bookmarked articles list on `/author/bookmarks` | P0 |
| F-05 | Post comments on articles (authenticated, max 5000 chars) | P0 |
| F-06 | Threaded replies (single nesting level for simplicity) | P1 |
| F-07 | Edit own comments (mark as edited) | P1 |
| F-08 | Delete own comments | P0 |
| F-09 | Article author can hide comments on their articles | P1 |
| F-10 | Admin can hide/delete any comment | P1 |
| F-11 | Comment input with markdown-lite (bold, italic, code, links) | P2 |
| F-12 | Share article: copy URL, native share sheet on mobile | P1 |
| F-13 | Optimistic UI for like/bookmark/comment submit | P0 |
| F-14 | Disable comments if `article.allow_comments = false` | P0 |
| F-15 | Comment count and like count visible on article cards and detail | P0 |

### Comment Validation Schema

```typescript
{
  article_id: z.string().uuid(),
  parent_id:  z.string().uuid().optional(),
  body:       z.string().min(1).max(5000).trim(),
}
```

---

## 11. Module G: Media and File Management

### Purpose
Secure upload, storage, and delivery of images and files.

### File Map

| File | Purpose |
|------|---------|
| `app/api/upload/route.ts` | **NEW** — Authenticated file upload endpoint |
| `lib/dal/media.ts` | **NEW** — Upload validation and Supabase Storage operations |
| `lib/utils/image.ts` | **NEW** — Image resize/optimize before upload |
| `components/ImageUpload.tsx` | **NEW** — Reusable drag-and-drop upload component |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| G-01 | Authenticated-only uploads | P0 |
| G-02 | File type validation server-side (check magic bytes, not just extension) | P0 |
| G-03 | File size limits enforced server-side per bucket | P0 |
| G-04 | Images resized to max 2000px width before storage | P1 |
| G-05 | Return public URL after successful upload | P0 |
| G-06 | Drag-and-drop upload UI in editor and cover image fields | P1 |
| G-07 | Upload progress indicator | P1 |
| G-08 | Files organized by user ID path: `{bucket}/{user_id}/{timestamp}_{filename}` | P0 |

### Security Requirements

| ID | Requirement |
|----|------------|
| G-SEC-01 | Validate MIME type from file content (magic bytes), not just Content-Type header |
| G-SEC-02 | Strip EXIF metadata from uploaded images |
| G-SEC-03 | Enforce per-user storage quota: 100 MB total |
| G-SEC-04 | Rate limit uploads: 20 per hour per user |
| G-SEC-05 | Scan filenames: reject path traversal characters |
| G-SEC-06 | Supabase Storage policies: users can only write to their own prefix |

---

## 12. Module H: Search and Discovery

### Purpose
Full-text article search, discovery feeds, and filtering.

### File Map

| File | Purpose |
|------|---------|
| `app/search/page.tsx` | **NEW** — Search results page |
| `app/feed/page.tsx` | Dynamic feed (replaces static version) |
| `app/archive/page.tsx` | Paginated archive (replaces static version) |
| `app/home/page.tsx` | Personalized feed for authenticated users |
| `components/SearchBar.tsx` | **NEW** — Global search input |
| `components/ArticleFilters.tsx` | **NEW** — Category/tag/date filter controls |
| `components/Pagination.tsx` | **NEW** — Reusable pagination component |
| `lib/dal/search.ts` | **NEW** — Full-text search DAL |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| H-01 | Full-text search across article title, excerpt, and content | P0 |
| H-02 | Search results page with relevance ranking | P0 |
| H-03 | Filter by category, tag, date range | P1 |
| H-04 | Sort: relevance, newest, most liked, most viewed | P1 |
| H-05 | Public feed page: latest published articles, paginated | P0 |
| H-06 | Featured articles section on feed (where `is_featured = true`) | P1 |
| H-07 | Archive page: all published articles, chronological, paginated | P0 |
| H-08 | Personalized home feed: articles from followed authors (authenticated) | P2 |
| H-09 | Search debounce (300ms client-side) to avoid excessive queries | P0 |
| H-10 | Search result highlighting (bold matched terms) | P2 |

### Postgres Full-Text Search Setup

```sql
-- Add tsvector column
ALTER TABLE articles ADD COLUMN fts tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;

-- GIN index
CREATE INDEX idx_articles_fts ON articles USING GIN (fts);

-- Search RPC
CREATE FUNCTION search_articles(query TEXT, lim INT DEFAULT 20, off INT DEFAULT 0)
RETURNS SETOF articles AS $$
  SELECT * FROM articles
  WHERE status = 'published'
    AND fts @@ plainto_tsquery('english', query)
  ORDER BY ts_rank(fts, plainto_tsquery('english', query)) DESC
  LIMIT lim OFFSET off;
$$ LANGUAGE sql STABLE SECURITY INVOKER;
```

---

## 13. Module I: Author Dashboard and Analytics

### Purpose
Author's command center for content management and performance tracking.

### File Map

| File | Purpose |
|------|---------|
| `app/author/page.tsx` | Dashboard: stats overview + article list |
| `app/author/articles/page.tsx` | **NEW** — Full article management list with filters |
| `app/author/comments/page.tsx` | **NEW** — Comments received on own articles |
| `app/author/analytics/page.tsx` | **NEW** — Detailed analytics charts |
| `components/StatsCard.tsx` | **NEW** — Reusable metric display |
| `components/ArticleTable.tsx` | **NEW** — Sortable/filterable article list |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| I-01 | Dashboard overview: total articles, published, drafts, total views, total likes, total comments, followers | P0 |
| I-02 | Article management list: title, status badge, view count, like count, published date, actions (edit, delete, pin) | P0 |
| I-03 | Filter articles by status (all, draft, published, archived, scheduled) | P0 |
| I-04 | Sort articles: newest, most viewed, most liked | P1 |
| I-05 | Quick actions: publish draft, archive, unpin/pin, delete with confirmation | P0 |
| I-06 | Comments management: list comments on own articles, hide/unhide | P1 |
| I-07 | Analytics page: views over time, top articles by views/likes, follower growth | P2 |
| I-08 | Reading history list for authenticated users | P2 |

---

## 14. Module J: Admin Panel and Moderation

### Purpose
Platform-wide content moderation, user management, and system configuration.

### File Map

| File | Purpose |
|------|---------|
| `app/admin/page.tsx` | **NEW** — Admin dashboard: platform stats, recent activity |
| `app/admin/users/page.tsx` | **NEW** — User list, role management, ban/suspend |
| `app/admin/articles/page.tsx` | **NEW** — All articles across all authors |
| `app/admin/comments/page.tsx` | **NEW** — Flagged/reported comments |
| `app/admin/reports/page.tsx` | **NEW** — Content reports queue |
| `app/admin/categories/page.tsx` | **NEW** — Category CRUD |
| `app/admin/tags/page.tsx` | **NEW** — Tag management |
| `lib/dal/admin.ts` | **NEW** — Admin-only data operations |
| `app/actions/admin.ts` | **NEW** — Admin server actions |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| J-01 | Admin dashboard: total users, total articles, articles published today, pending reports | P0 |
| J-02 | User management: list, search, change role, suspend, delete | P0 |
| J-03 | Article moderation: view any article, set status to `under_review`, archive, feature/unfeature | P0 |
| J-04 | Comment moderation: hide, delete any comment | P0 |
| J-05 | Reports queue: list, review, resolve, dismiss content reports | P1 |
| J-06 | Category management: create, edit, reorder, delete with article reassignment | P1 |
| J-07 | Tag management: merge, rename, delete orphaned tags | P2 |
| J-08 | All admin routes require `role = 'admin'` verified server-side | P0 |
| J-09 | Admin actions logged with actor ID and timestamp (audit trail) | P2 |

### Security Requirements

| ID | Requirement |
|----|------------|
| J-SEC-01 | Role check at middleware layer AND in every admin DAL function |
| J-SEC-02 | Admin client never exposed to browser; all admin operations via server actions |
| J-SEC-03 | Admin cannot delete own account (prevent lockout) |
| J-SEC-04 | Rate limit admin actions: 100 per minute |

---

## 15. Module K: Content Delivery APIs

### Purpose
Public RESTful endpoints for content retrieval, search, and health checks.

### Endpoint Catalog

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/articles` | Public | List published articles (paginated, filterable) |
| GET | `/api/articles/[slug]` | Public | Single article by slug |
| POST | `/api/articles` | Auth | Create article |
| PATCH | `/api/articles/[id]` | Auth + owner | Update article |
| DELETE | `/api/articles/[id]` | Auth + owner | Delete article |
| GET | `/api/articles/[id]/comments` | Public | Comments for article |
| POST | `/api/articles/[id]/comments` | Auth | Add comment |
| POST | `/api/articles/[id]/like` | Auth | Like article |
| DELETE | `/api/articles/[id]/like` | Auth | Unlike article |
| POST | `/api/articles/[id]/bookmark` | Auth | Bookmark article |
| DELETE | `/api/articles/[id]/bookmark` | Auth | Unbookmark article |
| POST | `/api/articles/[id]/view` | Public | Increment view count |
| GET | `/api/categories` | Public | List all categories |
| GET | `/api/tags` | Public | List/search tags |
| GET | `/api/search` | Public | Full-text article search |
| GET | `/api/profiles/[username]` | Public | Public profile data |
| GET | `/api/profiles/[username]/articles` | Public | Author's published articles |
| POST | `/api/profiles/[username]/follow` | Auth | Follow author |
| DELETE | `/api/profiles/[username]/follow` | Auth | Unfollow author |
| POST | `/api/upload` | Auth | File upload |
| GET | `/api/health` | Public | Service health check |
| GET | `/api/feed` | Auth | Personalized feed |
| GET | `/api/notifications` | Auth | User notifications |
| PATCH | `/api/notifications/[id]` | Auth | Mark notification read |
| POST | `/api/reports` | Auth | Submit content report |

### Standard Response Format

```typescript
// Success
{
  data: T | T[],
  pagination?: { limit: number, offset: number, total: number, hasMore: boolean },
  meta?: Record<string, unknown>
}

// Error
{
  error: { code: string, message: string, details?: Record<string, string[]> },
  status: number
}
```

### Rate Limits

| Endpoint Group | Limit | Window |
|---------------|-------|--------|
| Auth (signin/signup) | 5 | 1 minute |
| API reads | 60 | 1 minute |
| Article mutations | 10 | 1 hour |
| Comment creation | 20 | 10 minutes |
| Like/bookmark | 60 | 1 minute |
| File upload | 20 | 1 hour |
| Search | 30 | 1 minute |
| Admin operations | 100 | 1 minute |

---

## 16. Module L: Notifications

### Purpose
Keep users informed about activity on their content and social connections.

### File Map

| File | Purpose |
|------|---------|
| `app/notifications/page.tsx` | **NEW** — Notification center |
| `components/NotificationBell.tsx` | **NEW** — Nav bell icon with unread count badge |
| `components/NotificationItem.tsx` | **NEW** — Single notification display |
| `lib/dal/notifications.ts` | **NEW** — Notification CRUD DAL |

### Notification Events

| Event | Trigger | Recipient | Message Template |
|-------|---------|-----------|-----------------|
| `like` | User likes article | Article author | "{actor} liked your article \"{title}\"" |
| `comment` | User comments on article | Article author | "{actor} commented on \"{title}\"" |
| `follow` | User follows author | Followed author | "{actor} started following you" |
| `mention` | User @mentioned in comment | Mentioned user | "{actor} mentioned you in a comment" |
| `article_published` | Followed author publishes | Follower | "{author} published \"{title}\"" |
| `system` | Admin/system | Target user | Custom message |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| L-01 | Notification bell in nav with unread count badge | P0 |
| L-02 | Notification center page: list all, mark as read, mark all read | P0 |
| L-03 | Click notification → navigate to relevant entity | P0 |
| L-04 | Notifications created via database triggers or server actions | P0 |
| L-05 | Email notifications for high-priority events (new follower, comment) if user opted in | P2 |
| L-06 | Batch email digests (daily summary) for users with many notifications | P3 |

---

## 17. Module M: SEO and Performance

### Purpose
Maximize search engine visibility and page load performance.

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| M-01 | Dynamic metadata for every article: title, description, og:image, og:type, twitter:card | P0 |
| M-02 | JSON-LD structured data: Article, Author (Person), BreadcrumbList | P0 |
| M-03 | Canonical URLs on all pages | P0 |
| M-04 | Dynamic `sitemap.xml` at `/sitemap.xml` including all published articles | P0 |
| M-05 | `robots.txt` with sitemap reference | P0 |
| M-06 | RSS feed at `/feed.xml` with latest 50 articles | P1 |
| M-07 | Open Graph images: auto-generated or from cover_image_url | P1 |
| M-08 | Next.js Image component for all images with width/height/alt | P0 |
| M-09 | ISR for article pages (revalidate on publish/edit) | P0 |
| M-10 | Static generation for legal and about pages | P0 |
| M-11 | Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1 | P0 |
| M-12 | Lazy-load below-fold images and heavy components | P1 |

### File Map

| File | Purpose |
|------|---------|
| `app/sitemap.ts` | **NEW** — Dynamic sitemap generation |
| `app/robots.ts` | **NEW** — robots.txt generation |
| `app/feed.xml/route.ts` | **NEW** — RSS feed endpoint |
| `lib/utils/metadata.ts` | **NEW** — Shared metadata generation helpers |
| `lib/utils/structured-data.ts` | **NEW** — JSON-LD builders |

---

## 18. Module N: Legal and Policy

### Purpose
Legal compliance pages required for a public platform.

### Pages

| Route | File | Status |
|-------|------|--------|
| `/privacy` | `app/privacy/page.tsx` | Exists — needs final legal copy |
| `/terms` | `app/terms/page.tsx` | Exists — needs final legal copy |
| `/cookies` | `app/cookies/page.tsx` | Exists — needs final legal copy |
| `/contact` | `app/contact/page.tsx` | **NEW** — Contact form |

### Functional Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| N-01 | Privacy policy with data collection, retention, and user rights sections | P0 |
| N-02 | Terms of service covering content ownership, acceptable use, account termination | P0 |
| N-03 | Cookie policy with essential vs. analytics categories | P0 |
| N-04 | Cookie consent banner on first visit | P1 |
| N-05 | Contact form with rate limiting (5 per hour per IP) | P1 |
| N-06 | GDPR compliance: data export and account deletion request flow | P2 |

---

## 19. Security Specification

### Defense in Depth Layers

```
Layer 1: EDGE (Middleware)
  ├── NextAuth session validation
  ├── Route protection by role
  ├── Rate limiting headers
  └── Security headers (CSP, HSTS, X-Frame-Options)

Layer 2: SERVER (Actions & Routes)
  ├── Zod input validation on ALL mutations
  ├── requireAuth() / requireRole() checks
  ├── CSRF tokens (NextAuth built-in)
  ├── Rate limiting per endpoint per identity
  └── Error sanitization (generic messages to client)

Layer 3: DATA ACCESS (DAL)
  ├── Ownership verification before mutations
  ├── Parameterized queries (Supabase SDK)
  ├── Supabase JWT with user identity for RLS
  └── Admin client isolated to backend-only flows

Layer 4: DATABASE
  ├── Row Level Security ON for every table
  ├── SECURITY DEFINER functions for atomic operations
  ├── CHECK constraints on all enum/range fields
  ├── Foreign key cascade for data integrity
  └── Encrypted at rest (Supabase managed)
```

### OWASP Top 10 Coverage

| Risk | Mitigation |
|------|-----------|
| A01 Broken Access Control | RLS + DAL ownership checks + middleware route protection + role-based access |
| A02 Cryptographic Failures | HTTPS enforced; cookies httpOnly + secure + sameSite; passwords hashed by NextAuth/Supabase |
| A03 Injection | Parameterized queries via Supabase SDK; Zod validation; HTML sanitization on user content |
| A04 Insecure Design | Defense in depth; typed DAL layer; never trust client data |
| A05 Security Misconfiguration | Strict CSP headers; secrets in env vars never client-exposed; service role key server-only |
| A06 Vulnerable Components | Dependabot/Renovate for dependency updates; `npm audit` in CI |
| A07 Auth Failures | Rate-limited auth; generic error messages; session expiry; CSRF protection |
| A08 Data Integrity Failures | Input validation at boundary; CI pipeline with tests; signed sessions |
| A09 Logging Failures | Structured server-side logging; error tracking integration; audit trail for admin actions |
| A10 SSRF | No user-controlled URLs in server-side fetches; image URLs validated as https only |

### Security Headers (middleware)

```typescript
{
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '0',  // Disabled in favor of CSP
}
```

### Content Sanitization Rules

| Context | Allowed Tags | Stripped |
|---------|-------------|---------|
| Article body | p, h2-h4, a[href], img[src,alt], blockquote, pre, code, ul, ol, li, em, strong, hr, br, figure, figcaption | script, iframe, object, embed, form, input, style, on* attributes |
| Comments | p, a[href], code, em, strong, br | Everything else |
| Profile bio | Plain text only | All HTML |

---

## 20. API Reference — Complete Endpoint Catalog

### GET /api/articles

**Query Parameters:**

| Param | Type | Default | Constraint | Description |
|-------|------|---------|-----------|-------------|
| limit | integer | 20 | 1–50 | Items per page |
| offset | integer | 0 | >= 0 | Pagination offset |
| category | string | — | valid slug | Filter by category slug |
| tag | string | — | valid slug | Filter by tag slug |
| author | string | — | valid username | Filter by author username |
| sort | string | 'newest' | newest, popular, trending | Sort order |
| featured | boolean | — | — | Only featured articles |

**Response:** `200 OK`
```json
{
  "data": [ArticleListDTO],
  "pagination": { "limit": 20, "offset": 0, "total": 142, "hasMore": true }
}
```

### GET /api/articles/[slug]

**Response:** `200 OK` → `{ data: ArticleDTO }` or `404 Not Found`

### POST /api/articles

**Auth:** Required
**Body:** CreateArticleSchema
**Response:** `201 Created` → `{ data: { id, slug } }`

### PATCH /api/articles/[id]

**Auth:** Required + owner
**Body:** UpdateArticleSchema (partial)
**Response:** `200 OK` → `{ data: { id, slug } }`

### DELETE /api/articles/[id]

**Auth:** Required + owner or admin
**Response:** `204 No Content`

### GET /api/search

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| q | string | — | Search query (required, min 2 chars) |
| limit | integer | 20 | Results per page |
| offset | integer | 0 | Pagination offset |
| category | string | — | Filter by category slug |

**Response:** `200 OK` → `{ data: [ArticleListDTO], pagination }`

### GET /api/health

**Response:** `200 OK` or `503 Service Unavailable`
```json
{
  "status": "healthy",
  "timestamp": "2026-04-03T12:00:00.000Z",
  "services": {
    "database": "connected",
    "auth": "operational",
    "storage": "operational"
  },
  "version": "3.0.0"
}
```

---

## 21. Environment Variables

| Variable | Scope | Required | Description |
|----------|-------|----------|-------------|
| `SUPABASE_URL` | Server + Client | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Server + Client | Yes | Supabase anonymous key (RLS-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Yes | Supabase service role key (bypasses RLS) |
| `SUPABASE_JWT_SECRET` | Server only | Yes | For signing Supabase-compatible JWTs in NextAuth callback |
| `NEXTAUTH_URL` | Server | Yes | Canonical URL (e.g., https://velorah.com) |
| `NEXTAUTH_SECRET` | Server only | Yes | NextAuth encryption key |
| `GOOGLE_CLIENT_ID` | Server only | Yes | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Server only | Yes | Google OAuth |
| `GITHUB_CLIENT_ID` | Server only | Yes | GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | Server only | Yes | GitHub OAuth |
| `RESEND_API_KEY` | Server only | Conditional | For magic link and notification emails |
| `UPSTASH_REDIS_REST_URL` | Server only | Yes (prod) | Redis-backed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Server only | Yes (prod) | Redis auth token |
| `NEXT_PUBLIC_APP_URL` | Client | Yes | Public app URL for OG images and sharing |

---

## 22. Delivery Roadmap

### Phase 1 — Core Platform (P0 requirements)

**Goal:** Fully operational blog with auth, CRUD, and reading experience.

- NextAuth integration with Google + GitHub providers
- Database schema migration (new tables, updated fields)
- Dynamic article routes (`/article/[slug]`)
- Working editor with TipTap
- Article CRUD via server actions → DAL → Supabase
- Feed and archive wired to live API data
- Author dashboard with real stats and article management
- Category and tag system
- Search (Postgres full-text)
- Basic comment system
- Like and bookmark system
- Profile pages with follow/unfollow

### Phase 2 — Engagement and Polish

- Comment threading and moderation
- Notification system
- Reading history
- Scheduled publishing
- SEO: sitemap, JSON-LD, RSS feed
- Image upload and media management
- Mobile navigation

### Phase 3 — Admin and Moderation

- Admin panel: user management, content moderation, report queue
- Category/tag management UI
- Admin audit logging
- Content reporting flow

### Phase 4 — Scale and Hardening

- Redis-backed rate limiting (Upstash)
- Email notifications (Resend)
- Cookie consent banner
- GDPR data export
- E2E test suite
- Performance optimization: ISR, lazy loading, Core Web Vitals audit
- Security audit: penetration testing, dependency scanning

---

## 23. Open Questions

| # | Question | Impact | Status |
|---|----------|--------|--------|
| 1 | Rich text editor choice: TipTap vs Plate vs MDX-based? | D-01, editor DX | Open |
| 2 | Should article URLs be `/article/[slug]` or `/[username]/[slug]`? | SEO, routing | Open |
| 3 | Email provider preference: Resend vs Sendgrid vs SES? | L-05, cost | Open |
| 4 | Do we need real-time features (Supabase Realtime for comments/notifications)? | F, L modules, infra cost | Open |
| 5 | What is the article content size limit? | Storage, performance | Open (suggest 100KB) |
| 6 | Should we support co-authoring (multiple authors per article)? | D module schema | Deferred |
| 7 | Do we need a newsletter/subscriber system? | New module | Deferred |
| 8 | Image CDN: Supabase Storage transforms or external (Cloudinary, Imgix)? | G module, cost | Open |
| 9 | Analytics: custom implementation or integrate PostHog/Plausible? | I module | Open |
| 10 | Do we need i18n (multi-language) content support? | Schema `language` field, UI | Deferred |

---

*End of document. This PRD is the source of truth for implementing the Velorah production blog platform.*
