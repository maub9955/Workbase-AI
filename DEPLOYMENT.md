# 배포 가이드

## 1. 이메일 발송 설정

### SMTP 환경 변수 설정

API 서버의 `.env` 파일에 다음 환경 변수를 추가하세요:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Gmail 사용 시

1. Google 계정 설정에서 "2단계 인증" 활성화
2. "앱 비밀번호" 생성: https://myaccount.google.com/apppasswords
3. 생성된 비밀번호를 `SMTP_PASS`에 사용

### 다른 이메일 서비스

- **Outlook/Hotmail**: `smtp-mail.outlook.com`, 포트 587
- **SendGrid**: `smtp.sendgrid.net`, 포트 587, 사용자명 `apikey`
- **Mailgun**: `smtp.mailgun.org`, 포트 587

## 2. 도메인 접근 설정

### 로컬 네트워크에서 접근 (같은 WiFi)

1. **API 서버 설정** (`apps/api/.env`):
```env
FRONTEND_URL=http://YOUR_IP:3000
```

2. **웹 서버 설정** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://YOUR_IP:4000/api
```

3. **IP 주소 확인**:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

4. **방화벽 설정**:
   - macOS: 시스템 설정 > 방화벽 > 포트 3000, 4000 허용
   - Windows: 방화벽에서 포트 3000, 4000 인바운드 규칙 추가

### 인터넷을 통한 접근 (배포)

#### 옵션 1: Vercel (프론트엔드) + Railway/Render (백엔드)

1. **프론트엔드 배포 (Vercel)**:
   ```bash
   npm install -g vercel
   cd apps/web
   vercel
   ```
   - 환경 변수 설정: `NEXT_PUBLIC_API_URL=https://your-api-domain.com/api`

2. **백엔드 배포 (Railway/Render)**:
   - GitHub에 코드 푸시
   - Railway/Render에서 프로젝트 연결
   - 환경 변수 설정:
     - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
     - `FRONTEND_URL=https://your-frontend-domain.vercel.app`

#### 옵션 2: 전체 서버 배포 (VPS)

1. **서버 준비** (Ubuntu 예시):
   ```bash
   # Node.js 설치
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # PM2 설치 (프로세스 관리)
   sudo npm install -g pm2
   ```

2. **코드 배포**:
   ```bash
   git clone YOUR_REPO_URL
   cd notion-clone
   npm install
   ```

3. **환경 변수 설정**:
   ```bash
   # apps/api/.env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FRONTEND_URL=https://your-domain.com
   
   # apps/web/.env.local
   NEXT_PUBLIC_API_URL=https://your-domain.com/api
   ```

4. **빌드 및 실행**:
   ```bash
   # 프로덕션 빌드
   npm run build
   
   # PM2로 실행
   pm2 start npm --name "notion-api" -- run start --filter=@notion-clone/api
   pm2 start npm --name "notion-web" -- run start --filter=@notion-clone/web
   
   # 자동 시작 설정
   pm2 save
   pm2 startup
   ```

5. **Nginx 리버스 프록시 설정**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # 프론트엔드
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       # API
       location /api {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

6. **SSL 인증서 (Let's Encrypt)**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 3. 테스트

### 이메일 테스트
1. 페이지 공유 기능 사용
2. 초대 이메일이 정상적으로 발송되는지 확인
3. API 서버 로그 확인:
   ```bash
   # PM2 로그
   pm2 logs notion-api
   ```

### 도메인 접근 테스트
1. 다른 기기에서 도메인/IP로 접근
2. 회원가입/로그인 테스트
3. 페이지 생성/편집 테스트

## 4. 문제 해결

### 이메일이 발송되지 않는 경우
- SMTP 설정 확인
- 방화벽에서 포트 587/465 허용 확인
- Gmail의 경우 "보안 수준이 낮은 앱 액세스" 활성화 (비권장) 또는 앱 비밀번호 사용

### 도메인 접근이 안 되는 경우
- 방화벽 설정 확인
- 포트 포워딩 확인 (라우터 설정)
- DNS 설정 확인 (도메인 사용 시)

## 5. 보안 권장사항

1. **환경 변수 보호**: `.env` 파일을 `.gitignore`에 추가
2. **HTTPS 사용**: 프로덕션에서는 반드시 SSL 인증서 사용
3. **CORS 설정**: API 서버에서 허용된 도메인만 접근 가능하도록 설정
4. **비밀번호 강도**: 사용자 비밀번호 정책 강화

