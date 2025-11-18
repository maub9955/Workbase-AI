# API 서버 502 오류 - Application failed to respond

## 문제
- Preflight 요청(OPTIONS)이 502 오류 반환
- "Application failed to respond" 메시지
- Railway Edge에서 반환된 오류

## 원인
API 서버가 실행되지 않았거나, 요청을 처리할 수 없는 상태입니다.

## 즉시 확인할 사항

### 1. API 서버 배포 상태 확인

**@notion-clone/api** 서비스의 **Deployments** 탭에서:

1. 최신 배포 상태 확인
   - ✅ "Active" 또는 "Success"인지 확인
   - ❌ "Failed" 또는 "Building"인지 확인

2. 최신 배포의 **View Logs** 클릭
3. 다음을 확인:
   - 서버가 정상적으로 시작되었는지
   - `API server running at http://localhost:4000/api` 메시지가 있는지
   - 오류 메시지가 있는지

### 2. API 서버가 실행 중인지 확인

**@notion-clone/api** 서비스의 **Metrics** 탭에서:

- **CPU 사용량**: 0에 가까우면 서버가 실행되지 않음
- **Memory 사용량**: 0에 가까우면 서버가 실행되지 않음
- **Requests**: 요청이 전혀 없으면 서버가 실행되지 않음

### 3. Settings 확인

**@notion-clone/api** 서비스의 **Settings** → **Deploy** 섹션에서:

- **Root Directory**: `apps/api`
- **Start Command**: `node dist/main.js`
- **Port**: 확인 불필요 (Railway가 자동 설정)

### 4. 환경 변수 확인

**@notion-clone/api** 서비스의 **Variables** 탭에서:

- `PORT`: 설정되어 있지 않아도 됨 (Railway가 자동 설정)
- `ALLOWED_ORIGINS`: `*` 또는 특정 도메인

## 해결 방법

### 방법 1: API 서버 재배포

1. **@notion-clone/api** 서비스의 **Deployments** 탭
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기 (2-3분)
4. 배포 로그에서 다음 메시지 확인:
   ```
   API server running at http://localhost:4000/api
   ```

### 방법 2: 배포 로그에서 오류 확인

배포 로그에 오류가 있다면:
- 빌드 오류인지 확인
- 런타임 오류인지 확인
- 의존성 문제인지 확인

### 방법 3: 서비스 재시작

1. **Settings** → **Deploy** 섹션
2. **Restart Service** 버튼이 있다면 클릭
3. 또는 **Deployments** 탭에서 **Redeploy**

## 일반적인 원인

### 1. 서버가 시작되지 않음
- 빌드는 성공했지만 서버가 시작되지 않음
- Start Command가 잘못되었을 수 있음

### 2. 포트 충돌
- 다른 프로세스가 포트를 사용 중
- Railway가 자동으로 설정한 PORT와 충돌

### 3. 런타임 오류
- 서버가 시작되다가 크래시됨
- 의존성 문제

### 4. 빌드 실패
- TypeScript 컴파일 오류
- 의존성 설치 실패

## 다음 단계

1. **Deployments** 탭에서 최신 배포 상태 확인
2. **View Logs**에서 서버 시작 메시지 확인
3. 오류가 있다면 오류 메시지 공유
4. 오류가 없다면 **Redeploy** 클릭
5. 재배포 후 curl로 다시 테스트

## 확인 체크리스트

- [ ] 최신 배포가 "Active" 또는 "Success" 상태인지 확인
- [ ] 배포 로그에서 서버 시작 메시지 확인
- [ ] 배포 로그에 오류 메시지가 있는지 확인
- [ ] Metrics에서 CPU/Memory 사용량 확인
- [ ] 필요시 서비스 재배포

