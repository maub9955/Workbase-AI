# Railway API 서버 시작 확인

## 현재 상황
- 배포는 완료되었지만 여전히 502 Bad Gateway 오류
- 빌드는 성공했지만 서버가 시작되지 않았거나 응답하지 않음

## 확인 사항

### 1. Deploy Logs 확인 (가장 중요!)

Railway 대시보드에서:
1. **@notion-clone/api** 서비스 선택
2. **Deployments** 탭 클릭
3. 최신 배포 (3분 전)의 **View Logs** 클릭
4. 다음을 확인:

#### 성공 메시지 확인
다음 메시지가 있는지 확인:
```
API server running at http://localhost:4000/api
```

#### 오류 메시지 확인
다음과 같은 오류가 있는지 확인:
- `Error: Cannot find module`
- `Error: listen EADDRINUSE` (포트 충돌)
- `Error: ENOENT` (파일을 찾을 수 없음)
- 기타 런타임 오류

### 2. Settings 확인

**Settings** → **Deploy** 섹션:

**Custom Start Command:**
```bash
node dist/main.js
```

**확인 사항:**
- Root Directory가 `apps/api`로 설정되어 있는지
- Start Command가 올바른지

### 3. 환경 변수 확인

**Variables** 탭에서:
- `PORT` 환경 변수가 설정되어 있는지 확인
- Railway가 자동으로 설정하지만, 명시적으로 `PORT=4000`을 추가할 수 있음

### 4. Networking 포트 확인

**Networking** 탭에서:
- `api.workbase-ai.com`의 포트가 **4000**으로 설정되어 있는지 확인

## 일반적인 문제와 해결 방법

### 문제 1: "Cannot find module '/app/dist/main.js'"
**원인:** Root Directory가 올바르게 설정되지 않음
**해결:**
- Root Directory를 `apps/api`로 설정
- Start Command를 `node dist/main.js`로 설정

### 문제 2: "Error: listen EADDRINUSE"
**원인:** 포트가 이미 사용 중
**해결:**
- Railway가 자동으로 설정한 `PORT` 환경 변수를 사용하도록 확인
- 서비스 재시작

### 문제 3: 서버가 시작되지만 즉시 종료됨
**원인:** 런타임 오류 또는 의존성 문제
**해결:**
- Deploy Logs에서 전체 오류 메시지 확인
- 로컬에서 `npm run build && node dist/main.js` 실행하여 오류 재현

### 문제 4: 빌드는 성공하지만 서버가 시작되지 않음
**원인:** Start Command가 실행되지 않음
**해결:**
- Start Command가 올바른지 확인
- Root Directory가 올바른지 확인

## 로컬 테스트

로컬에서 빌드와 시작을 테스트:

```bash
cd apps/api
npm install
npm run build
node dist/main.js
```

정상적으로 시작되면:
```
API server running at http://localhost:4000/api
```

이 메시지가 표시되어야 합니다.

## 다음 단계

1. Railway Deploy Logs 확인
2. 오류 메시지가 있으면 공유
3. 로컬 테스트 결과 공유
4. 위의 확인 사항들을 점검

