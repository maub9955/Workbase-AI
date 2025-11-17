# Notion-Style Collaboration Suite

Monorepo skeleton for an internal Notion-like knowledge, calendar, and file collaboration platform.

## Structure

- `apps/web` – Next.js App Router client (landing + 개인 페이지 프로토타입)
- `apps/api` – NestJS HTTP API (health + 가입/로그인 + 개인 페이지 권한)
- `apps/realtime` – WebSocket/Y.js collaboration services
- `apps/worker` – Background jobs (BullMQ)
- `packages/ui` – Shared React component library
- `packages/config` – Environment/config helpers powered by Zod
- `packages/tsconfig` – Shared TypeScript compiler settings
- `infra/` – Kubernetes, Terraform, and deployment manifests
- `docs/` – Architecture decision records, data model, roadmap, API docs

## Getting Started

Install dependencies at the repo root:

```bash
npm install
```

### Run the web client

```bash
npx turbo run dev --filter=@notion-clone/web
```

- Landing 페이지: http://localhost:3000
- 워크스페이스: http://localhost:3000/workspace (로그인 필요)

### Run the API server

```bash
npx turbo run dev --filter=@notion-clone/api
```

- 기본 포트 `4000`
- 엔드포인트: `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/pages/me`, `POST /api/pages/:id/entries`, `POST /api/pages/:id/collaborators`

### 이메일 전송 설정 (선택사항)

이메일 초대 기능을 사용하려면 SMTP 설정이 필요합니다.

1. 환경 변수 파일 생성 (`apps/api/.env`):
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
FRONTEND_URL=http://localhost:3000
```

2. Gmail 사용 시:
   - Google 계정 설정에서 "앱 비밀번호" 생성 필요
   - 2단계 인증이 활성화되어 있어야 함

3. 다른 SMTP 서비스 사용:
   - SendGrid, Mailgun, AWS SES 등도 지원
   - 해당 서비스의 SMTP 설정에 맞게 환경 변수 설정

SMTP가 설정되지 않으면 서버 콘솔에 이메일 내용이 출력됩니다.

### Run the realtime server

```bash
npx turbo run dev --filter=@notion-clone/realtime
```

Listens on `REALTIME_PORT` (default `4100`) and currently returns a welcome payload over WebSocket.

### Run the worker

```bash
npx turbo run dev --filter=@notion-clone/worker
```

Connects to `REDIS_URL` (default `redis://localhost:6379`) and processes a sample BullMQ queue.

### Tooling Highlights

- npm workspaces + Turbo for orchestrated builds
- ESLint (flat config) & Prettier for code quality
- Husky + lint-staged guard commits
- Zod-based env validation helpers (`packages/config`)

## Features

- ✅ 사용자 인증 (회원가입/로그인)
- ✅ 개인 워크스페이스 및 페이지 관리
- ✅ 블록 기반 에디터 (텍스트, 표, 보드, 리스트, 타임라인, 캘린더, 갤러리)
- ✅ 파일 업로드 및 공유 (이미지/영상 미리보기 지원)
- ✅ 페이지 공유 및 협업자 초대
- ✅ 이메일 초대 기능 (SMTP 설정 필요)

## Next Steps

1. Flesh out UI foundation (design tokens, layout shell, auth screens).
2. Implement core domain modules in the API (auth, workspaces, pages, files).
3. Expand realtime + worker services, then add Docker Compose dev stack (Postgres, Redis, MinIO, Keycloak).
4. Expand docs for detailed ERDs, API contracts, and deployment runbooks.
