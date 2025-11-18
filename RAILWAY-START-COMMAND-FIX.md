# Railway Start Command 오류 해결

## 문제
- `Error: Cannot find module '/app/apps/api/dist/main.js'`
- 빌드는 성공했지만 시작 시 파일을 찾을 수 없음

## 원인
Railway가 루트에서 실행되므로, 경로가 다를 수 있습니다.

## 해결 방법

### Railway Settings 확인 및 수정

**@notion-clone/api 서비스:**

1. **Settings** → **Build & Deploy** 섹션

2. **Root Directory:**
   - 빈 값으로 두기 (Railway가 자동으로 감지)

3. **Build Command:**
   ```bash
   npm install && npm run build --workspace=@notion-clone/api
   ```

4. **Start Command:**
   ```bash
   npm run start --workspace=@notion-clone/api
   ```
   
   또는 (Root Directory가 빈 값인 경우):
   ```bash
   cd apps/api && node dist/main.js
   ```

### 대안: 절대 경로 사용

**Start Command:**
```bash
node apps/api/dist/main.js
```

또는:
```bash
cd apps/api && npm start
```

## 확인 사항

1. **빌드가 성공했는지 확인**
   - Deployments 탭에서 빌드 로그 확인
   - `dist/main.js` 파일이 생성되었는지 확인

2. **파일 경로 확인**
   - Railway는 `/app`을 루트로 사용
   - 따라서 `/app/apps/api/dist/main.js`가 올바른 경로

3. **빌드 출력 확인**
   - 빌드 로그에서 `dist` 폴더가 생성되었는지 확인
   - TypeScript 컴파일이 성공했는지 확인

## 권장 설정

### 방법 1: Workspace 명령 사용 (권장)
```
Root Directory: (빈 값)
Build Command: npm install && npm run build --workspace=@notion-clone/api
Start Command: npm run start --workspace=@notion-clone/api
```

### 방법 2: 직접 경로 사용
```
Root Directory: apps/api
Build Command: npm install && npm run build
Start Command: node dist/main.js
```

## 다음 단계

1. Railway Settings에서 Start Command 수정
2. 서비스 재배포 (Redeploy)
3. 배포 로그 확인
4. 서비스가 정상적으로 시작되는지 확인

