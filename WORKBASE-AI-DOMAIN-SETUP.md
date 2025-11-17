# workbase-ai.com 도메인 연결 가이드

`workbase-ai.com` 도메인을 Railway에 연결하는 완전한 가이드입니다.

## 1. Railway 서비스 배포 (먼저 완료)

### 1.1 Railway 계정 생성 및 프로젝트 설정
1. https://railway.app 접속
2. "Start a New Project" 클릭
3. GitHub 계정으로 로그인
4. GitHub 저장소 연결: `maub9955/Workbase-AI`

### 1.2 API 서버 배포
1. "New" → "GitHub Repo" 선택
2. 저장소 선택: `maub9955/Workbase-AI`
3. 서비스 이름: `workbase-api`
4. **Settings** → **Root Directory**: `apps/api`

**빌드 설정:**
- **Build Command**: 
  ```bash
  cd ../.. && npm install && npm run build --filter=@notion-clone/api
  ```
- **Start Command**: 
  ```bash
  cd apps/api && node dist/main.js
  ```

**환경 변수 (Variables 탭):**
```env
NODE_ENV=production
PORT=4000

# SMTP 설정 (이메일 발송용)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# 프론트엔드 URL (나중에 업데이트)
FRONTEND_URL=https://www.workbase-ai.com
```

**도메인 생성:**
- **Settings** → **Networking** → "Generate Domain" 클릭
- Railway 도메인 확인 (예: `workbase-api-production.up.railway.app`)
- 이 도메인을 기록해두세요! (Porkbun DNS 설정에 필요)

### 1.3 Web 서버 배포
1. 같은 프로젝트에서 "New" → "GitHub Repo" 선택
2. 저장소 선택: `maub9955/Workbase-AI`
3. 서비스 이름: `workbase-web`
4. **Settings** → **Root Directory**: `apps/web`

**빌드 설정:**
- **Build Command**: 
  ```bash
  cd ../.. && npm install && npm run build --filter=@notion-clone/web
  ```
- **Start Command**: 
  ```bash
  cd apps/web && npm start
  ```

**환경 변수 (Variables 탭):**
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.workbase-ai.com/api
```

**도메인 생성:**
- **Settings** → **Networking** → "Generate Domain" 클릭
- Railway 도메인 확인 (예: `workbase-web-production.up.railway.app`)
- 이 도메인을 기록해두세요! (Porkbun DNS 설정에 필요)

## 2. Porkbun DNS 설정

### 2.1 Nameserver 확인
도메인 `workbase-ai.com`의 nameserver가 다음으로 설정되어 있는지 확인:
- `curitiba.ns.porkbun.com`
- `fortaleza.ns.porkbun.com`
- `maceio.ns.porkbun.com`
- `salvador.ns.porkbun.com`

✅ 이미 Porkbun nameserver로 설정되어 있다면 바로 DNS 레코드 추가로 진행하세요.

### 2.2 Porkbun 대시보드 접속
1. https://porkbun.com 접속
2. 로그인
3. "Account" → "Your Domains" 클릭
4. `workbase-ai.com` 도메인 선택

### 2.3 DNS 레코드 추가

#### API 서버용 서브도메인 (`api.workbase-ai.com`)
1. "DNS Records" 섹션으로 이동
2. "Add" 또는 "Add Record" 클릭
3. 다음 설정 입력:
   - **Type**: `CNAME`
   - **Host**: `api`
   - **Answer**: Railway API 서비스 도메인
     - 예: `workbase-api-production.up.railway.app`
     - ⚠️ 실제 Railway에서 생성한 도메인으로 변경하세요!
   - **TTL**: `600` (또는 기본값)
4. "Add" 클릭

#### Web 서버용 서브도메인 (`www.workbase-ai.com`)
1. "DNS Records" 섹션으로 이동
2. "Add" 또는 "Add Record" 클릭
3. 다음 설정 입력:
   - **Type**: `CNAME`
   - **Host**: `www`
   - **Answer**: Railway Web 서비스 도메인
     - 예: `workbase-web-production.up.railway.app`
     - ⚠️ 실제 Railway에서 생성한 도메인으로 변경하세요!
   - **TTL**: `600` (또는 기본값)
4. "Add" 클릭

### 2.4 루트 도메인 (`workbase-ai.com`) - 선택사항
루트 도메인도 사용하려면:
1. "DNS Records" 섹션으로 이동
2. "Add" 또는 "Add Record" 클릭
3. 다음 설정 입력:
   - **Type**: `CNAME`
   - **Host**: `@` (또는 빈 값, Porkbun에 따라 다를 수 있음)
   - **Answer**: Railway Web 서비스 도메인
     - 예: `workbase-web-production.up.railway.app`
   - **TTL**: `600`
4. "Add" 클릭

**참고**: 일부 DNS 제공자는 루트 도메인에 CNAME을 허용하지 않습니다. 그 경우 A 레코드를 사용해야 하지만, Railway는 동적 IP를 사용하므로 권장하지 않습니다.

## 3. Railway 커스텀 도메인 설정

### 3.1 API 서버
1. Railway 대시보드에서 `workbase-api` 서비스 선택
2. **Settings** → **Networking** → "Custom Domain" 섹션
3. "Add Custom Domain" 클릭
4. 도메인 입력: `api.workbase-ai.com`
5. Railway가 DNS 확인을 기다립니다 (보통 몇 분 소요)
6. 상태가 "Active"가 될 때까지 기다리세요

### 3.2 Web 서버
1. Railway 대시보드에서 `workbase-web` 서비스 선택
2. **Settings** → **Networking** → "Custom Domain" 섹션
3. "Add Custom Domain" 클릭
4. 도메인 입력: `www.workbase-ai.com`
5. Railway가 DNS 확인을 기다립니다
6. 상태가 "Active"가 될 때까지 기다리세요

### 3.3 루트 도메인 (선택사항)
루트 도메인도 사용하려면:
1. Railway 대시보드에서 `workbase-web` 서비스 선택
2. **Settings** → **Networking** → "Custom Domain" 섹션
3. "Add Custom Domain" 클릭
4. 도메인 입력: `workbase-ai.com`
5. Railway가 DNS 확인을 기다립니다

## 4. 환경 변수 최종 업데이트

### 4.1 API 서버 환경 변수
Railway 대시보드에서 `workbase-api` 서비스:
- **Variables** 탭에서 `FRONTEND_URL` 업데이트:
  ```env
  FRONTEND_URL=https://www.workbase-ai.com
  ```
- 또는 루트 도메인을 사용한다면:
  ```env
  FRONTEND_URL=https://workbase-ai.com
  ```

### 4.2 Web 서버 환경 변수
Railway 대시보드에서 `workbase-web` 서비스:
- **Variables** 탭에서 `NEXT_PUBLIC_API_URL` 업데이트:
  ```env
  NEXT_PUBLIC_API_URL=https://api.workbase-ai.com/api
  ```

## 5. SSL 인증서 자동 설정

Railway는 자동으로 Let's Encrypt SSL 인증서를 발급합니다:
- DNS 레코드가 올바르게 설정되면 자동으로 HTTPS 활성화
- 보통 5-10분 소요
- Railway 대시보드에서 도메인 상태가 "Active"가 되면 SSL이 활성화된 것입니다

## 6. DNS 전파 확인

DNS 변경사항이 전 세계에 전파되는 데 시간이 걸립니다:
- 보통 5-30분 소요
- 최대 48시간까지 걸릴 수 있음

### 확인 방법
```bash
# API 서브도메인 확인
nslookup api.workbase-ai.com

