# Railway 도메인 생성 문제 해결

## 현재 상태
- ✅ **Web**: 도메인 생성됨, 작동 중 (`notion-cloneweb-production.up.railway.app`)
- ❌ **API**: 도메인 생성 버튼이 안 보임 (포트 8080만 표시)
- ⚠️ **Realtime**: 도메인 생성됨, "Upgrade Required" 오류
- ⚠️ **Worker**: 도메인 생성 불필요 (백그라운드 작업)

## 문제 해결

### API 서버 도메인 생성 문제

API 서버가 "Unexposed service" 상태일 수 있습니다. 다음을 확인하세요:

1. **API 서버가 실행 중인지 확인**
   - Railway 대시보드에서 `@notion-clone/api` 서비스
   - **Deployments** 탭에서 최신 배포가 "Active"인지 확인
   - **Metrics** 탭에서 CPU/메모리 사용량 확인

2. **서비스가 Public인지 확인**
   - **Settings** → **Networking** 섹션
   - "Public" 토글이 켜져 있는지 확인
   - 꺼져 있다면 켜기

3. **포트 설정 확인**
   - Railway는 자동으로 `PORT` 환경 변수를 설정합니다
   - API 서버가 `process.env.PORT`를 사용하는지 확인
   - `apps/api/src/main.ts`에서 `const port = process.env.PORT ?? "4000";` 확인

4. **수동으로 도메인 생성 시도**
   - **Settings** → **Networking** → **Generate Domain** 버튼 클릭
   - 버튼이 없다면 서비스가 아직 준비되지 않았을 수 있음
   - 배포가 완전히 완료될 때까지 기다리기

### Realtime 서버 "Upgrade Required" 오류

Realtime 서버는 WebSocket 서버이므로:
- Railway 무료 티어에서는 제한이 있을 수 있습니다
- 또는 서비스가 제대로 시작되지 않았을 수 있습니다
- **해결**: 일단 Web과 API만 연결하고, Realtime은 나중에 설정

## 최소 설정 (Web + API만)

### 1. API 서버 도메인 생성

**방법 1: Public 토글 확인**
1. `@notion-clone/api` 서비스 → **Settings**
2. **Networking** 섹션에서 "Public" 토글이 켜져 있는지 확인
3. 꺼져 있다면 켜기
4. **Generate Domain** 버튼 클릭

**방법 2: 서비스 재시작**
1. **Deployments** 탭에서 최신 배포 선택
2. **Redeploy** 클릭
3. 배포 완료 후 **Settings** → **Networking**에서 도메인 생성 시도

**방법 3: 환경 변수 확인**
- **Variables** 탭에서 `PORT` 환경 변수가 있는지 확인
- 없으면 추가: `PORT=4000` (Railway가 자동 설정하지만 명시적으로 추가)

### 2. Web 서버 도메인 확인

Web 서버는 이미 작동 중이므로:
- 도메인: `notion-cloneweb-production.up.railway.app` (또는 생성된 도메인)
- 이 도메인을 기록해두세요!

## 도메인 연결 순서

### 1단계: API 서버 도메인 생성 (필수)
- API 서버 도메인을 먼저 생성해야 합니다
- 없으면 Web 서버가 API와 통신할 수 없습니다

### 2단계: Porkbun DNS 설정
- `api.workbase-ai.com` → Railway API 도메인
- `www.workbase-ai.com` → Railway Web 도메인

### 3단계: Railway 커스텀 도메인 추가
- 각 서비스에 커스텀 도메인 추가

## 현재 해야 할 일

1. **API 서버 도메인 생성 문제 해결**
   - Settings → Networking에서 "Public" 토글 확인
   - 또는 서비스 재시작 후 다시 시도

2. **API 서버 도메인을 생성한 후**
   - 두 도메인(API + Web)을 모두 기록
   - Porkbun DNS 설정 진행

API 서버의 Settings → Networking 화면을 확인해주세요. "Public" 토글이 있는지, 또는 다른 오류 메시지가 있는지 알려주시면 더 정확한 해결 방법을 제시하겠습니다.

