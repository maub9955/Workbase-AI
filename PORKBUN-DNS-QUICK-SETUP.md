# Porkbun DNS 빠른 설정 가이드 (workbase-ai.com)

## Nameserver 확인
도메인 `workbase-ai.com`의 nameserver가 다음으로 설정되어 있습니다:
- `curitiba.ns.porkbun.com`
- `fortaleza.ns.porkbun.com`
- `maceio.ns.porkbun.com`
- `salvador.ns.porkbun.com`

✅ 이미 설정되어 있으므로 바로 DNS 레코드만 추가하면 됩니다.

## Porkbun DNS 레코드 설정

### 1. Porkbun 대시보드 접속
1. https://porkbun.com 접속
2. 로그인
3. "Account" → "Your Domains" 클릭
4. `workbase-ai.com` 도메인 선택
5. "DNS Records" 섹션으로 이동

### 2. API 서버용 CNAME 레코드 추가

**레코드 1: api.workbase-ai.com**

1. "Add" 또는 "Add Record" 클릭
2. 다음 설정 입력:
   ```
   Type: CNAME
   Host: api
   Answer: [Railway API 서비스 도메인]
           예: workbase-api-production.up.railway.app
   TTL: 600
   ```
3. "Add" 클릭

⚠️ **중요**: `Answer` 필드에 Railway에서 생성한 실제 API 서비스 도메인을 입력하세요!

### 3. Web 서버용 CNAME 레코드 추가

**레코드 2: www.workbase-ai.com**

1. "Add" 또는 "Add Record" 클릭
2. 다음 설정 입력:
   ```
   Type: CNAME
   Host: www
   Answer: [Railway Web 서비스 도메인]
           예: workbase-web-production.up.railway.app
   TTL: 600
   ```
3. "Add" 클릭

⚠️ **중요**: `Answer` 필드에 Railway에서 생성한 실제 Web 서비스 도메인을 입력하세요!

### 4. 루트 도메인 (선택사항)

**레코드 3: workbase-ai.com (루트)**

일부 DNS 제공자는 루트 도메인에 CNAME을 허용하지 않습니다. Porkbun이 허용하는지 확인하세요.

1. "Add" 또는 "Add Record" 클릭
2. 다음 설정 입력:
   ```
   Type: CNAME
   Host: @ (또는 빈 값, Porkbun에 따라 다를 수 있음)
   Answer: [Railway Web 서비스 도메인]
           예: workbase-web-production.up.railway.app
   TTL: 600
   ```
3. "Add" 클릭

**참고**: CNAME이 허용되지 않으면 이 레코드는 건너뛰고 `www.workbase-ai.com`만 사용하세요.

## 최종 DNS 레코드 요약

설정이 완료되면 다음과 같은 레코드가 있어야 합니다:

```
Type    Host    Answer                                    TTL
CNAME   api     workbase-api-production.up.railway.app    600
CNAME   www     workbase-web-production.up.railway.app    600
CNAME   @       workbase-web-production.up.railway.app    600 (선택사항)
```

## 다음 단계

DNS 레코드를 추가한 후:
1. Railway에서 커스텀 도메인 추가 (3단계 참조)
2. DNS 전파 대기 (5-30분)
3. SSL 인증서 자동 발급 확인
4. 환경 변수 업데이트

## DNS 전파 확인

설정 후 몇 분 후에 확인:
```bash
nslookup api.workbase-ai.com
nslookup www.workbase-ai.com
```

또는 온라인 도구:
- https://dnschecker.org
- 도메인 입력: `api.workbase-ai.com`, `www.workbase-ai.com`

