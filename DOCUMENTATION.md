# Velorah Product Specification

Document version: 2.0  
Date: 2026-04-03  
Status: Working spec (mapped to current codebase)

## 1. Product Overview

Velorah is a publication platform for long-form writing with a cinematic, minimalist brand language. The product combines:

- A public discovery and reading surface
- Author identity and publishing workflows
- Supabase-backed content and profile data
- Public APIs for article retrieval

Primary value proposition:

- Readers: high-signal editorial experience
- Authors: focused writing and profile-driven publishing
- Operators: secure-by-default content system with RLS and typed DAL

## 2. Module Map

### Module A: Experience Shell and Navigation
Owned surfaces:

- Global layout and typography
- Global navigation and footer
- Shared visual language

Code surfaces:

- app/layout.tsx
- components/TopNavBar.tsx
- components/Footer.tsx

### Module B: Public Discovery and Reading
Owned surfaces:

- Landing, feed, archive, article, about, blogs, home

Code surfaces:

- app/page.tsx
- app/feed/page.tsx
- app/archive/page.tsx
- app/article/page.tsx
- app/about/page.tsx
- app/blogs/page.tsx
- app/home/page.tsx

### Module C: Identity and Access
Owned surfaces:

- Sign in, sign up, auth callback, session middleware

Code surfaces:

- app/signin/page.tsx
- app/signup/page.tsx
- app/api/auth/callback/route.ts
- middleware.ts
- lib/supabase/middleware.ts
- app/actions/auth.ts
- lib/schemas/auth.ts
- lib/dal/auth.ts

### Module D: Author Studio and Publishing
Owned surfaces:

- Author dashboard
- Publish/editor interface
- Content server actions

Code surfaces:

- app/author/page.tsx
- app/publish/page.tsx
- app/actions/content.ts
- lib/schemas/content.ts
- lib/dal/articles.ts
- lib/dal/profiles.ts

### Module E: Content Delivery APIs
Owned surfaces:

- Public article list and detail APIs
- Health endpoint

Code surfaces:

- app/api/articles/route.ts
- app/api/articles/[id]/route.ts
- app/api/health/route.ts

### Module F: Data Platform and Security Foundation
Owned surfaces:

- Supabase schema and RLS
- Typed DB contracts
- Supabase client wrappers
- Rate limit primitives

Code surfaces:

- supabase/schema.sql
- lib/types/database.ts
- lib/supabase/client.ts
- lib/supabase/server.ts
- lib/supabase/admin.ts
- lib/rate-limit.ts

### Module G: Legal and Policy Experience
Owned surfaces:

- Privacy, terms, and cookies pages

Code surfaces:

- app/privacy/page.tsx
- app/terms/page.tsx
- app/cookies/page.tsx

## 3. Module Specifications

## Module A: Experience Shell and Navigation

### Purpose
Provide a consistent visual and navigational frame across all pages, preserving brand coherence and reducing wayfinding friction.

### Users

- All site visitors
- Authenticated authors

### Core User Stories

- As a visitor, I can access major site areas from any page.
- As a reader, I can identify current section context.
- As an author, I can quickly reach sign-in or publishing entry points.

### Functional Requirements

- Fixed top navigation with section links and brand anchor.
- Scroll-aware nav background transition for readability.
- Responsive behavior with mobile menu trigger.
- Footer with legal and company links.
- Global font and theme token injection via root layout.

### Non-Functional Requirements

- First paint navigation visible within initial viewport.
- Navigation interaction latency imperceptible for user (<100ms target).
- Visual consistency across all app routes.

### Dependencies

- Next app router layout
- Shared CSS tokens and utility classes

### Current Implementation Status

- Implemented: fixed header, contextual highlighting, footer links.
- Gap: mobile menu button does not yet open a rendered mobile navigation panel.

### Success Metrics

- Navigation click-through rate to Feed, Archive, About
- Reduced bounce from first session landing
- Footer legal-page visit completion rate

## Module B: Public Discovery and Reading

### Purpose
Deliver editorial discovery and immersive reading for non-authenticated users.

### Users

- Anonymous readers
- Returning readers