# Web 서브도메인 확인
nslookup www.workbase-ai.com
```

또는 온라인 도구 사용:
- https://dnschecker.org
- 도메인 입력: `api.workbase-ai.com`, `www.workbase-ai.com`
- 전 세계 DNS 서버에서 확인 가능

## 7. 최종 확인

### 7.1 API 서버 확인
```bash
curl https://api.workbase-ai.com/api/health
```

또는 브라우저에서:
```
https://api.workbase-ai.com/api/health
```

### 7.2 Web 서버 확인
브라우저에서 접속:
```
https://www.workbase-ai.com
```

또는 루트 도메인:
```
https://workbase-ai.com
```

## 8. 완료 체크리스트

- [ ] Railway 계정 생성 및 프로젝트 설정
- [ ] API 서버 배포 완료
- [ ] Web 서버 배포 완료
- [ ] Railway 도메인 생성 완료 (각 서비스별)
- [ ] Porkbun DNS 레코드 설정 완료
  - [ ] `api.workbase-ai.com` CNAME 레코드
  - [ ] `www.workbase-ai.com` CNAME 레코드
  - [ ] (선택) `workbase-ai.com` CNAME 레코드
- [ ] Railway 커스텀 도메인 추가 완료
- [ ] DNS 전파 확인 완료
- [ ] SSL 인증서 발급 확인 완료
- [ ] 환경 변수 업데이트 완료
  - [ ] API 서버: `FRONTEND_URL=https://www.workbase-ai.com`
  - [ ] Web 서버: `NEXT_PUBLIC_API_URL=https://api.workbase-ai.com/api`
- [ ] API 서버 접속 테스트 완료
- [ ] Web 서버 접속 테스트 완료

## 9. 예상 최종 URL

설정이 완료되면:
- **API 서버**: `https://api.workbase-ai.com`
- **Web 서버**: `https://www.workbase-ai.com` (또는 `https://workbase-ai.com`)

## 10. 트러블슈팅

### 10.1 DNS 전파 지연
- DNS 변경 후 최대 48시간까지 기다려야 할 수 있음
- 온라인 DNS 체커로 확인: https://dnschecker.org
- 여러 지역에서 확인하여 전파 상태 확인

### 10.2 SSL 인증서 발급 실패
- DNS 레코드가 올바르게 설정되었는지 확인
- Railway 대시보드에서 도메인 상태 확인
- Railway 로그에서 오류 메시지 확인
- DNS 전파가 완료되었는지 확인

### 10.3 CORS 오류
API 서버의 환경 변수에서 `FRONTEND_URL`이 올바르게 설정되었는지 확인:
```env
FRONTEND_URL=https://www.workbase-ai.com
```

또는 API 서버의 `main.ts`에서 CORS 설정 확인:
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'https://www.workbase-ai.com',
  credentials: true,
});
```

### 10.4 Railway 빌드 실패
- Railway 로그 확인: 서비스 → **Deployments** → 로그 확인
- `package.json`의 빌드 스크립트 확인
- Root Directory 설정 확인
- 환경 변수 누락 확인

## 11. 추가 도움말

- Railway 문서: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Porkbun 지원: https://porkbun.com/support

