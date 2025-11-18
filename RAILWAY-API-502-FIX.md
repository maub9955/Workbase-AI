# Railway API 502 Bad Gateway 오류 해결

## 문제
- `api.workbase-ai.com` 접속 시 "502 Bad Gateway" 오류
- Web 서버는 정상 작동하지만 API 서버만 오류 발생

## 원인
API 서버가 실행되지 않거나, 포트 설정이 잘못되었을 가능성이 높습니다.

## 해결 방법

### 1. Railway Deploy Logs 확인 (가장 중요!)

1. Railway 대시보드에서 **@notion-clone/api** 서비스 선택
2. **Deployments** 탭 클릭
3. 최신 배포의 **View Logs** 클릭
4. 다음을 확인:
   - 빌드가 성공했는지
   - 서버가 시작되었는지
   - 포트가 올바르게 설정되었는지
   - 에러 메시지가 있는지

### 2. Railway Settings 확인

**@notion-clone/api** 서비스의 **Settings** → **Build & Deploy**:

#### Root Directory
```
apps/api
```

#### Build Command
```bash
npm install && npm run build
```

#### Start Command
```bash
node dist/main.js
```

### 3. 환경 변수 확인

**Variables** 탭에서 다음 환경 변수가 설정되어 있는지 확인:

```
PORT=4000
```

**중요:** Railway는 자동으로 `PORT` 환경 변수를 설정하지만, 명시적으로 설정하는 것이 좋습니다.

### 4. Networking 포트 확인

1. **Networking** 탭으로 이동
2. `api.workbase-ai.com` 도메인 확인
3. 포트가 **4000**으로 설정되어 있는지 확인
   - 만약 다른 포트(예: 8080)로 설정되어 있다면:
     - Edit 아이콘 클릭
     - 포트를 **4000**으로 변경
     - Save

### 5. 서비스 재배포

설정을 변경한 후:
1. **Deployments** 탭으로 이동
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기
4. 로그에서 다음 메시지 확인:
   ```
   API server running at http://localhost:4000/api
   ```

### 6. 일반적인 오류 원인

#### 오류 1: "Cannot find module"
- **원인:** Start Command 경로가 잘못됨
- **해결:** Root Directory를 `apps/api`로 설정하고 Start Command를 `node dist/main.js`로 설정

#### 오류 2: "Port already in use"
- **원인:** 포트 충돌
- **해결:** Railway가 자동으로 설정한 `PORT` 환경 변수를 사용하도록 확인

#### 오류 3: "Build failed"
- **원인:** TypeScript 컴파일 오류
- **해결:** 로컬에서 `npm run build` 실행하여 오류 확인

### 7. 로그에서 확인할 메시지

정상적으로 시작되면 로그에 다음이 표시됩니다:
```
API server running at http://localhost:4000/api
```

이 메시지가 보이지 않으면 서버가 시작되지 않은 것입니다.

## 확인 체크리스트

- [ ] Root Directory: `apps/api`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `node dist/main.js`
- [ ] PORT 환경 변수: `4000` (또는 Railway 자동 설정)
- [ ] Networking 포트: `4000`
- [ ] 배포 로그에 "API server running" 메시지 확인
- [ ] 서비스가 "Active" 상태인지 확인

## 다음 단계

1. Railway Deploy Logs 확인
2. 위의 설정들이 올바른지 확인
3. 필요시 서비스 재배포
4. 로그에서 에러 메시지 확인
5. 여전히 문제가 있으면 로그 내용을 공유해주세요

