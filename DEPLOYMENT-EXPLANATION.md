# 배포 구조 설명

## 왜 GitHub에서 직접 호스팅이 안 되나요?

### GitHub의 한계
- **GitHub Pages**: 정적 사이트(HTML, CSS, JavaScript)만 호스팅 가능
- **Node.js 앱**: 서버가 필요한 동적 애플리케이션은 호스팅 불가
- 이 프로젝트는:
  - NestJS 백엔드 API 서버 (Node.js 필요)
  - Next.js 프론트엔드 (서버 사이드 렌더링 필요)
  - 데이터베이스 (파일 기반이지만 서버 필요)

### Porkbun의 역할
- **도메인 등록 및 DNS 관리**만 제공
- 호스팅 서비스가 아님
- DNS 레코드만 설정하면 됨

## 현재 설정 상태

### ✅ 이미 연동되어 있는 것들

1. **GitHub ↔ Railway 자동 배포**
   - GitHub에 푸시하면 Railway가 자동으로 배포
   - 이미 설정되어 있음!

2. **Railway ↔ Porkbun DNS 연결**
   - Porkbun에서 CNAME 레코드만 설정하면 됨
   - 추가 연동 작업 불필요

### 🔧 해야 할 일

1. **Porkbun DNS 레코드 설정** (한 번만)
   - `api.workbase-ai.com` → Railway API 도메인
   - `www.workbase-ai.com` → Railway Web 도메인

2. **Railway 커스텀 도메인 추가** (한 번만)
   - Railway에서 `api.workbase-ai.com` 추가
   - Railway에서 `www.workbase-ai.com` 추가

3. **환경 변수 설정** (한 번만)
   - API 서버: `FRONTEND_URL=https://www.workbase-ai.com`
   - Web 서버: `NEXT_PUBLIC_API_URL=https://api.workbase-ai.com/api`

## 배포 흐름

```
GitHub (코드 저장소)
    ↓ (자동 배포)
Railway (호스팅)
    ↓ (DNS 연결)
Porkbun (도메인 관리)
    ↓
workbase-ai.com (최종 도메인)
```

## 더 간단한 방법이 있나요?

### 옵션 1: Railway 자동 도메인 사용 (가장 간단)
- Railway가 생성한 도메인 그대로 사용
- `workbase-api-production.up.railway.app`
- `workbase-web-production.up.railway.app`
- **장점**: DNS 설정 불필요
- **단점**: 도메인이 길고 기억하기 어려움

### 옵션 2: 커스텀 도메인 사용 (현재 방법)
- `api.workbase-ai.com`
- `www.workbase-ai.com`
- **장점**: 짧고 기억하기 쉬운 도메인
- **단점**: DNS 설정 필요 (하지만 한 번만 하면 됨)

## 결론

- GitHub에서 직접 호스팅: **불가능** (Node.js 앱이므로)
- GitHub ↔ Railway 연동: **이미 완료됨** ✅
- Porkbun DNS 설정: **한 번만 하면 됨** (약 5분 소요)

현재 구조가 가장 적합합니다. Porkbun DNS 설정만 하면 모든 것이 자동으로 작동합니다!

