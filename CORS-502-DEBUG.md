# CORS 및 502 오류 디버깅

## 현재 상태
- ✅ `ALLOWED_ORIGINS = *` (설정됨)
- ✅ `NEXT_PUBLIC_API_URL = https://api.workbase-ai.com/api` (설정됨)
- ❌ 여전히 CORS 오류 및 502 오류 발생

## 문제 분석

### 1. Preflight 요청이 502 오류 반환
- Preflight 요청(OPTIONS)이 API 서버에 도달하지 못하고 있음
- 이는 API 서버가 재배포되지 않았거나, 서버가 제대로 시작되지 않았을 수 있음

### 2. 즉시 확인할 사항

#### A. API 서버 재배포 확인
1. **@notion-clone/api** 서비스의 **Deployments** 탭으로 이동
2. 최신 배포 시간 확인
3. `ALLOWED_ORIGINS` 환경 변수를 변경한 **이후**에 배포가 되었는지 확인
4. **이후에 배포가 없다면:**
   - 최신 배포의 **Redeploy** 클릭
   - 배포 완료까지 대기 (2-3분)

#### B. API 서버 로그 확인
1. **@notion-clone/api** 서비스의 **Deployments** 탭
2. 최신 배포의 **View Logs** 클릭
3. 다음을 확인:
   - 서버가 정상적으로 시작되었는지
   - `API server running at http://localhost:4000/api` 메시지가 있는지
   - CORS 관련 오류가 있는지

#### C. API 서버 직접 테스트
터미널에서 다음 명령으로 테스트:

```bash
# Preflight 요청 테스트
curl -X OPTIONS https://api.workbase-ai.com/api/auth/login \
  -H "Origin: https://www.workbase-ai.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v
```

**예상 응답:**
- Status: 204 No Content 또는 200 OK
- `Access-Control-Allow-Origin: https://www.workbase-ai.com` 헤더 포함
- `Access-Control-Allow-Methods: GET,POST,PATCH,DELETE,PUT,OPTIONS` 헤더 포함

**실제 응답이 502라면:**
- API 서버가 제대로 실행되지 않고 있음
- 재배포 필요

## 해결 방법

### 방법 1: 강제 재배포
1. **@notion-clone/api** 서비스의 **Deployments** 탭
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기
4. 배포 로그에서 서버 시작 메시지 확인

### 방법 2: 환경 변수 재확인
1. **Variables** 탭에서 `ALLOWED_ORIGINS` 값 확인
2. 값이 정확히 `*`인지 확인 (공백 없음)
3. 필요시 삭제 후 다시 추가

### 방법 3: 브라우저 캐시 완전 클리어
1. 브라우저 개발자 도구 열기 (F12)
2. Network 탭에서 "Disable cache" 체크
3. 브라우저 캐시 완전히 클리어
4. 시크릿 모드에서 테스트

## Metrics 분석

Metrics 그래프를 보면:
- **Request Error Rate**: 100% (매우 높음)
- **Response Time**: 불안정
- **CPU/Memory**: 매우 낮음 (서버가 거의 요청을 처리하지 못함)

이는 API 서버가 제대로 작동하지 않고 있음을 의미합니다.

## 다음 단계

1. **API 서버 재배포** (가장 중요!)
   - Deployments 탭 → Redeploy
   - 배포 완료까지 대기
   - 로그에서 서버 시작 확인

2. **배포 로그 확인**
   - 서버가 정상적으로 시작되었는지 확인
   - 오류 메시지가 있는지 확인

3. **직접 테스트**
   - curl 명령으로 Preflight 요청 테스트
   - 응답이 200/204인지 확인

4. **브라우저 테스트**
   - 캐시 클리어 후 다시 시도
   - Network 탭에서 CORS 오류가 사라졌는지 확인

## 확인 체크리스트

- [ ] API 서버가 `ALLOWED_ORIGINS` 변경 후 재배포되었는지 확인
- [ ] 배포 로그에서 서버가 정상적으로 시작되었는지 확인
- [ ] curl로 Preflight 요청 테스트
- [ ] 브라우저 캐시 클리어 후 재테스트

