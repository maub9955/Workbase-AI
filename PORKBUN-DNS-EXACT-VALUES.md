# Porkbun DNS 설정 - 정확한 값

## Railway가 제공한 CNAME 값

Railway 커스텀 도메인 설정 시 제공된 정확한 CNAME 값:

- **API 서버**: `b2jesa9o.up.railway.app`
- **Web 서버**: `cmidim2y.up.railway.app`

## Porkbun DNS 레코드 설정

### 레코드 1: API 서버 (`api.workbase-ai.com`)

1. Porkbun 대시보드 → **workbase-ai.com** 선택
2. **DNS Records** 섹션으로 이동
3. **Add** 또는 **Add Record** 클릭
4. 다음 정보 입력:
   ```
   Type: CNAME
   Host: api
   Answer: b2jesa9o.up.railway.app
   TTL: 600 (또는 기본값)
   ```
5. **Add** 또는 **Save** 클릭

### 레코드 2: Web 서버 (`www.workbase-ai.com`)

1. **DNS Records** 섹션에서 다시 **Add** 버튼 클릭
2. 다음 정보 입력:
   ```
   Type: CNAME
   Host: www
   Answer: cmidim2y.up.railway.app
   TTL: 600 (또는 기본값)
   ```
3. **Add** 또는 **Save** 클릭

## 중요 사항

⚠️ **기존에 잘못된 값이 있다면 삭제하고 다시 추가하세요!**

- API에 `uixie.porkbun.com` 같은 잘못된 값이 있다면 삭제
- Web에 `notion-cloneweb-production.up.railway.app` 같은 값이 있다면 삭제
- Railway가 제공한 정확한 값만 사용: `b2jesa9o.up.railway.app`, `cmidim2y.up.railway.app`

## 확인

DNS 레코드가 올바르게 추가되면:
```
Type    Host    Answer                      TTL
CNAME   api     b2jesa9o.up.railway.app    600
CNAME   www     cmidim2y.up.railway.app    600
```

## 다음 단계

1. Railway 빌드 완료 대기 (현재 진행 중)
2. Porkbun DNS 레코드 추가 (위 값 사용)
3. DNS 전파 대기 (5-30분)
4. Railway에서 도메인 상태 확인 (Active가 될 때까지)
5. 환경 변수 설정
6. 접속 테스트

