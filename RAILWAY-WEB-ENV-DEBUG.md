# Railway Web 앱 환경 변수 디버깅

## 문제
- `NEXT_PUBLIC_API_URL` 환경 변수를 추가했지만 여전히 작동하지 않음
- 재배포 후에도 같은 오류 발생

## 확인 사항

### 1. 환경 변수 값 확인

Railway에서 **@notion-clone/web** 서비스의 **Variables** 탭에서:

**확인할 값:**
- Name: `NEXT_PUBLIC_API_URL`
- Value: `https://api.workbase-ai.com/api` (슬래시 포함)

**잘못된 예:**
- `https://api.workbase-ai.com` (슬래시 없음)
- `https://api.workbase-ai.com/` (마지막 슬래시만)

### 2. 빌드 로그 확인

**@notion-clone/web** 서비스의 **Deployments** 탭에서:

1. 최신 배포의 **View Logs** 클릭
2. 빌드 단계에서 환경 변수가 제대로 주입되었는지 확인
3. `NEXT_PUBLIC_API_URL`이 빌드에 포함되었는지 확인

### 3. 브라우저 개발자 도구 확인

1. `https://www.workbase-ai.com` 접속
2. 브라우저 개발자 도구 열기 (F12)
3. **Console** 탭에서 오류 메시지 확인
4. **Network** 탭에서 API 요청 URL 확인
   - 어떤 URL로 요청이 가는지 확인
   - `localhost:4000`인지 `api.workbase-ai.com`인지 확인

### 4. Next.js 빌드 캐시 문제

Next.js는 빌드 캐시를 사용할 수 있습니다. 강제 재빌드를 시도:

1. Railway에서 **Settings** → **Build & Deploy**
2. **Clear Build Cache** 또는 **Redeploy** 클릭
3. 완전히 새로운 빌드가 실행되는지 확인

### 5. 환경 변수 이름 확인

**중요:** 환경 변수 이름이 정확해야 합니다:
- ✅ `NEXT_PUBLIC_API_URL` (올바름)
- ❌ `NEXT_PUBLIC_API` (잘못됨)
- ❌ `API_URL` (잘못됨 - NEXT_PUBLIC_ 접두사 필요)

### 6. 런타임 환경 변수 확인

Next.js에서 `NEXT_PUBLIC_` 환경 변수는 빌드 타임에 포함됩니다. 

**확인 방법:**
1. 빌드 로그에서 `NEXT_PUBLIC_API_URL` 검색
2. 환경 변수가 빌드 시 사용되었는지 확인

## 해결 방법

### 방법 1: 환경 변수 재확인 및 재배포

1. **Variables** 탭에서 `NEXT_PUBLIC_API_URL` 값 확인
2. 값이 `https://api.workbase-ai.com/api`인지 확인
3. **Deployments** 탭에서 **Redeploy** 클릭
4. 빌드가 완전히 새로 실행되는지 확인

### 방법 2: 빌드 캐시 클리어

1. **Settings** → **Build & Deploy**
2. 빌드 캐시를 클리어할 수 있는 옵션이 있다면 사용
3. 또는 새로운 커밋을 푸시하여 강제 재빌드

### 방법 3: 브라우저 캐시 클리어

1. 브라우저 캐시 완전히 클리어
2. 시크릿 모드에서 테스트
3. 또는 다른 브라우저에서 테스트

### 방법 4: 직접 확인

브라우저 개발자 도구의 **Console**에서 다음을 실행:

```javascript
console.log(process.env.NEXT_PUBLIC_API_URL);
```

또는 **Network** 탭에서 실제 API 요청 URL을 확인하세요.

## 다음 단계

1. Railway 빌드 로그 확인
2. 브라우저 개발자 도구에서 실제 API URL 확인
3. 환경 변수 값 재확인
4. 필요시 빌드 캐시 클리어 후 재배포

결과를 공유해주시면 추가로 도와드리겠습니다.