### Core User Stories

- As a new visitor, I can understand the brand and begin reading quickly.
- As a reader, I can browse featured and archived content.
- As a reader, I can open an article detail page from cards and links.

### Functional Requirements

- Landing route with CTA into reading journey.
- Feed route presenting featured and secondary stories.
- Archive route with historical/curated list entries.
- Article route with long-form content layout and metadata panel.
- About route with mission narrative.

### Non-Functional Requirements

- Mobile and desktop responsive rendering.
- Readability baseline for long text blocks.
- Stable layout with large media assets.

### Dependencies

- Shared shell components
- API module for dynamic feed/detail integration (future hard wiring)

### Current Implementation Status

- Implemented: all public pages render with branded experience.
- Gap: discovery pages are primarily static composition; article links route to a single static article page rather than slug or id-based route.

### Success Metrics

- Sessions reaching /feed from landing
- Article open rate from feed and archive
- Scroll depth on article pages

## Module C: Identity and Access

### Purpose
Authenticate users, establish sessions securely, and protect author-only areas.

### Users

- Prospective authors
- Returning authors

### Core User Stories

- As a user, I can create an account with validated credentials.
- As a user, I can sign in and be redirected to my author space.
- As an unauthenticated visitor, I am redirected away from protected pages.

### Functional Requirements

- Sign-up action validates display name, email, and password policy.
- Sign-in action validates credentials and signs in through Supabase Auth.
- Sign-out action terminates session and revalidates layout.
- Auth callback exchanges PKCE code and performs safe same-origin redirect.
- Middleware refreshes auth state and gates protected routes.

### Security and Privacy Requirements

- Use token-validating getUser path instead of unverified getSession in middleware and DAL auth checks.
- Prevent open redirect in callback by enforcing host/origin constraints.
- Return generic auth errors to avoid account enumeration.

### API/Contract Notes

- Callback endpoint: GET /api/auth/callback?code=...&next=...
- Protected route set: /author, /publish

### Dependencies

- Supabase auth
- Server actions and auth schemas

### Current Implementation Status

- Implemented server-side auth stack with middleware and callback exchange.
- Gap: current sign-in/sign-up page UIs are primarily client-side mock flows and are not wired to server actions in the form submit path.

### Success Metrics

- Sign-up completion rate
- Sign-in success rate
- Unauthorized access redirect correctness

## Module D: Author Studio and Publishing

### Purpose
Enable authenticated authors to create, edit, publish, and manage content and profile data.

### Users

- Authenticated authors

### Core User Stories

- As an author, I can view my dashboard and publishing stats.
- As an author, I can create drafts and publish articles.
- As an author, I can update and delete only my own content.
- As an author, I can update my own profile.

### Functional Requirements

- Content server actions must validate all input via Zod.
- Article create/update/delete/publish flow must enforce ownership.
- Profile update flow must only mutate current user profile.
- Read-time should be computed from content body on create/update.
- Dashboard should expose author-relevant metrics and article list.

### Security Requirements

- Defense in depth:
- Action-level validation
- DAL-level requireAuth and ownership checks
- Database RLS policy enforcement

### Data Contracts

- Article DTO fields include: id, title, content, excerpt, category, cover image, status, author metadata, counts, timestamps.
- Profile DTO fields include: id, display_name, bio, avatar_url, role, created_at.

### Dependencies

- DAL modules for articles and profiles
- Content and profile schemas
- Supabase server/admin clients

### Current Implementation Status

- Implemented backend actions and DAL with auth and ownership checks.
- Gap: current dashboard and publish pages are mostly static UI and do not yet submit to server actions for end-to-end persistence.

### Success Metrics

- Draft creation rate
- Publish conversion rate from draft
- Edit/delete success rate with no ownership violations

## Module E: Content Delivery APIs

### Purpose
Expose read-focused, public endpoints for article list/detail retrieval and service health checks.

### Users

- Web frontend pages
- External API consumers (future)
- Monitoring infrastructure

### Core User Stories

- As a client, I can fetch published articles with pagination and filtering.
- As a client, I can fetch one published article by id.
- As ops, I can verify service health quickly.

