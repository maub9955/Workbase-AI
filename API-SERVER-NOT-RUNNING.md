# API 서버가 실행되지 않는 문제

## 문제
- 배포 로그에서는 서버가 시작되었다고 나옴
- 하지만 CPU 사용량이 0 (서버가 실행되지 않음)
- 502 오류 발생

## 원인
서버가 시작되었다가 즉시 종료되었거나, Start Command가 잘못되었을 수 있습니다.

## 즉시 확인할 사항

### 1. Start Command 확인

**@notion-clone/api** 서비스의 **Settings** → **Deploy** 섹션에서:

**Custom Start Command:**
```
node dist/main.js
```

**확인 사항:**
- Root Directory가 `apps/api`로 설정되어 있는지
- Start Command가 `node dist/main.js`인지
- 절대 경로가 아닌 상대 경로인지

### 2. 배포 로그에서 서버 종료 확인

**@notion-clone/api** 서비스의 **Deployments** 탭에서:

1. 최신 배포의 **View Logs** 클릭
2. 로그 끝부분 확인:
   - 서버가 시작된 후 종료 메시지가 있는지
   - 오류 메시지가 있는지
   - 프로세스가 종료되었는지

### 3. Root Directory 확인

**@notion-clone/api** 서비스의 **Settings** → **General** 섹션에서:

**Root Directory:**
```
apps/api
```

이 설정이 올바른지 확인하세요.

## 해결 방법

### 방법 1: Start Command 수정

**Settings** → **Deploy** 섹션에서:

**Custom Start Command:**
```bash
node dist/main.js
```

**또는 절대 경로 사용:**
```bash
cd /app/apps/api && node dist/main.js
```

### 방법 2: 환경 변수 확인

**Variables** 탭에서:
- `PORT` 환경 변수가 설정되어 있는지 확인
- Railway가 자동으로 설정하지만, 명시적으로 `PORT=4000`을 추가할 수 있음

### 방법 3: 빌드 출력 확인

배포 로그에서:
- `dist/main.js` 파일이 생성되었는지 확인
- 빌드가 성공했는지 확인

### 방법 4: 서비스 재시작

1. **Deployments** 탭에서 **Redeploy** 클릭
2. 배포 완료까지 대기
3. 배포 로그에서 서버가 계속 실행 중인지 확인
4. Metrics에서 CPU 사용량 확인

## 일반적인 원인

### 1. Start Command 경로 문제
- Root Directory가 `apps/api`인데 Start Command가 `node dist/main.js`인 경우
- Railway가 `/app/apps/api`에서 실행하므로 `dist/main.js`가 존재해야 함

### 2. 서버 즉시 종료
- 런타임 오류로 인해 서버가 시작되자마자 종료
- 배포 로그에서 오류 메시지 확인 필요

### 3. 포트 문제
- 포트가 이미 사용 중이거나 설정이 잘못됨
- Railway가 자동으로 설정한 PORT 환경 변수 확인

## 다음 단계

1. **Settings** → **Deploy**에서 Start Command 확인
2. **Settings** → **General**에서 Root Directory 확인
3. 배포 로그 끝부분에서 서버 종료 여부 확인
4. 필요시 서비스 재배포

## 확인 체크리스트

- [ ] Root Directory: `apps/api`
- [ ] Start Command: `node dist/main.js`
- [ ] 배포 로그에서 서버 종료 메시지 확인
- [ ] 빌드가 성공했는지 확인
- [ ] `dist/main.js` 파일이 생성되었는지 확인

