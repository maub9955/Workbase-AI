# Render Web 서비스 502 오류 해결

## 문제
- `https://workbase-web.onrender.com` 접속 시 502 Bad Gateway 오류
- Web 앱 서비스가 실행되지 않음

## 즉시 확인할 사항

### 1. Render Dashboard에서 Web 서비스 상태 확인

1. Render Dashboard 접속
2. Web 앱 서비스 선택 (예: `workbase-web`)
3. 서비스 상태 확인:
   - ✅ "Live" 또는 "Running"인지 확인
   - ❌ "Building" 또는 "Failed"인지 확인

### 2. 배포 로그 확인

1. **Logs** 탭 클릭
2. 최신 배포 로그 확인:
   - 빌드가 성공했는지
   - 서버가 시작되었는지
   - 오류 메시지가 있는지

### 3. Settings 확인

**Settings** → **Build & Deploy** 섹션에서:

- **Root Directory**: `apps/web`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 4. 환경 변수 확인

**Environment** 섹션에서:

- `NEXT_PUBLIC_API_URL`: `https://api.workbase-ai.com/api`

## 일반적인 원인

### 1. 빌드 실패
- Tiptap 의존성 문제 (이미 수정함)
- TypeScript 오류
- 의존성 설치 실패

### 2. Start Command 오류
- `npm start`가 올바르게 실행되지 않음
- 포트 설정 문제

### 3. 서비스 일시 중지
- Render 무료 플랜은 15분 비활성 후 일시 중지
- 첫 요청 시 자동 재시작 (약간의 지연)

### 4. 메모리 부족
- 빌드 또는 실행 중 메모리 부족

## 해결 방법

### 방법 1: 서비스 재배포

1. **Manual Deploy** → **Deploy latest commit** 클릭
2. 배포 완료까지 대기 (2-3분)
3. 배포 로그에서 오류 확인

### 방법 2: 배포 로그 확인

**Logs** 탭에서:
- 빌드 단계에서 오류 확인
- 서버 시작 단계에서 오류 확인
- 전체 로그를 공유하여 문제 진단

### 방법 3: Start Command 확인

**Settings** → **Build & Deploy**에서:

**Start Command:**
```
npm start
```

확인 사항:
- Root Directory가 `apps/web`인지
- `package.json`에 `start` 스크립트가 있는지

## 확인 체크리스트

- [ ] Render Dashboard에서 Web 서비스 상태 확인
- [ ] 배포 로그에서 빌드 성공 여부 확인
- [ ] 배포 로그에서 서버 시작 여부 확인
- [ ] Settings에서 Root Directory와 Start Command 확인
- [ ] 환경 변수 확인
- [ ] 필요시 서비스 재배포

## 다음 단계

1. Render Dashboard에서 Web 서비스 상태 확인
2. 배포 로그 확인
3. 오류 메시지 공유
4. 필요시 서비스 재배포

