# Render API 서비스 문제 해결 가이드

## 현재 상황

- **workbase-web**: 정상 작동 ✅
- **Workbase-AI (API)**: 계속 Deploying 상태
- **Supabase**: 설정 완료 (Connection string 준비됨)

## 해결 방법

### 1단계: Render에서 API 서비스 확인

1. Render Dashboard 접속: https://dashboard.render.com
2. **Services** 메뉴 클릭
3. **Workbase-AI** 서비스 찾기
4. 서비스 클릭

### 2단계: 서비스 설정 확인

**Settings** 탭에서 다음 확인:

1. **Root Directory**: `apps/api` (확인)
2. **Build Command**: `npm install && npm run build` (확인)
3. **Start Command**: `node dist/main.js` (확인)
4. **Environment**: `Node` (확인)

### 3단계: 환경 변수 설정

**Environment Variables** 섹션에서 다음 추가:

1. **DATABASE_URL**:
   ```
   postgresql://postgres:cx%2243bw@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres
   ```
   (또는 `postgresql://postgres:cx%2243bw!@@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres`)

2. **PORT**: `4000` (이미 설정되어 있을 수 있음)

3. **ALLOWED_ORIGINS**: `*` (이미 설정되어 있을 수 있음)

### 4단계: 서비스 재배포

1. **Manual Deploy** 섹션 찾기
2. **Deploy latest commit** 클릭
3. 배포 진행 상황 확인

### 5단계: 로그 확인

**Logs** 탭에서 다음 메시지 확인:

```
[Database] PostgreSQL 연결 풀 생성 완료
[Database] PostgreSQL 연결 성공
[Database] PostgreSQL 데이터베이스 사용
API server running at http://localhost:4000/api
```

## 문제 해결

### 빌드 오류가 발생하는 경우

**Logs** 탭에서 오류 메시지 확인:
- TypeScript 오류
- npm install 오류
- 환경 변수 오류

오류 메시지를 알려주시면 수정하겠습니다.

### 서비스가 계속 Deploying 상태인 경우

1. **Settings** → **Manual Deploy** → **Deploy latest commit** 클릭
2. 배포가 멈춰있으면 **Cancel** 후 다시 시도
3. 여전히 문제가 있으면 서비스 삭제 후 재생성

### API 서비스가 없는 경우

새로 생성:

1. **New +** → **Web Service** 클릭
2. GitHub 저장소 연결: `maub9955/Workbase-AI`
3. 설정:
   - **Name**: `workbase-api`
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/main.js`
   - **Environment**: `Node`
4. **Create Web Service** 클릭

## 확인 사항

배포 완료 후:

1. **Logs** 탭에서 서버가 정상 실행 중인지 확인
2. **Metrics** 탭에서 CPU/메모리 사용량 확인
3. 웹 앱에서 로그인 테스트

## 다음 단계

1. Render Dashboard에서 API 서비스 확인
2. 환경 변수 `DATABASE_URL` 추가
3. 서비스 재배포
4. 로그 확인

문제가 있으면 로그의 오류 메시지를 알려주세요.

