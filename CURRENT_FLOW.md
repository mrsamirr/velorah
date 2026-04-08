# Velorah Current App Flow (As Implemented)

Date: 2026-04-05

This document describes the real, current runtime flow in the codebase: page routes, API routes, server actions, auth/session gates, and data-layer connections.

## 1. Runtime Layers

1. Browser requests Next.js App Router route.
2. `proxy.ts` runs for almost all requests (except static assets matched out).
3. `proxy.ts` calls `updateSession(request)` from `lib/supabase/middleware.ts`.
4. `updateSession` refreshes Supabase auth cookies and performs some auth redirects.
5. Target route executes (page/component or API route).
6. Route/page calls server actions, DAL, and Supabase clients.

Core stack:
- Routing/UI: `app/**`
- Request gate: `proxy.ts` + `lib/supabase/middleware.ts`
- Mutations: `app/actions/*.ts`
- API endpoints: `app/api/**/route.ts`
- Data Access Layer: `lib/dal/*.ts`
- Supabase clients: `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/admin.ts`

## 2. Auth and Session Flow

## 2.1 Sign Up

Route/UI:
- `app/signup/page.tsx` (client page)
- form uses `useActionState(signup, undefined)`

Action chain:
- `app/actions/auth.ts::signup`
- validate with `SignUpSchema`
- `supabase.auth.signUp(...)` via `createClient()`
- `createProfile(...)` in `lib/dal/profiles.ts` (admin client)
- `revalidatePath('/', 'layout')`
- redirect to `/author`

## 2.2 Sign In

Route/UI:
- `app/signin/page.tsx`

Action chain:
- `app/actions/auth.ts::signin`
- validate with `SignInSchema`
- `supabase.auth.signInWithPassword(...)`
- revalidate + redirect `/author`

## 2.3 Sign Out

- `app/actions/auth.ts::signout`
- `supabase.auth.signOut()`
- revalidate + redirect `/`
- No visible signout button in current `components/TopNavBar.tsx`.

## 2.4 Auth Callback

- `GET /api/auth/callback` in `app/api/auth/callback/route.ts`
- exchanges one-time code using `supabase.auth.exchangeCodeForSession(code)`
- redirects to `next` (default `/author`) on same origin/forwarded host
- on failure redirects `/signin?error=auth_callback_failed`

## 2.5 Route Protection

Two layers currently enforce protection:

1) `lib/supabase/middleware.ts` (`updateSession`):
- Protected prefixes: `/author`, `/publish`, `/admin`
- If unauthenticated on protected route: redirect to `/signin?redirectTo=...`
- If authenticated and route is `/signin`: redirect to `redirectTo` or `/author`

2) `proxy.ts`:
- Protected prefixes: `/author`, `/publish`, `/settings`, `/notifications`, `/admin`
- If no Supabase auth cookie on protected route: redirect to `/signin?redirect=...`
- Adds security headers to every response

Page-level checks also exist (defense in depth):
- `app/author/page.tsx` checks `getCurrentUser()` and redirects to `/signin`
- `app/settings/page.tsx` checks user/profile and redirects
- `app/notifications/page.tsx` checks user and redirects
- `app/admin/page.tsx` calls `requireRole('admin')`

## 3. Page Route Flow Map

## 3.1 Public/Mostly Static Pages

- `/` -> `app/page.tsx`
  - marketing/hero page; no DAL/API call
- `/home` -> `app/home/page.tsx`
  - static visual page
- `/about` -> `app/about/page.tsx`
- `/blogs` -> `app/blogs/page.tsx`
- `/archive` -> `app/archive/page.tsx`
- `/privacy` -> `app/privacy/page.tsx`
- `/terms` -> `app/terms/page.tsx`
- `/cookies` -> `app/cookies/page.tsx`

## 3.2 Auth Pages

- `/signin` -> `app/signin/page.tsx`
  - server action: `signin`
- `/signup` -> `app/signup/page.tsx`
  - server action: `signup`

## 3.3 Content Discovery and Reading

- `/feed` -> `app/feed/page.tsx`
  - directly calls DAL:
    - `getAllCategories()`
    - `getPublishedArticles({ ... })` for listing
    - `getPublishedArticles({ featured: true, ... })` for featured

- `/article?slug=...` -> `app/article/page.tsx`
  - reads search param `slug`
  - DAL calls:
    - `getArticleBySlug(slug)`
    - `getCommentsByArticle(article.id)`

## 3.4 Author / Protected Pages

- `/author` -> `app/author/page.tsx`
  - auth check `getCurrentUser()`
  - DAL calls:
    - `getMyProfile()`
    - `getMyProfileStats()`
    - `getPublishedArticles({ author_id: user.id, ... })`

