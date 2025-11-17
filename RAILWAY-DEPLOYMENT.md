# Railway 배포 가이드

Railway는 Vercel보다 유연한 빌드 환경을 제공하며, TypeScript 빌드 오류를 더 잘 처리합니다.

## 1. Railway 계정 생성 및 프로젝트 설정

### 1.1 Railway 계정 생성
1. https://railway.app 접속
2. "Start a New Project" 클릭
3. GitHub 계정으로 로그인
4. GitHub 저장소 연결: `maub9955/Workbase-AI`

### 1.2 서비스 생성
Railway는 각 앱을 별도의 서비스로 배포합니다:

1. **API 서버 배포**
   - "New" → "GitHub Repo" 선택
   - 저장소 선택
   - 서비스 이름: `workbase-api`
   - Root Directory: `apps/api`

2. **Web 프론트엔드 배포**
   - "New" → "GitHub Repo" 선택
   - 같은 저장소 선택
   - 서비스 이름: `workbase-web`
   - Root Directory: `apps/web`

3. **Realtime 서버 배포 (선택사항)**
   - "New" → "GitHub Repo" 선택
   - 같은 저장소 선택
   - 서비스 이름: `workbase-realtime`
   - Root Directory: `apps/realtime`

## 2. API 서버 설정

### 2.1 빌드 설정
Railway 대시보드에서 `workbase-api` 서비스:

1. **Settings** → **Build Command**:
   ```bash
   cd ../.. && npm install && npm run build --filter=@notion-clone/api
   ```

2. **Settings** → **Start Command**:
   ```bash
   cd apps/api && node dist/main.js
   ```

3. **Settings** → **Root Directory**: `apps/api` (또는 빈 값)

### 2.2 환경 변수 설정
**Variables** 탭에서 다음 환경 변수 추가:

```env
NODE_ENV=production
PORT=4000

# SMTP 설정 (이메일 발송용)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# 프론트엔드 URL (나중에 설정)
FRONTEND_URL=https://workbase-web-production.up.railway.app
```

### 2.3 포트 설정
Railway는 자동으로 `PORT` 환경 변수를 설정하므로, `apps/api/src/main.ts`에서 다음처럼 사용:

```typescript
const port = process.env.PORT || 4000;
```

## 3. Web 프론트엔드 설정

### 3.1 빌드 설정
Railway 대시보드에서 `workbase-web` 서비스:

1. **Settings** → **Build Command**:
   ```bash
   cd ../.. && npm install && npm run build --filter=@notion-clone/web
   ```

2. **Settings** → **Start Command**:
   ```bash
   cd apps/web && npm start
   ```

3. **Settings** → **Root Directory**: `apps/web` (또는 빈 값)

### 3.2 환경 변수 설정
**Variables** 탭에서 다음 환경 변수 추가:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://workbase-api-production.up.railway.app/api
```

⚠️ **중요**: API 서버의 Railway URL을 확인한 후 설정하세요.

## 4. 도메인 설정

### 4.1 Railway 도메인 사용
각 서비스의 **Settings** → **Networking**에서:
- "Generate Domain" 클릭
- Railway가 자동으로 도메인 생성 (예: `workbase-api-production.up.railway.app`)

### 4.2 커스텀 도메인 설정 (선택사항)
1. **Settings** → **Networking** → "Custom Domain"
2. 도메인 입력 (예: `api.yourdomain.com`)
3. DNS 설정:
   - Type: `CNAME`
   - Name: `api` (또는 원하는 서브도메인)
   - Value: Railway가 제공하는 CNAME 값

## 5. 환경 변수 업데이트

### 5.1 API 서버
API 서버의 `FRONTEND_URL`을 Web 서비스의 Railway URL로 업데이트:

```env
FRONTEND_URL=https://workbase-web-production.up.railway.app
```

### 5.2 Web 서버
Web 서버의 `NEXT_PUBLIC_API_URL`을 API 서비스의 Railway URL로 업데이트:

```env
NEXT_PUBLIC_API_URL=https://workbase-api-production.up.railway.app/api
```

## 6. 배포 확인

### 6.1 API 서버 확인
```bash
curl https://workbase-api-production.up.railway.app/api/health
```

### 6.2 Web 서버 확인
브라우저에서 접속:
```
https://workbase-web-production.up.railway.app
```

## 7. 트러블슈팅

### 7.1 빌드 실패
- Railway 로그 확인: 서비스 → **Deployments** → 로그 확인
- `package.json`의 빌드 스크립트 확인
- Root Directory 설정 확인

### 7.2 환경 변수 오류
- Variables 탭에서 모든 환경 변수가 올바르게 설정되었는지 확인
- API URL과 Frontend URL이 서로 올바르게 참조하는지 확인

### 7.3 CORS 오류
API 서버의 `main.ts`에서 CORS 설정 확인:
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

## 8. 무료 티어 제한

Railway 무료 티어:
- 월 $5 크레딧 제공
- 사용하지 않으면 자동으로 일시 중지
- 첫 요청 시 자동으로 재시작 (약 30초 소요)

## 9. 프로덕션 체크리스트

- [ ] API 서버 배포 완료
- [ ] Web 서버 배포 완료
- [ ] 환경 변수 모두 설정
- [ ] API URL과 Frontend URL 상호 참조 확인
- [ ] SMTP 설정 완료 (이메일 발송 테스트)
- [ ] 도메인 설정 완료
- [ ] HTTPS 자동 적용 확인

## 10. 추가 리소스

- Railway 문서: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- 지원: support@railway.app

