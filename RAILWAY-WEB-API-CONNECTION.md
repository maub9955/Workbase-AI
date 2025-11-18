# Railway Web 앱 API 연결 설정

## 문제
- Web 앱(`www.workbase-ai.com`)이 API 서버(`api.workbase-ai.com`)에 연결할 수 없음
- "서버가 실행 중인지 확인해주세요" 오류 발생

## 원인
Web 앱이 `NEXT_PUBLIC_API_URL` 환경 변수를 사용하여 API 서버 URL을 결정합니다. 이 환경 변수가 설정되지 않으면 기본값 `http://localhost:4000/api`를 사용합니다.

## 해결 방법

### 1. Railway Web 앱 환경 변수 설정

**@notion-clone/web** 서비스의 **Variables** 탭에서:

1. **+ New Variable** 클릭
2. **Name:** `NEXT_PUBLIC_API_URL`
3. **Value:** `https://api.workbase-ai.com/api`
4. **Add** 클릭

**중요:** `NEXT_PUBLIC_API_URL`은 Next.js에서 클라이언트 사이드에서도 사용 가능한 환경 변수입니다. `NEXT_PUBLIC_` 접두사가 필요합니다.

### 2. API 서버 CORS 설정 확인

**@notion-clone/api** 서비스의 **Variables** 탭에서:

**ALLOWED_ORIGINS** 환경 변수 확인:
- 설정되어 있다면: `https://www.workbase-ai.com`이 포함되어 있는지 확인
- 설정되어 있지 않다면: 모든 도메인을 허용하도록 설정되어 있음 (문제 없음)

필요시 추가:
```
ALLOWED_ORIGINS=https://www.workbase-ai.com,https://workbase-ai.com
```

### 3. 서비스 재배포

환경 변수를 추가한 후:
1. **@notion-clone/web** 서비스의 **Deployments** 탭으로 이동
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기 (보통 2-3분)

### 4. 확인

배포 완료 후:
1. `https://www.workbase-ai.com` 접속
2. 로그인 시도
3. 정상 작동 확인

## 현재 Web 앱 코드

Web 앱의 여러 파일에서 다음과 같이 API URL을 사용합니다:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
```

기본값이 `localhost:4000`이므로, 프로덕션에서는 반드시 환경 변수를 설정해야 합니다.

## 환경 변수 요약

### @notion-clone/web
```
NEXT_PUBLIC_API_URL=https://api.workbase-ai.com/api
```

### @notion-clone/api (선택사항)
```
ALLOWED_ORIGINS=https://www.workbase-ai.com,https://workbase-ai.com
```

## 다음 단계

1. Railway에서 `NEXT_PUBLIC_API_URL` 환경 변수 추가
2. Web 앱 재배포
3. 로그인 테스트
4. 정상 작동 확인

