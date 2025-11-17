# Roadmap (Draft)

## Phase 0 – Foundations
- [x] Monorepo tooling (Turbo, ESLint, Prettier, Husky)
- [x] Next.js web skeleton
- [x] NestJS API skeleton
- [x] Realtime/worker app scaffolding + dev scripts (`npx turbo run dev --filter`)
- [ ] Docker Compose dev stack (Postgres, Redis, MinIO, Keycloak)

## Phase 1 – Core Features
- Authentication + workspace onboarding flow
- Page/block CRUD with collaborative editor baseline
- Calendar + task modules with custom field support
- File storage integration (multipart uploads, sharing links)

## Phase 2 – Collaboration Enhancements
- Real-time cursors, comments, notifications
- Advanced permissions (page-level ACL, shared link policies)
- Search/indexing pipeline (e.g., OpenSearch)

## Phase 3 – Observability & Deployment
- Metrics/logging dashboards, alerting
- Security hardening (DLP, virus scanning pipeline)
- External beta readiness (multi-tenant support, billing if needed)

> 각 단계는 사내 요구/피드백에 따라 조정될 수 있습니다.
