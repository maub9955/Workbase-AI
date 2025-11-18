# Render 루트 도메인 설정 가이드

## 현재 상태
- ✅ `www.workbase-ai.com` → `workbase-web.onrender.com` (올바르게 설정됨)
- ❌ `workbase-ai.com` (루트 도메인) DNS 설정 필요

## 해결 방법

### 방법 1: ALIAS 레코드 사용 (권장)

Porkbun에서 ALIAS 레코드를 지원하는 경우:

1. Porkbun DNS 관리 페이지로 이동
2. **Add Record** 또는 **+** 버튼 클릭
3. 설정:
   - **Type**: `ALIAS` 선택
   - **Host**: `workbase-ai.com` (또는 빈 값 - 루트 도메인)
   - **Answer**: `workbase-web.onrender.com`
   - **TTL**: `600`
4. **Add** 클릭

### 방법 2: A 레코드 사용

ALIAS를 지원하지 않는 경우:

1. Porkbun DNS 관리 페이지로 이동
2. **Add Record** 또는 **+** 버튼 클릭
3. 설정:
   - **Type**: `A` 선택
   - **Host**: `workbase-ai.com` (또는 빈 값 - 루트 도메인)
   - **Answer**: `216.24.57.1` (Render가 제공한 IP 주소)
   - **TTL**: `600`
4. **Add** 클릭

### 방법 3: 기존 ALIAS 레코드 수정

현재 DNS 레코드 목록에 `workbase-ai.com` ALIAS 레코드가 있습니다:

1. `workbase-ai.com` ALIAS 레코드 찾기
2. **Edit** 아이콘 클릭
3. **Answer** 값을 `workbase-web.onrender.com`으로 변경
4. **Save** 클릭

## 중요 사항

### Host 필드 입력 방법:
- ❌ 잘못된 입력: `workbase-web.onrender.com` (전체 도메인)
- ✅ 올바른 입력: 빈 값 또는 `workbase-ai.com` (루트 도메인만)

Porkbun은 루트 도메인 레코드를 추가할 때 Host 필드를 빈 값으로 두거나 도메인 이름만 입력합니다.

## 확인 체크리스트

- [ ] `workbase-ai.com` ALIAS 또는 A 레코드 추가/수정
- [ ] Render에서 "Verify" 버튼 클릭
- [ ] "Domain Verified" 상태 확인
- [ ] SSL 인증서 발급 대기

## 다음 단계

1. Porkbun에서 루트 도메인 레코드 추가/수정
2. Render에서 "Verify" 버튼 클릭
3. "Domain Verified" 상태 확인
4. SSL 인증서 발급 대기 (몇 분)

