# Web 앱 API 연결 문제 해결

## 현재 문제
- Web 앱에서 여전히 CORS 오류 및 502 오류 발생
- Preflight 요청이 502 오류 반환
- `/api` 경로에 대한 404 오류

## 원인
Web 앱이 여전히 이전 API 서버(Railway)에 연결하려고 하거나, 환경 변수가 업데이트되지 않았을 수 있습니다.

## 해결 방법

### 1. Web 앱 환경 변수 확인

**Web 앱이 어디에 배포되어 있는지 확인:**

#### A. Render에 Web 앱이 있는 경우:
1. Render Dashboard에서 Web 서비스 선택
2. **Environment** 섹션으로 이동
3. `NEXT_PUBLIC_API_URL` 환경 변수 확인:
   - **Value**: `https://api.workbase-ai.com/api`
4. 환경 변수를 수정한 경우 **Save Changes** 클릭
5. **Manual Deploy** → **Deploy latest commit** 클릭하여 재배포

#### B. Railway에 Web 앱이 있는 경우:
1. Railway Dashboard에서 **@notion-clone/web** 서비스 선택
2. **Variables** 탭으로 이동
3. `NEXT_PUBLIC_API_URL` 환경 변수 확인:
   - **Value**: `https://api.workbase-ai.com/api`
4. 환경 변수를 수정한 경우 서비스 재배포

### 2. Web 앱 재배포

환경 변수를 변경한 후 **반드시 재배포**해야 합니다:

**Render:**
- **Manual Deploy** → **Deploy latest commit**

**Railway:**
- **Deployments** 탭 → **Redeploy**

### 3. 브라우저 캐시 클리어

1. 브라우저 개발자 도구 열기 (F12)
2. **Network** 탭에서 "Disable cache" 체크
3. 브라우저 캐시 완전히 클리어
4. 시크릿 모드에서 테스트

### 4. API 서버 URL 확인

Web 앱 코드에서 실제로 사용하는 API URL 확인:

브라우저 개발자 도구의 **Console**에서:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL);
```

또는 **Network** 탭에서 실제 요청 URL 확인:
- `localhost:4000`인지
- `api.workbase-ai.com`인지

## 확인 체크리스트

- [ ] Web 앱이 Render에 있는지 Railway에 있는지 확인
- [ ] `NEXT_PUBLIC_API_URL` 환경 변수가 `https://api.workbase-ai.com/api`로 설정되어 있는지 확인
- [ ] 환경 변수 변경 후 Web 앱을 재배포했는지 확인
- [ ] 브라우저 캐시를 클리어하고 다시 테스트했는지 확인
- [ ] Network 탭에서 실제 요청 URL 확인

## 다음 단계

1. Web 앱의 환경 변수 확인 및 수정
2. Web 앱 재배포
3. 브라우저 캐시 클리어
4. 다시 테스트

