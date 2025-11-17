# Porkbun 도메인 + Railway 연결 가이드

Porkbun에서 구매한 도메인을 Railway에 연결하는 방법입니다.

## 1. Railway 서비스 배포 (먼저 완료 필요)

Railway에서 서비스를 먼저 배포하고 도메인을 생성해야 합니다.

### 1.1 API 서버 배포
1. Railway에서 `workbase-api` 서비스 생성
2. **Settings** → **Networking** → "Generate Domain" 클릭
3. Railway 도메인 확인 (예: `workbase-api-production.up.railway.app`)

### 1.2 Web 서버 배포
1. Railway에서 `workbase-web` 서비스 생성
2. **Settings** → **Networking** → "Generate Domain" 클릭
3. Railway 도메인 확인 (예: `workbase-web-production.up.railway.app`)

## 2. Porkbun DNS 설정

### 2.1 Porkbun 대시보드 접속
1. https://porkbun.com 접속
2. 로그인
3. "Account" → "Your Domains" 클릭
4. 구매한 도메인 선택

### 2.2 DNS 레코드 추가

#### API 서버용 서브도메인 (예: `api.yourdomain.com`)
1. "DNS Records" 섹션으로 이동
2. "Add" 또는 "Add Record" 클릭
3. 다음 설정 입력:
   - **Type**: `CNAME`
   - **Host**: `api` (또는 원하는 서브도메인)
   - **Answer**: Railway가 제공한 API 서비스의 도메인
     - 예: `workbase-api-production.up.railway.app`
   - **TTL**: `600` (또는 기본값)
4. "Add" 클릭

#### Web 서버용 서브도메인 (예: `www.yourdomain.com` 또는 `yourdomain.com`)
1. "DNS Records" 섹션으로 이동
2. "Add" 또는 "Add Record" 클릭
3. 다음 설정 입력:
   - **Type**: `CNAME`
   - **Host**: `www` (또는 `@` for root domain)
   - **Answer**: Railway가 제공한 Web 서비스의 도메인
     - 예: `workbase-web-production.up.railway.app`
   - **TTL**: `600` (또는 기본값)
4. "Add" 클릭

### 2.3 루트 도메인 설정 (선택사항)
루트 도메인(`yourdomain.com`)을 사용하려면:
- Porkbun에서 `@` 호스트로 CNAME 레코드 추가
- 또는 Railway에서 A 레코드 IP 주소를 사용 (Railway는 동적 IP이므로 권장하지 않음)

## 3. Railway 커스텀 도메인 설정

### 3.1 API 서버
1. Railway 대시보드에서 `workbase-api` 서비스 선택
2. **Settings** → **Networking** → "Custom Domain" 섹션
3. "Add Custom Domain" 클릭
4. 도메인 입력: `api.yourdomain.com`
5. Railway가 DNS 확인을 기다립니다 (보통 몇 분 소요)

### 3.2 Web 서버
1. Railway 대시보드에서 `workbase-web` 서비스 선택
2. **Settings** → **Networking** → "Custom Domain" 섹션
3. "Add Custom Domain" 클릭
4. 도메인 입력: `www.yourdomain.com` (또는 `yourdomain.com`)
5. Railway가 DNS 확인을 기다립니다

## 4. SSL 인증서 자동 설정

Railway는 자동으로 Let's Encrypt SSL 인증서를 발급합니다:
- DNS 레코드가 올바르게 설정되면 자동으로 HTTPS 활성화
- 보통 5-10분 소요

## 5. 환경 변수 업데이트

### 5.1 API 서버 환경 변수
Railway 대시보드에서 `workbase-api` 서비스:
- **Variables** 탭에서 `FRONTEND_URL` 업데이트:
  ```env
  FRONTEND_URL=https://www.yourdomain.com
  ```

### 5.2 Web 서버 환경 변수
Railway 대시보드에서 `workbase-web` 서비스:
- **Variables** 탭에서 `NEXT_PUBLIC_API_URL` 업데이트:
  ```env
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
  ```

## 6. DNS 전파 확인

DNS 변경사항이 전 세계에 전파되는 데 시간이 걸립니다:
- 보통 5-30분 소요
- 최대 48시간까지 걸릴 수 있음

### 확인 방법
```bash
# API 서브도메인 확인
nslookup api.yourdomain.com

# Web 서브도메인 확인
nslookup www.yourdomain.com

# 온라인 도구 사용
# https://dnschecker.org 에서 확인
```

## 7. 최종 확인

### 7.1 API 서버
```bash
curl https://api.yourdomain.com/api/health
```

### 7.2 Web 서버
브라우저에서 접속:
```
https://www.yourdomain.com
```

## 8. 트러블슈팅

### 8.1 DNS 전파 지연
- DNS 변경 후 최대 48시간까지 기다려야 할 수 있음
- 온라인 DNS 체커로 확인: https://dnschecker.org

### 8.2 SSL 인증서 발급 실패
- DNS 레코드가 올바르게 설정되었는지 확인
- Railway 대시보드에서 도메인 상태 확인
- Railway 로그에서 오류 메시지 확인

### 8.3 CORS 오류
API 서버의 환경 변수에서 `FRONTEND_URL`이 올바르게 설정되었는지 확인:
```env
FRONTEND_URL=https://www.yourdomain.com
```

## 9. 예시 설정

도메인이 `workbase.ai`인 경우:

### DNS 레코드 (Porkbun)
```
Type: CNAME
Host: api
Answer: workbase-api-production.up.railway.app
TTL: 600

Type: CNAME
Host: www
Answer: workbase-web-production.up.railway.app
TTL: 600
```

### Railway 커스텀 도메인
- API: `api.workbase.ai`
- Web: `www.workbase.ai`

### 환경 변수
- API 서버: `FRONTEND_URL=https://www.workbase.ai`
- Web 서버: `NEXT_PUBLIC_API_URL=https://api.workbase.ai/api`

## 10. 완료 체크리스트

- [ ] Railway 서비스 배포 완료
- [ ] Railway 도메인 생성 완료
- [ ] Porkbun DNS 레코드 설정 완료
- [ ] Railway 커스텀 도메인 추가 완료
- [ ] DNS 전파 확인 완료
- [ ] SSL 인증서 발급 확인 완료
- [ ] 환경 변수 업데이트 완료
- [ ] API 서버 접속 테스트 완료
- [ ] Web 서버 접속 테스트 완료

