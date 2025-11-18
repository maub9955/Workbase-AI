# Render DNS 설정 가이드

## 현재 문제
- `api.workbase-ai.com`과 `www.workbase-ai.com`이 모두 같은 Render 서비스(`workbase-ai.onrender.com`)를 가리킴
- API 서버와 Web 앱은 별도의 Render 서비스여야 함

## 해결 방법

### 1. Render에서 서비스 확인

Render Dashboard에서 두 개의 서비스가 있는지 확인:

#### A. API 서버 서비스
- 서비스 이름: 예) `workbase-api` 또는 `api`
- 커스텀 도메인: `api.workbase-ai.com`
- Render 제공 도메인: 예) `workbase-api.onrender.com` 또는 다른 이름

#### B. Web 앱 서비스
- 서비스 이름: 예) `workbase-web` 또는 `web`
- 커스텀 도메인: `www.workbase-ai.com`
- Render 제공 도메인: 예) `workbase-web.onrender.com` 또는 다른 이름

### 2. 각 서비스의 커스텀 도메인 확인

#### API 서버 서비스:
1. Render Dashboard에서 API 서버 서비스 선택
2. **Settings** → **Custom Domains** 섹션
3. `api.workbase-ai.com`이 추가되어 있는지 확인
4. Render가 제공하는 CNAME 값 확인 (예: `workbase-api.onrender.com`)

#### Web 앱 서비스:
1. Render Dashboard에서 Web 앱 서비스 선택
2. **Settings** → **Custom Domains** 섹션
3. `www.workbase-ai.com`이 추가되어 있는지 확인
4. Render가 제공하는 CNAME 값 확인 (예: `workbase-web.onrender.com`)

### 3. Porkbun DNS 레코드 수정

Porkbun에서 DNS 레코드를 수정:

#### api.workbase-ai.com 레코드:
1. `api.workbase-ai.com` CNAME 레코드 찾기
2. Edit 클릭
3. Answer 값을 API 서버의 Render 도메인으로 변경:
   - 예: `workbase-api.onrender.com` (API 서버의 Render 도메인)
4. Save 클릭

#### www.workbase-ai.com 레코드:
1. `www.workbase-ai.com` CNAME 레코드 찾기
2. Edit 클릭
3. Answer 값을 Web 앱의 Render 도메인으로 변경:
   - 예: `workbase-web.onrender.com` (Web 앱의 Render 도메인)
4. Save 클릭

### 4. Render 서비스 생성 확인

만약 Web 앱 서비스가 없다면:

1. Render Dashboard에서 **New** → **Web Service** 클릭
2. GitHub 저장소 연결
3. 설정:
   - **Name**: `workbase-web` (또는 원하는 이름)
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NEXT_PUBLIC_API_URL`: `https://api.workbase-ai.com/api`
4. **Create Web Service** 클릭
5. 배포 완료 후 **Settings** → **Custom Domains**에서 `www.workbase-ai.com` 추가

## 확인 체크리스트

- [ ] Render에 API 서버 서비스가 있는지 확인
- [ ] Render에 Web 앱 서비스가 있는지 확인
- [ ] 각 서비스의 Render 제공 도메인 확인
- [ ] 각 서비스에 커스텀 도메인이 올바르게 설정되어 있는지 확인
- [ ] Porkbun DNS에서 각 레코드가 올바른 Render 도메인을 가리키는지 확인

## 현재 DNS 레코드 (수정 필요)

**현재 (잘못됨):**
- `api.workbase-ai.com` → `workbase-ai.onrender.com`
- `www.workbase-ai.com` → `workbase-ai.onrender.com`

**올바른 설정:**
- `api.workbase-ai.com` → `[API 서버의 Render 도메인]` (예: `workbase-api.onrender.com`)
- `www.workbase-ai.com` → `[Web 앱의 Render 도메인]` (예: `workbase-web.onrender.com`)

## 다음 단계

1. Render Dashboard에서 두 서비스 확인
2. 각 서비스의 Render 제공 도메인 확인
3. Porkbun DNS 레코드 수정
4. DNS 전파 대기 (몇 분)
5. 접속 테스트