- `/publish` -> `app/publish/page.tsx` (client)
  - fetches categories from `GET /api/articles?categories=true`
  - submit via server action `createArticleAction`
  - on success routes to `/article?slug=...`

- `/settings` -> `app/settings/page.tsx`
  - auth check + profile load
  - renders `app/settings/settings-form.tsx`
  - form uses server action `updateProfileAction`

- `/notifications` -> `app/notifications/page.tsx`
  - auth check only; currently static empty-state UI

- `/admin` -> `app/admin/page.tsx`
  - `requireRole('admin')`
  - loads:
    - `getPublishedArticles({ limit: 20, sort: 'recent' })`
    - `getAllCategories()`

## 4. Server Actions -> DAL Flow

## 4.1 Auth Actions (`app/actions/auth.ts`)

- `signup` -> Supabase Auth + `createProfile`
- `signin` -> Supabase Auth password sign-in
- `signout` -> Supabase sign out

## 4.2 Content Actions (`app/actions/content.ts`)

- `createArticleAction` -> `dalCreateArticle`
- `updateArticleAction` -> `dalUpdateArticle`
- `deleteArticleAction` -> `dalDeleteArticle`
- `publishArticleAction` -> `dalUpdateArticle(status='published')`
- `archiveArticleAction` -> `dalUpdateArticle(status='archived')`
- `pinArticleAction` -> `dalUpdateArticle(is_pinned=...)`
- `scheduleArticleAction` -> `dalUpdateArticle(scheduled_at=...)`
- `updateProfileAction` -> `dalUpdateProfile`

## 4.3 Engagement Actions (`app/actions/engagement.ts`)

- article likes/unlikes -> `lib/dal/likes.ts`
- comment likes/unlikes -> `lib/dal/likes.ts`
- bookmarks -> `lib/dal/bookmarks.ts`
- comments CRUD/hide -> `lib/dal/comments.ts`
- follows/unfollows -> `lib/dal/follows.ts`
- reports -> direct insert via Supabase after `requireAuth()`

## 4.4 Admin Actions (`app/actions/admin.ts`)

- categories CRUD -> `lib/dal/categories.ts`
- user roles + article moderation + report resolution -> `lib/dal/admin.ts`
- comment moderation -> `lib/dal/comments.ts`

## 4.5 Notification Actions (`app/actions/notifications.ts`)

- mark one read -> `markAsRead`
- mark all read -> `markAllAsRead`

## 5. API Route Flow Map

## 5.1 Articles

- `GET /api/articles`
  - `getPublishedArticles(...)`
  - special mode `?categories=true` -> `getAllCategories()`
- `POST /api/articles` (auth)
  - validate with `CreateArticleSchema`
  - `createArticle(...)`

- `GET /api/articles/[id]`
  - if UUID -> `getArticleById(id)`
  - else -> `getArticleBySlug(id)`

- `GET /api/articles/[id]/comments` -> `getCommentsByArticle`
- `POST /api/articles/[id]/comments` (auth) -> `createComment`

- `POST /api/articles/[id]/like` (auth) -> `likeArticle`
- `DELETE /api/articles/[id]/like` (auth) -> `unlikeArticle`

- `POST /api/articles/[id]/bookmark` (auth) -> `bookmarkArticle`
- `DELETE /api/articles/[id]/bookmark` (auth) -> `unbookmarkArticle`

- `POST /api/articles/[id]/view`
  - rate-limited
  - RPC `increment_view_count`

## 5.2 Profiles

- `GET /api/profiles/[username]` -> `getProfileByUsername`
- `GET /api/profiles/[username]/articles` -> profile lookup + `getPublishedArticles(author_id=...)`
- `POST /api/profiles/[username]/follow` (auth) -> `followUser`
- `DELETE /api/profiles/[username]/follow` (auth) -> `unfollowUser`

## 5.3 Feed/Search/Taxonomy

- `GET /api/feed` -> `getPublishedArticles(sort='recent')`, includes `authenticated` flag
- `GET /api/search` -> `searchArticles`
- `GET /api/categories` -> `getAllCategories`
- `GET /api/tags` -> `searchTags`

## 5.4 Notifications

- `GET /api/notifications` (auth) -> `getMyNotifications`
- `PATCH /api/notifications/[id]` (auth) -> `markAsRead`

## 5.5 Uploads and Reports

- `POST /api/upload` (auth)
  - validates file + bucket
  - `uploadFile` in `lib/dal/media.ts`
- `POST /api/reports` (auth)
  - validate with `ReportSchema`
  - inserts into `reports`

