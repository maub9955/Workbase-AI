# Railway Web 서비스 일시 중지 문제 해결

## 현재 상태
- Web 앱: Railway에서 실행 중
- API 서버: Render에서 실행 중
- Web 앱이 갑자기 접속 안 됨

## 원인
Railway 무료 플랜은 15분 비활성 후 서비스를 자동으로 일시 중지합니다.

## 해결 방법

### 방법 1: Railway Web 서비스 재배포 (빠른 해결)

1. Railway Dashboard 접속
2. **@notion-clone/web** 서비스 선택
3. **Deployments** 탭 클릭
4. 최신 배포의 **Redeploy** 클릭
5. 배포 완료까지 대기 (2-3분)
6. 서비스가 "Active" 상태가 되는지 확인

### 방법 2: Railway Web 서비스 상태 확인

1. Railway Dashboard에서 **@notion-clone/web** 서비스 선택
2. 서비스 상태 확인:
   - "Active" 또는 "Running"인지 확인
   - "Paused" 또는 "Sleeping"인지 확인
3. Metrics 탭에서 CPU/Memory 사용량 확인

### 방법 3: Render에 Web 앱도 배포 (장기 해결)

Railway 무료 플랜의 일시 중지 문제를 피하기 위해:

1. Render Dashboard에서 새 Web Service 생성
2. GitHub 저장소 연결
3. 설정:
   - Root Directory: `apps/web`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     - `NEXT_PUBLIC_API_URL`: `https://api.workbase-ai.com/api`
4. 배포 완료 후 커스텀 도메인 연결
5. Porkbun DNS에서 `www.workbase-ai.com` CNAME을 Render로 변경

## 즉시 해결

**Railway Web 서비스 재배포:**
1. Railway → **@notion-clone/web** → **Deployments** → **Redeploy**
2. 배포 완료 후 접속 테스트

## 다음 단계

1. Railway에서 Web 서비스 재배포
2. 접속 테스트
3. 계속 문제가 발생하면 Render에 Web 앱도 배포 고려

