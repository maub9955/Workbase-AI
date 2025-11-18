# Railway + Porkbun 설정 단계별 가이드

## 1단계: Railway에서 도메인 확인 및 생성

### API 서버 (`@notion-clone/api`)
1. Railway 대시보드에서 `@notion-clone/api` 서비스 클릭
2. **Settings** 탭 클릭
3. **Networking** 섹션으로 스크롤
4. **Generate Domain** 버튼 클릭 (아직 생성하지 않았다면)
5. 생성된 도메인 복사 (예: `workbase-api-production.up.railway.app`)
   - ⚠️ 이 도메인을 기록해두세요! Porkbun 설정에 필요합니다.

### Web 서버 (`@notion-clone/web`)
1. Railway 대시보드에서 `@notion-clone/web` 서비스 클릭
2. **Settings** 탭 클릭
3. **Networking** 섹션으로 스크롤
4. **Generate Domain** 버튼 클릭 (아직 생성하지 않았다면)
5. 생성된 도메인 복사 (예: `workbase-web-production.up.railway.app`)
   - ⚠️ 이 도메인을 기록해두세요! Porkbun 설정에 필요합니다.

## 2단계: Porkbun DNS 레코드 추가

### Porkbun 대시보드 접속
1. https://porkbun.com 접속
2. 로그인
3. **Account** → **Your Domains** 클릭
4. **workbase-ai.com** 도메인만 선택 (다른 도메인은 건드리지 마세요!)

### DNS 레코드 추가

#### 레코드 1: API 서버 (`api.workbase-ai.com`)
1. **DNS Records** 섹션으로 이동
2. **Add** 또는 **Add Record** 버튼 클릭
3. 다음 정보 입력:
   ```
   Type: CNAME
   Host: api
   Answer: [1단계에서 복사한 API 서버 Railway 도메인]
           예: workbase-api-production.up.railway.app
   TTL: 600 (또는 기본값)
   ```
4. **Add** 또는 **Save** 클릭

#### 레코드 2: Web 서버 (`www.workbase-ai.com`)
1. **DNS Records** 섹션에서 다시 **Add** 버튼 클릭
2. 다음 정보 입력:
   ```
   Type: CNAME
   Host: www
   Answer: [1단계에서 복사한 Web 서버 Railway 도메인]
           예: workbase-web-production.up.railway.app
   TTL: 600 (또는 기본값)
   ```
3. **Add** 또는 **Save** 클릭

### 확인
DNS 레코드가 추가되면 다음과 같이 표시됩니다:
```
Type    Host    Answer                                    TTL
CNAME   api     workbase-api-production.up.railway.app    600
CNAME   www     workbase-web-production.up.railway.app    600
```

## 3단계: Railway 커스텀 도메인 추가

### API 서버에 커스텀 도메인 추가
1. Railway 대시보드에서 `@notion-clone/api` 서비스로 돌아가기
2. **Settings** → **Networking** 섹션
3. **Custom Domain** 섹션 찾기
4. **Add Custom Domain** 버튼 클릭
5. 도메인 입력: `api.workbase-ai.com`
6. **Add** 클릭
7. Railway가 DNS 확인을 기다립니다 (상태가 "Pending" → "Active"로 변경될 때까지 대기)

### Web 서버에 커스텀 도메인 추가
1. Railway 대시보드에서 `@notion-clone/web` 서비스로 이동
2. **Settings** → **Networking** 섹션
3. **Custom Domain** 섹션 찾기
4. **Add Custom Domain** 버튼 클릭
5. 도메인 입력: `www.workbase-ai.com`
6. **Add** 클릭
7. Railway가 DNS 확인을 기다립니다

## 4단계: Railway 환경 변수 설정

### API 서버 환경 변수
1. Railway 대시보드에서 `@notion-clone/api` 서비스
2. **Variables** 탭 클릭
3. 다음 환경 변수 추가/수정:
   ```
   FRONTEND_URL=https://www.workbase-ai.com
   ```
   - 기존에 있다면 수정, 없다면 **New Variable** 클릭하여 추가

### Web 서버 환경 변수
1. Railway 대시보드에서 `@notion-clone/web` 서비스
2. **Variables** 탭 클릭
3. 다음 환경 변수 추가/수정:
   ```
   NEXT_PUBLIC_API_URL=https://api.workbase-ai.com/api
   ```
   - 기존에 있다면 수정, 없다면 **New Variable** 클릭하여 추가

## 5단계: 배포 확인

### API 서버 확인
1. Railway 대시보드에서 `@notion-clone/api` 서비스
2. **Deployments** 탭에서 최신 배포가 성공했는지 확인
3. 브라우저에서 접속 테스트:
   ```
   https://api.workbase-ai.com/api/health
   ```
   - 또는 Railway 생성 도메인으로 먼저 테스트:
   ```
   https://workbase-api-production.up.railway.app/api/health
   ```

### Web 서버 확인
1. Railway 대시보드에서 `@notion-clone/web` 서비스
2. **Deployments** 탭에서 최신 배포가 성공했는지 확인
3. 브라우저에서 접속 테스트:
   ```
   https://www.workbase-ai.com
   ```

## 6단계: DNS 전파 확인

DNS 변경사항이 전파되는 데 시간이 걸립니다 (5-30분, 최대 48시간).

### 확인 방법
1. 온라인 DNS 체커 사용:
   - https://dnschecker.org 접속
   - `api.workbase-ai.com` 입력 → **Search** 클릭
   - `www.workbase-ai.com` 입력 → **Search** 클릭
   - 전 세계 여러 위치에서 확인 가능

2. 터미널에서 확인 (선택사항):
   ```bash
   nslookup api.workbase-ai.com
   nslookup www.workbase-ai.com
   ```

## 7단계: SSL 인증서 확인

Railway는 자동으로 Let's Encrypt SSL 인증서를 발급합니다:
- DNS 레코드가 올바르게 설정되면 자동으로 HTTPS 활성화
- 보통 5-10분 소요
- Railway 대시보드에서 도메인 상태가 "Active"가 되면 SSL이 활성화된 것입니다

## 트러블슈팅

### DNS 전파 지연
- DNS 변경 후 최대 48시간까지 기다려야 할 수 있음
- 온라인 DNS 체커로 전파 상태 확인

### SSL 인증서 발급 실패
- DNS 레코드가 올바르게 설정되었는지 확인
- Railway 대시보드에서 도메인 상태 확인
- DNS 전파가 완료되었는지 확인

### CORS 오류
- API 서버의 `FRONTEND_URL` 환경 변수가 올바르게 설정되었는지 확인
- `https://www.workbase-ai.com` (프로토콜 포함)

## 완료 체크리스트

- [ ] Railway API 서버 도메인 생성 및 복사
- [ ] Railway Web 서버 도메인 생성 및 복사
- [ ] Porkbun에 `api.workbase-ai.com` CNAME 레코드 추가
- [ ] Porkbun에 `www.workbase-ai.com` CNAME 레코드 추가
- [ ] Railway API 서버에 `api.workbase-ai.com` 커스텀 도메인 추가
- [ ] Railway Web 서버에 `www.workbase-ai.com` 커스텀 도메인 추가
- [ ] Railway API 서버 환경 변수 `FRONTEND_URL` 설정
- [ ] Railway Web 서버 환경 변수 `NEXT_PUBLIC_API_URL` 설정
- [ ] DNS 전파 확인 완료
- [ ] SSL 인증서 발급 확인 완료
- [ ] API 서버 접속 테스트 완료
- [ ] Web 서버 접속 테스트 완료

