# 도메인 접근 설정 가이드

localhost:3000이 아닌 도메인을 통해 Workbase-AI에 접근하는 방법입니다.

## 방법 1: ngrok 사용 (가장 간단)

### 1. ngrok 설치
```bash
# macOS
brew install ngrok

# 또는 직접 다운로드
# https://ngrok.com/download
```

### 2. ngrok 실행
```bash
# 프론트엔드 (포트 3000)
ngrok http 3000

# 백엔드 (포트 4000) - 별도 터미널
ngrok http 4000
```

### 3. 환경 변수 업데이트
ngrok이 제공하는 URL을 사용하여 `.env` 파일 업데이트:

**apps/api/.env:**
```bash
FRONTEND_URL=https://your-ngrok-url.ngrok.io
```

**apps/web/.env.local (생성 필요):**
```bash
NEXT_PUBLIC_API_URL=https://your-backend-ngrok-url.ngrok.io/api
```

### 4. 주의사항
- ngrok 무료 버전은 URL이 매번 변경됩니다
- ngrok Pro를 사용하면 고정 도메인을 사용할 수 있습니다

## 방법 2: Cloudflare Tunnel (무료, 고정 도메인)

### 1. Cloudflare 계정 생성 및 도메인 추가
- https://dash.cloudflare.com 에서 계정 생성
- 도메인 추가 (무료 도메인도 가능)

### 2. cloudflared 설치
```bash
# macOS
brew install cloudflared
```

### 3. Tunnel 생성 및 실행
```bash
# Tunnel 생성
cloudflared tunnel create workbase-ai

# Tunnel 실행
cloudflared tunnel run workbase-ai
```

### 4. DNS 설정
Cloudflare 대시보드에서 DNS 레코드 추가:
- Type: CNAME
- Name: workbase-ai (또는 원하는 서브도메인)
- Target: Tunnel ID

## 방법 3: 실제 서버 배포

### VPS 사용 (예: DigitalOcean, AWS EC2)

1. **서버 설정**
   ```bash
   # Node.js 설치
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # PM2 설치 (프로세스 관리)
   npm install -g pm2
   ```

2. **도메인 연결**
   - 도메인 구매 (예: Namecheap, GoDaddy)
   - DNS A 레코드 설정: 서버 IP 주소

3. **Nginx 설정** (리버스 프록시)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   
   server {
       listen 80;
       server_name api.your-domain.com;
       
       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL 인증서 (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d api.your-domain.com
   ```

5. **환경 변수 업데이트**
   ```bash
   # apps/api/.env
   FRONTEND_URL=https://your-domain.com
   
   # apps/web/.env.local
   NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
   ```

## 방법 4: Vercel/Netlify (프론트엔드만)

### Vercel 사용
1. GitHub에 코드 푸시
2. https://vercel.com 에서 프로젝트 import
3. 환경 변수 설정:
   - `NEXT_PUBLIC_API_URL`: 백엔드 URL

### 주의사항
- 백엔드는 별도로 배포해야 합니다 (Railway, Render, Heroku 등)

## 추천 방법

**개발/테스트용**: ngrok (가장 빠름)
**프로덕션**: VPS + Nginx + Let's Encrypt (안정적)

## 이메일 설정 업데이트

도메인을 설정한 후, `.env` 파일의 `FRONTEND_URL`을 업데이트하세요:

```bash
# apps/api/.env
FRONTEND_URL=https://your-domain.com
```

이렇게 하면 이메일 초대 링크가 올바른 도메인으로 생성됩니다.

