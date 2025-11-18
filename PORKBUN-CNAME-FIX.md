# Porkbun CNAME 레코드 추가 오류 해결

## 문제
- "ERROR: Could not add DNS record: Content for CNAME record is invalid"
- CNAME 레코드를 추가할 수 없음

## 해결 방법

### 1. 기존 레코드 확인 및 수정

Porkbun DNS 레코드 목록에서:

#### 수정할 레코드 1: www.workbase-ai.com
- **현재 값**: `notion-cloneweb-production.up.railway.app` (잘못됨)
- **올바른 값**: `cmidim2y.up.railway.app`
- **작업**: 기존 레코드 수정 (Edit 아이콘 클릭)

#### 추가할 레코드: api.workbase-ai.com
- **Type**: `CNAME`
- **Host**: `api` (또는 `api.workbase-ai.com` 전체가 아닌 `api`만)
- **Answer**: `b2jesa9o.up.railway.app`
- **TTL**: `600`

### 2. CNAME 추가 시 주의사항

**Host 필드 입력 방법:**
- ❌ 잘못된 입력: `api.workbase-ai.com` (전체 도메인)
- ✅ 올바른 입력: `api` (서브도메인만)

Porkbun은 자동으로 도메인을 추가하므로, Host 필드에는 서브도메인만 입력하면 됩니다.

### 3. 단계별 수정 방법

#### Step 1: www 레코드 수정
1. DNS 레코드 목록에서 `www.workbase-ai.com` 레코드 찾기
2. Edit 아이콘 클릭
3. Answer 값을 `cmidim2y.up.railway.app`로 변경
4. Save 클릭

#### Step 2: api 레코드 추가
1. "Add Record" 또는 "+" 버튼 클릭
2. Type: `CNAME` 선택
3. Host: `api` 입력 (`.workbase-ai.com` 제외)
4. Answer: `b2jesa9o.up.railway.app` 입력
5. TTL: `600` 입력
6. Add 클릭

### 4. 오류가 계속 발생하는 경우

**원인 1: Host 필드에 전체 도메인 입력**
- 해결: Host 필드에 `api`만 입력 (`.workbase-ai.com` 제외)

**원인 2: Answer 필드에 잘못된 형식**
- 해결: `b2jesa9o.up.railway.app` (마지막에 점 없이)

**원인 3: 기존 레코드와 충돌**
- 해결: `*.workbase-ai.com` 와일드카드 레코드가 있다면 삭제하거나 우선순위 확인

### 5. 최종 DNS 레코드 상태

설정이 완료되면:
```
Type    Host    Answer                      TTL
CNAME   api     b2jesa9o.up.railway.app    600
CNAME   www     cmidim2y.up.railway.app     600
```

## 확인

1. DNS 레코드 목록에서 두 레코드가 올바르게 표시되는지 확인
2. Railway에서 "Show setup issues" 다시 확인
3. 경고가 사라지면 완료