## 5.6 Utility

- `GET /api/health` -> auth service ping via Supabase client

## 6. Non-JSON Content Routes

- `GET /feed.xml` -> `app/feed.xml/route.ts`
  - queries published articles via Supabase
  - returns RSS XML

- `GET /sitemap.xml` via `app/sitemap.ts`
  - emits static pages + article URLs + category URLs

- `GET /robots.txt` via `app/robots.ts` (Next metadata route)

## 7. DAL Security Model (Current)

Most mutating DAL functions call:
- `requireAuth()` for identity
- `requireRole('admin')` for admin-only operations
- ownership checks (`author_id`, `recipient_id`, etc.) before mutation

Important auth rule used consistently:
- `supabase.auth.getUser()` is used for validated identity checks (not `getSession()`).

## 8. Revalidation and Cache Invalidation

Server actions call `revalidatePath(...)` after mutations, mainly for:
- `/author`
- `/feed`
- `/`
- `/settings`
- `/admin`
- `/article`

## 9. Known Flow Mismatches / Observations

1. Route protection split is inconsistent:
- middleware protected list: `/author`, `/publish`, `/admin`
- proxy protected list: adds `/settings`, `/notifications`
- redirect query param name differs (`redirectTo` vs `redirect`).

2. Canonical article path mismatch:
- Pages navigate to `/article?slug=...`
- RSS and sitemap generate `/article/{slug}` URLs.

3. Notifications page UI is static:
- `/notifications` page checks auth but does not currently fetch/render notification data, even though API and actions exist.

4. Admin page uses published list only:
- `/admin` currently loads `getPublishedArticles(...)`, not full moderation datasets from `lib/dal/admin.ts`.

## 10. Quick End-to-End Sequences

## 10.1 Publish from UI

1. User opens `/publish` (protected by proxy/middleware).
2. Client fetches categories from `GET /api/articles?categories=true`.
3. Submit form -> `createArticleAction`.
4. Action validates -> `dalCreateArticle`.
5. DAL requires auth, sanitizes content, generates slug, inserts article, attaches tags.
6. Action revalidates pages and returns `{ id, slug }`.
7. Client redirects to `/article?slug={slug}`.

## 10.2 Read Article

1. User opens `/article?slug=x`.
2. Page calls `getArticleBySlug(x)`.
3. DAL returns published article and triggers view increment RPC (fire-and-forget).
4. Page calls `getCommentsByArticle(article.id)` and renders thread.

## 10.3 Like Article via API

1. Client sends `POST /api/articles/{id}/like`.
2. API checks auth + rate limit.
3. API calls `likeArticle(id)`.
4. DAL inserts like, increments like count RPC, optionally creates notification to article author.
5. API returns success JSON.

## 11. Frontend Navigation Sources

## 11.1 Global Header (`components/TopNavBar.tsx`)

Shown on most pages via `<TopNavBar />`:
- Brand -> `/`
- Essays -> `/feed`
- Collections -> `/archive`
- Philosophy -> `/about`
- Sign In CTA -> `/signin`
- Mobile menu icon button exists, but no open/close panel logic is implemented.

## 11.2 Global Footer (`components/Footer.tsx`)

Shown on most pages via `<Footer />`:
- Brand -> `/`
- Company links: `/about`, `/author`, `/feed`
- Legal links: `/privacy`, `/terms`, `/cookies`
- Lower footer links: `/terms`, `/privacy`
- Connect icons (`language`, `alternate_email`) are spans, not links/buttons with handlers.

## 12. Complete Frontend Page Navigation Matrix

The list below is outbound navigation and button behavior per frontend page.

## 12.1 `app/page.tsx` (`/`)
- Primary CTA link: `/feed`
- Inherits TopNavBar + Footer links.

## 12.2 `app/feed/page.tsx` (`/feed`)
- Filter links:
  - `/feed`
  - `/feed?category={id}`
  - `/feed?category={id}&sort={recent|popular|most_liked}`
  - `/feed?sort={recent|popular|most_liked}`
- Article links:
  - `/article?slug={slug}` (featured, recent, trending cards)
- Empty-state CTA: `/publish`
- Inherits TopNavBar + Footer links.

## 12.3 `app/article/page.tsx` (`/article?slug=...`)
- Author link: `/author?user={author_username_or_id}`
- Inherits TopNavBar + Footer links.

## 12.4 `app/archive/page.tsx` (`/archive`)
- Card links currently go to `/article` (no slug/query)
- Inherits TopNavBar + Footer links.

