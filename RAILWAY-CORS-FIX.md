# Railway API CORS 오류 해결

## 문제
- CORS 오류: "No 'Access-Control-Allow-Origin' header is present on the requested resource"
- `https://www.workbase-ai.com`에서 `https://api.workbase-ai.com`으로의 요청이 차단됨
- Preflight 요청(OPTIONS)이 502 오류 반환

## 원인
API 서버의 CORS 설정이 `https://www.workbase-ai.com`을 허용하지 않거나, preflight 요청이 제대로 처리되지 않음

## 해결 방법

### 방법 1: ALLOWED_ORIGINS 환경 변수 설정 (권장)

**@notion-clone/api** 서비스의 **Variables** 탭에서:

1. **+ New Variable** 클릭
2. **Name:** `ALLOWED_ORIGINS`
3. **Value:** `https://www.workbase-ai.com,https://workbase-ai.com`
4. **Add** 클릭

**또는 모든 도메인 허용 (개발용):**
- **Value:** `*` (별표 하나만)

### 방법 2: 환경 변수 제거 (모든 도메인 허용)

현재 `ALLOWED_ORIGINS` 환경 변수가 설정되어 있다면:

1. **Variables** 탭에서 `ALLOWED_ORIGINS` 찾기
2. **Delete** 클릭
3. API 서버 재배포

코드에서 `ALLOWED_ORIGINS`가 없으면 모든 도메인을 허용하도록 설정되어 있습니다.

### 방법 3: API 서버 재배포

환경 변수를 변경한 후:
1. **@notion-clone/api** 서비스의 **Deployments** 탭으로 이동
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기

## 현재 CORS 설정 (코드)

```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['*'];

app.enableCors({ 
  origin: allowedOrigins.includes('*') ? true : allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-token']
});
```

## 확인 사항

### 1. 현재 ALLOWED_ORIGINS 확인

**@notion-clone/api** 서비스의 **Variables** 탭에서:
- `ALLOWED_ORIGINS` 환경 변수가 있는지 확인
- 있다면 값이 `https://www.workbase-ai.com`을 포함하는지 확인

### 2. API 서버 재배포 확인

환경 변수를 변경한 후 반드시 재배포해야 합니다.

### 3. 브라우저 테스트

1. 브라우저 캐시 클리어
2. 시크릿 모드에서 `https://www.workbase-ai.com` 접속
3. 로그인 시도
4. 개발자 도구의 **Network** 탭에서 CORS 오류가 사라졌는지 확인

## 권장 설정

### 프로덕션 환경:
```
ALLOWED_ORIGINS=https://www.workbase-ai.com,https://workbase-ai.com
```

### 개발 환경 (모든 도메인 허용):
```
ALLOWED_ORIGINS=*
```

또는 환경 변수를 아예 설정하지 않으면 모든 도메인을 허용합니다.

## 다음 단계

1. Railway에서 `ALLOWED_ORIGINS` 환경 변수 확인/설정
2. API 서버 재배포
3. 브라우저에서 다시 테스트
4. CORS 오류가 해결되었는지 확인

