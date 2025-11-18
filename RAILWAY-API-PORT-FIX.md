# Railway API 포트 불일치 해결

## 문제
- 서버는 포트 **8080**에서 실행 중
- Railway Networking은 포트 **4000**으로 설정됨
- 결과: 502 Bad Gateway 오류

## 해결 방법

### 방법 1: Railway Networking 포트 변경 (권장)

1. Railway 대시보드에서 **@notion-clone/api** 서비스 선택
2. **Networking** 탭 클릭
3. `api.workbase-ai.com` 도메인의 **Edit** 아이콘 클릭
4. 포트를 **8080**으로 변경
5. **Save** 클릭

### 방법 2: 환경 변수로 포트 고정

1. **Variables** 탭으로 이동
2. **+ New Variable** 클릭
3. Name: `PORT`
4. Value: `4000`
5. **Add** 클릭
6. 서비스 재배포 (Redeploy)

이렇게 하면 서버가 포트 4000에서 실행되고, Networking 설정과 일치합니다.

## 현재 상태

로그에서 확인된 포트:
```
API server running at http://localhost:8080/api
```

Railway Networking 포트: **4000** (잘못됨)

## 권장 조치

**방법 1을 권장합니다** (Railway Networking 포트를 8080으로 변경):
- Railway가 자동으로 설정한 PORT 환경 변수를 그대로 사용
- 추가 설정 불필요
- 빠른 해결

## 확인

포트를 변경한 후:
1. 몇 분 대기 (변경사항 적용 시간)
2. `https://api.workbase-ai.com` 접속 테스트
3. 정상 작동 확인