### Functional Requirements

- GET /api/articles:
- Supports query params: limit, offset, category
- Clamps limit to max 50
- Returns data plus pagination block
- GET /api/articles/[id]:
- Returns full article data or 404
- Triggers async view count increment
- GET /api/health:
- Returns healthy or unhealthy state with timestamp and service map

### Error Handling Requirements

- Return 500 for unexpected failures in article endpoints.
- Return 404 when specific article is not found.
- Health endpoint returns 503 when unavailable.

### Dependencies

- Article DAL and RPC function increment_view_count
- Supabase connectivity

### Current Implementation Status

- Implemented and operational in code.

### Success Metrics

- API availability (>=99.9% target)
- p95 response time for list/detail
- Error rate by endpoint

## Module F: Data Platform and Security Foundation

### Purpose
Provide durable, secure data persistence and typed access for profiles/articles.

### Users

- Backend services and actions
- Data and security operators

### Core User Stories

- As a backend engineer, I can rely on typed contracts for DB interaction.
- As a security owner, I can enforce least-privilege access at row level.
- As an operator, I can track content engagement via view counts.

### Functional Requirements

- Profiles and articles tables with required constraints.
- RLS policies for public read and owner-scoped writes.
- Triggers for updated_at maintenance.
- RPC for view counter increment.
- Generated/maintained TypeScript DB type surface.

### Security Requirements

- RLS enabled on profiles and articles.
- Author ownership enforced in insert/update/delete policies.
- Auth users linkage via profile foreign key.
- Admin client usage limited to system-only flows (profile bootstrap).

### Performance Requirements

- Indexes on author_id, status, published_at, category.
- Efficient feed ordering by published_at desc.

### Dependencies

- Supabase project environment variables
- Schema migration discipline

### Current Implementation Status

- Implemented schema and type layer.
- Gap: in-memory rate limiter exists but is not yet integrated into actions/routes and is not suitable for multi-instance production.

### Success Metrics

- Zero RLS bypass incidents
- Query latency on indexed paths
- Type mismatch incidents in CI/build

## Module G: Legal and Policy Experience

### Purpose
Expose transparent legal information and policy surfaces for trust and compliance.

### Users

- All visitors
- Compliance reviewers

### Core User Stories

- As a visitor, I can find privacy, terms, and cookie policy from footer links.
- As a reviewer, I can inspect current policy language quickly.

### Functional Requirements

- Dedicated routes for privacy, terms, cookies.
- Consistent branded layout and readability.

### Dependencies

- Shared shell components

### Current Implementation Status

- Implemented static legal pages.
- Gap: policy content appears placeholder-level and likely requires legal-approved final text.

### Success Metrics

- Legal page availability
- Footer legal link click-through

## 4. Cross-Module Requirements

### Availability and Reliability

- Health endpoint must remain callable without auth.
- Auth middleware must not break static asset delivery.

### Security Baseline

- Validate all mutating inputs at server boundary.
- Never trust client-submitted ownership identifiers.
- Keep auth errors generic in UI/API responses.

### Observability

- Track request counts, error rates, and auth flow outcomes.
- Add structured logs on action failures for content/auth modules.

## 5. Delivery Roadmap (Recommended)

### Phase 1: Wire Real Auth and Publish Flows

- Connect sign-in and sign-up forms to server actions.
- Connect publish and dashboard actions to DAL-backed mutations.

### Phase 2: Dynamic Reading Routes

- Replace static article route experience with id/slug-driven routes.
- Bind feed/archive cards to live API data.

### Phase 3: Hardening and Scale

- Integrate distributed rate limiting (Redis/Upstash).
- Add end-to-end tests for auth, publish, and API contracts.

### Phase 4: Legal and Operations Readiness

- Finalize policy copy with legal review.
- Add uptime and API SLO dashboards.

## 6. Open Questions

- Should profile creation happen only via DB trigger, or remain dual-path with createProfile action fallback?
- Should article routes move to slug-based URLs for SEO and editorial shareability?
- What moderation/editor review workflow is required for non-author roles (editor/admin)?