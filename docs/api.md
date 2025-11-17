# API Overview (Draft)

## Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2025-11-17T12:00:00.000Z"
  }
  ```
- **Notes**: Used by uptime monitors and deployment readiness probes.

## Upcoming Modules
- Auth & workspace onboarding (`/api/auth/*`, `/api/workspaces`)
- Pages & blocks (`/api/pages`, `/api/blocks`)
- Calendar & tasks (`/api/events`, `/api/tasks`)
- Files & sharing links (`/api/files`, `/api/shared-links`)

> 상세 스펙은 구현 단계에서 OpenAPI 문서로 제공 예정입니다.
