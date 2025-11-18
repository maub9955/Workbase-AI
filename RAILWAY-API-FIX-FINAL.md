# Railway API 서버 Start Command 최종 해결

## 문제
- `Error: Cannot find module '/app/apps/api/dist/main.js'`
- Start Command가 올바른 경로를 찾지 못함

## 해결 방법

### 방법 1: Root Directory를 `apps/api`로 설정 (권장)

**Railway Settings → Build & Deploy:**

1. **Root Directory:** `apps/api` 입력

2. **Build Command:**
   ```bash
   npm install && npm run build
   ```

3. **Start Command:**
   ```bash
   node dist/main.js
   ```

이렇게 하면 Railway가 `apps/api` 디렉토리를 루트로 인식합니다.

### 방법 2: 절대 경로 사용 (Root Directory가 빈 값인 경우)

**Railway Settings → Build & Deploy:**

1. **Root Directory:** (빈 값)

2. **Build Command:**
   ```bash
   npm install && npm run build --workspace=@notion-clone/api
   ```

3. **Start Command:**
   ```bash
   node apps/api/dist/main.js
   ```

### 방법 3: cd 명령 사용

**Railway Settings → Build & Deploy:**

1. **Root Directory:** (빈 값)

2. **Build Command:**
   ```bash
   npm install && cd apps/api && npm run build
   ```

3. **Start Command:**
   ```bash
   cd apps/api && node dist/main.js
   ```

## 가장 확실한 방법 (권장)

**Root Directory를 `apps/api`로 설정하는 것이 가장 간단합니다:**

```
Root Directory: apps/api
Build Command: npm install && npm run build
Start Command: node dist/main.js
```

이렇게 하면 Railway가 `apps/api`를 프로젝트 루트로 인식하여 모든 경로가 올바르게 작동합니다.

## 확인 사항

1. **빌드 로그 확인**
   - Deployments 탭에서 빌드가 성공했는지 확인
   - `dist` 폴더가 생성되었는지 확인

2. **파일 구조 확인**
   - 빌드 후 `apps/api/dist/main.js` 파일이 존재하는지 확인

3. **환경 변수 확인**
   - `NODE_ENV=production` 설정 확인
   - `PORT` 환경 변수 확인 (Railway가 자동 설정)

## 다음 단계

1. Railway Settings에서 Root Directory를 `apps/api`로 설정
2. Build Command와 Start Command를 위의 권장 설정으로 변경
3. 저장
4. 서비스 재배포 (Redeploy)
5. 배포 로그 확인

