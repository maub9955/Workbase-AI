# CORS Preflight 요청 오류 해결

## 문제
- Preflight 요청(OPTIONS)이 실패
- "No 'Access-Control-Allow-Origin' header is present on the requested resource"
- `https://www.workbase-ai.com`에서 `https://api.workbase-ai.com`으로의 요청이 차단됨

## 즉시 해결 방법

### 1. Railway API 서버 환경 변수 확인 및 설정

**@notion-clone/api** 서비스의 **Variables** 탭에서:

#### 옵션 A: 모든 도메인 허용 (빠른 해결)

1. **Variables** 탭으로 이동
2. `ALLOWED_ORIGINS` 환경 변수가 있는지 확인
3. **있다면:**
   - Edit 클릭
   - Value를 `*`로 변경
   - Save
4. **없다면:**
   - + New Variable 클릭
   - Name: `ALLOWED_ORIGINS`
   - Value: `*`
   - Add 클릭

#### 옵션 B: 특정 도메인만 허용 (권장)

1. **Variables** 탭으로 이동
2. + New Variable 클릭 (또는 기존 변수 Edit)
3. Name: `ALLOWED_ORIGINS`
4. Value: `https://www.workbase-ai.com,https://workbase-ai.com`
5. Add 클릭 (또는 Save)

### 2. API 서버 재배포 (필수!)

환경 변수를 변경한 후 **반드시 재배포**해야 합니다:

1. **@notion-clone/api** 서비스의 **Deployments** 탭으로 이동
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기 (보통 2-3분)
4. 배포 로그에서 서버가 정상적으로 시작되었는지 확인

### 3. 테스트

1. 브라우저 캐시 완전히 클리어 (또는 시크릿 모드)
2. `https://www.workbase-ai.com` 접속
3. 개발자 도구 열기 (F12)
4. **Network** 탭에서 "Preserve log" 체크
5. 로그인 시도
6. **Network** 탭에서:
   - `login` 요청 확인
   - Status가 200인지 확인
   - CORS 오류가 사라졌는지 확인

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

코드는 올바르게 설정되어 있습니다. 문제는 환경 변수 설정 또는 재배포가 필요합니다.

## 확인 체크리스트

- [ ] `ALLOWED_ORIGINS` 환경 변수가 설정되어 있는지 확인
- [ ] 값이 `*`이거나 `https://www.workbase-ai.com`을 포함하는지 확인
- [ ] 환경 변수 변경 후 API 서버를 재배포했는지 확인
- [ ] 배포 로그에서 서버가 정상적으로 시작되었는지 확인
- [ ] 브라우저 캐시를 클리어하고 다시 테스트했는지 확인

## 추가 디버깅

### API 서버가 Preflight 요청을 받는지 확인

Railway의 **@notion-clone/api** 서비스 **Deployments** → **View Logs**에서:

1. 로그인 시도 시 로그 확인
2. OPTIONS 요청이 로그에 나타나는지 확인
3. 오류 메시지가 있는지 확인

### 직접 테스트

터미널에서 다음 명령으로 테스트:

```bash
curl -X OPTIONS https://api.workbase-ai.com/api/auth/login \
  -H "Origin: https://www.workbase-ai.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v
```

응답에 `Access-Control-Allow-Origin: https://www.workbase-ai.com` 헤더가 있어야 합니다.

## 다음 단계

1. Railway에서 `ALLOWED_ORIGINS` 환경 변수 설정
2. API 서버 재배포
3. 브라우저에서 다시 테스트
4. 여전히 문제가 있으면 배포 로그 확인

