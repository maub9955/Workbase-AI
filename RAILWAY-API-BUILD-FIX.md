# Railway API 빌드 오류 해결 (No workspaces found)

## 문제
- 빌드 실패: `npm error No workspaces found: --workspace=@notion-clone/api`
- Build Command와 Start Command에서 workspace 옵션을 사용하고 있지만 작동하지 않음

## 원인
Railway가 프로젝트 루트에서 실행되지만, workspace 명령이 제대로 작동하지 않습니다. Root Directory를 명시적으로 설정하고 workspace 명령 대신 직접 경로를 사용해야 합니다.

## 해결 방법

### 1. Root Directory 설정

**Settings** → **General** 섹션에서:

**Root Directory:**
```
apps/api
```

이렇게 설정하면 Railway가 `apps/api` 디렉토리를 루트로 인식합니다.

### 2. Build Command 수정

**Settings** → **Build** 섹션에서:

**Custom Build Command:**
```bash
npm install && npm run build
```

**변경 사항:**
- ❌ 기존: `npm run build --workspace=@notion-clone/api`
- ✅ 수정: `npm install && npm run build`

Root Directory가 `apps/api`로 설정되면, 해당 디렉토리에서 직접 명령이 실행되므로 workspace 옵션이 필요 없습니다.

### 3. Start Command 수정

**Settings** → **Deploy** 섹션에서:

**Custom Start Command:**
```bash
node dist/main.js
```

**변경 사항:**
- ❌ 기존: `npm run start --workspace=@notion-clone/api`
- ✅ 수정: `node dist/main.js`

### 4. 환경 변수 확인 (선택사항)

**Variables** 탭에서 `PORT` 환경 변수를 명시적으로 추가할 수 있습니다:

```
PORT=4000
```

하지만 Railway가 자동으로 설정하므로 필수는 아닙니다.

## 최종 설정 요약

### @notion-clone/api 서비스

**General:**
- Root Directory: `apps/api`

**Build:**
- Custom Build Command: `npm install && npm run build`

**Deploy:**
- Custom Start Command: `node dist/main.js`

**Networking:**
- Port: `4000` (이미 올바르게 설정됨)

## 다음 단계

1. 위의 설정들을 모두 변경
2. **Deployments** 탭으로 이동
3. **Redeploy** 클릭 (또는 새로운 커밋 푸시)
4. 빌드 로그에서 다음 메시지 확인:
   ```
   API server running at http://localhost:4000/api
   ```

## 예상 결과

설정 변경 후:
- ✅ 빌드가 성공적으로 완료됨
- ✅ 서버가 포트 4000에서 시작됨
- ✅ `api.workbase-ai.com`이 정상 작동함

