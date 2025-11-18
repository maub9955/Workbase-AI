# Railway API 서버 배포 실패 해결 가이드

## 현재 상태
- ❌ `@notion-clone/api` - Deployment failed
- ✅ `@notion-clone/realtime` - 성공
- ✅ `@notion-clone/web` - 성공
- ✅ `@notion-clone/worker` - 성공

## Railway 설정 확인 및 수정

### 1. Railway 대시보드에서 `@notion-clone/api` 서비스 확인

#### Settings → Build & Deploy

**Root Directory:**
- 빈 값으로 두거나 `apps/api` 설정
- Railway가 자동으로 감지할 수 있도록

**Build Command:**
```bash
npm install && npm run build --workspace=@notion-clone/api
```

또는 (Root Directory가 빈 값인 경우):
```bash
cd apps/api && npm install && npm run build
```

**Start Command:**
```bash
npm run start --workspace=@notion-clone/api
```

또는 (Root Directory가 `apps/api`인 경우):
```bash
node dist/main.js
```

### 2. 환경 변수 확인

**Variables** 탭에서 다음 환경 변수가 설정되어 있는지 확인:

```env
NODE_ENV=production
PORT=4000
```

(나중에 추가할 것들):
```env
FRONTEND_URL=https://www.workbase-ai.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

### 3. 배포 로그 확인

1. Railway 대시보드에서 `@notion-clone/api` 서비스 클릭
2. **Deployments** 탭 클릭
3. 최신 배포의 **View Logs** 클릭
4. 오류 메시지 확인

### 4. 일반적인 오류 및 해결 방법

#### 오류 1: "Cannot find module"
**원인**: 의존성이 설치되지 않음
**해결**: Build Command에 `npm install` 포함 확인

#### 오류 2: "Command not found"
**원인**: 잘못된 경로
**해결**: Root Directory 설정 확인

#### 오류 3: "Port already in use"
**원인**: 포트 충돌
**해결**: `PORT` 환경 변수 확인 (Railway가 자동 설정)

#### 오류 4: "Build failed"
**원인**: TypeScript 컴파일 오류
**해결**: 로컬에서 `npm run build --workspace=@notion-clone/api` 실행하여 확인

## 빠른 해결 방법

### 방법 1: Railway 자동 감지 사용
1. **Settings** → **Root Directory**: 빈 값으로 설정
2. **Settings** → **Build Command**: 비워두기 (Railway가 자동 감지)
3. **Settings** → **Start Command**: `npm run start --workspace=@notion-clone/api`

### 방법 2: 명시적 설정
1. **Settings** → **Root Directory**: `apps/api`
2. **Settings** → **Build Command**: `npm install && npm run build`
3. **Settings** → **Start Command**: `node dist/main.js`

## 배포 로그 확인 후 알려주세요

Railway 배포 로그의 오류 메시지를 알려주시면 더 정확한 해결 방법을 제시할 수 있습니다.

## 다음 단계

1. Railway 대시보드에서 배포 로그 확인
2. 오류 메시지 복사
3. 오류에 맞는 해결 방법 적용
4. 재배포 시도

