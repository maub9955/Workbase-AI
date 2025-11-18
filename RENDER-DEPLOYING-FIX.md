# Render Workbase-AI Deploying 문제 해결

## 현재 상황

- **Workbase-AI**: 계속 Deploying 중 (1시간 이상)
- **workbase-web**: 정상 Deployed ✅
- API 서비스가 별도로 보이지 않음

## 문제 진단

### 1단계: Workbase-AI 서비스 로그 확인

1. Render Dashboard에서 **Workbase-AI** 서비스 클릭
2. **Logs** 탭 클릭
3. 최근 로그 확인:
   - 빌드 오류가 있는지 확인
   - 배포가 멈춰있는지 확인
   - 특정 단계에서 실패하는지 확인

### 2단계: 빌드 오류 확인

로그에서 다음을 확인하세요:
- `Build failed` 메시지
- TypeScript 오류
- npm install 오류
- 환경 변수 오류

### 3단계: Workbase-AI가 API 서비스인지 확인

1. **Workbase-AI** 서비스 클릭
2. **Settings** 탭 클릭
3. 다음 확인:
   - **Root Directory**: `apps/api`인지 확인
   - **Build Command**: `npm install && npm run build`인지 확인
   - **Start Command**: `node dist/main.js`인지 확인

## 해결 방법

### 방법 1: 서비스 재배포

1. **Workbase-AI** 서비스 클릭
2. **Manual Deploy** 섹션 찾기
3. **Deploy latest commit** 클릭
4. 배포 진행 상황 확인

### 방법 2: 빌드 오류 수정

로그에서 오류를 확인한 후:
1. 오류 메시지를 복사
2. 코드 수정
3. GitHub에 푸시
4. 자동 재배포 대기

### 방법 3: 환경 변수 확인

1. **Workbase-AI** 서비스 클릭
2. **Settings** 탭 클릭
3. **Environment Variables** 섹션 확인
4. `DATABASE_URL` 환경 변수가 있는지 확인
5. 없으면 추가:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:cx%2243bw@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres`
6. **Save Changes** 클릭
7. 재배포

## Workbase-AI가 API 서비스인 경우

만약 **Workbase-AI**가 API 서비스라면:

1. **Settings** → **Environment Variables**에서 `DATABASE_URL` 추가
2. **Settings**에서 다음 확인:
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/main.js`
3. **Save Changes** 클릭
4. **Manual Deploy** → **Deploy latest commit** 클릭

## 다음 단계

1. **Workbase-AI** 서비스 클릭
2. **Logs** 탭에서 최근 로그 확인
3. 오류 메시지가 있으면 알려주세요
4. 오류가 없으면 **Manual Deploy** 시도