## 12.5 `app/about/page.tsx` (`/about`)
- "DISCOVER OUR ETHOS" rendered as clickable visual row, but no route/action.
- "JOIN THE INNER CIRCLE" button has no route/action.
- Inherits TopNavBar + Footer links.

## 12.6 `app/blogs/page.tsx` (`/blogs`)
- Top nav links are placeholders (`href="#"`) for Essays, Collections, Philosophy.
- Article cards link to `/article` (no slug/query).
- Footer links: `/privacy`, `/terms`, `/archive`, plus placeholder `href="#"` Contact.
- "Begin Journey" button has no route/action.
- Pagination buttons/indices are non-functional (no route/action).

## 12.7 `app/home/page.tsx` (`/home`)
- Multiple placeholder links with `href="#"` (top nav, social, tags, footer groups).
- Several buttons have no route/action (e.g., "Begin Journey", comment actions).
- This page is a static/demo composition and is not connected to real app navigation.

## 12.8 `app/signin/page.tsx` (`/signin`)
- Header links: `/`, `/feed`, `/archive`
- Footer prompt link: `/signup`
- Form submit uses server action `signin` -> redirects `/author` on success.

## 12.9 `app/signup/page.tsx` (`/signup`)
- Header links: `/`, `/feed`, `/archive`, `/about`, `/signin`
- Footer prompt link: `/signin`
- Form submit uses server action `signup` -> redirects `/author` on success.

## 12.10 `app/author/page.tsx` (`/author`)
- Links:
  - `/archive` (table header action)
  - `/publish` (empty state + CTA card)
  - `/settings` (CTA card)
  - `/article?slug={slug}` (article rows)
- Inherits TopNavBar + Footer links.

## 12.11 `app/publish/page.tsx` (`/publish`)
- On successful create: client-side `router.push('/article?slug={slug}')`
- Local form-state buttons (`Draft`/`Publish`) only toggle hidden status value.
- No additional page link buttons in body.
- Inherits TopNavBar + Footer links.

## 12.12 `app/settings/page.tsx` + `app/settings/settings-form.tsx` (`/settings`)
- Form action `updateProfileAction` (save only, no route change).
- Save button is submit-only.
- Inherits TopNavBar + Footer links.

## 12.13 `app/notifications/page.tsx` (`/notifications`)
- No in-page navigation controls; informational empty state only.
- Inherits TopNavBar + Footer links.

## 12.14 `app/admin/page.tsx` (`/admin`)
- Sidebar links all route to `/admin` (Dashboard/Essays/Categories/Contributors are same target).
- Article title links -> `/article?slug={slug}`
- Inherits TopNavBar + Footer links.

## 12.15 `app/privacy/page.tsx` (`/privacy`)
- In-page anchor navigation:
  - `#introduction`
  - `#data-collection`
  - `#processing`
  - `#your-rights`
  - `#security`
  - `#contact`
- Contact mailto link: `mailto:privacy@velorah.com`
- Rights cards are visually clickable but have no route/action.
- Inherits TopNavBar + Footer links.

## 12.16 `app/terms/page.tsx` (`/terms`)
- Privacy CTA link: `/privacy`
- Inherits TopNavBar + Footer links.

## 12.17 `app/cookies/page.tsx` (`/cookies`)
- Cookie preference buttons exist but do not persist or route:
  - "Save Preferences" (no handler)
  - "Accept All Cookies" (no handler)
- Inherits TopNavBar + Footer links.

## 12.18 `app/not-found.tsx` (`404`)
- CTA link: `/feed`
- Inherits TopNavBar + Footer links.

## 13. Missing or Broken Frontend Navigation/Buttons

1. Placeholder routes (`href="#"`) still present:
- `app/home/page.tsx`
- `app/blogs/page.tsx`

2. Buttons with no route/action handlers:
- `app/about/page.tsx`:
  - "JOIN THE INNER CIRCLE"
  - "DISCOVER OUR ETHOS"
- `app/blogs/page.tsx`:
  - "Begin Journey"
  - "Previous Archive", "Next Archive", page indices
- `app/cookies/page.tsx`:
  - "Save Preferences"
  - "Accept All Cookies"
- `components/TopNavBar.tsx`:
  - Mobile menu icon button

3. Route target mismatch for article detail:
- Many page links use `/article?slug=...` (works with current page)
- Some pages use plain `/article` (no slug), especially `app/archive/page.tsx` and `app/blogs/page.tsx`
- RSS + sitemap generate `/article/{slug}` style URLs, which do not match current page route implementation.

4. Admin sidebar IA not implemented:
- Dashboard/Essays/Categories/Contributors all route to the same `/admin` page.

5. Footer "Connect" icons are non-interactive:
- Icons are decorative spans without links or click handlers.
