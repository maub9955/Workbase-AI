# Imweb 로그인 연동 가이드

## 통합 방법 옵션

### 방법 1: Imweb 로그인 후 리다이렉트 (권장)

**구조**:
- **Imweb**: 로그인 페이지만 (빈 페이지 + Imweb 로그인 위젯)
- **현재 웹앱**: Render에서 계속 호스팅 (workbase-web)
- **흐름**: Imweb 로그인 → 토큰 받기 → 현재 웹앱으로 리다이렉트

**장점**:
- Imweb 로그인 시스템 완전 활용
- 현재 웹앱 코드 최소 변경
- 유지보수 용이

### 방법 2: Imweb 페이지에 iframe 임베드

**구조**:
- **Imweb**: 메인 페이지 (현재 웹앱을 iframe으로 표시)
- **현재 웹앱**: Render에서 호스팅
- **로그인**: Imweb에서 처리, 토큰을 iframe으로 전달

**장점**:
- 하나의 도메인에서 모든 것 관리
- Imweb의 다른 기능 활용 가능

**단점**:
- iframe 통신 복잡
- 모바일 반응형 이슈 가능

### 방법 3: Imweb에 HTML/JS 코드 직접 삽입

**구조**:
- **Imweb**: 빈 페이지에 현재 웹앱의 HTML/JS 코드 삽입
- **문제**: Next.js는 서버 사이드 렌더링이므로 직접 삽입 어려움

**단점**:
- Next.js 앱을 정적 HTML로 변환 어려움
- 기능 제한적

## 추천: 방법 1 (리다이렉트 방식)

### 1단계: Imweb 빈 페이지 만들기

1. Imweb 관리자 페이지 접속
2. 새 페이지 생성 (예: `/login`)
3. 페이지를 빈 상태로 유지

### 2단계: Imweb 로그인 위젯 추가

Imweb에서 제공하는 로그인 위젯을 페이지에 추가:

1. **위젯 추가**:
   - Imweb 관리자 → 페이지 편집
   - 로그인 위젯 추가
   - 또는 커스텀 HTML 코드 삽입

2. **로그인 성공 후 처리**:
   - JavaScript로 로그인 성공 감지
   - 토큰 받기
   - 현재 웹앱으로 리다이렉트

### 3단계: Imweb 페이지에 JavaScript 코드 추가

Imweb 페이지 편집 모드에서 **HTML 코드 삽입** 또는 **커스텀 스크립트** 섹션에 다음 코드 추가:

```html
<script>
// Imweb 로그인 성공 후 처리
function handleImwebLogin() {
  // Imweb에서 로그인 토큰 받기 (Imweb API 사용)
  const imwebToken = getImwebToken(); // Imweb API 호출
  
  // 현재 웹앱으로 리다이렉트 (토큰 포함)
  const webAppUrl = 'https://www.workbase-ai.com';
  window.location.href = `${webAppUrl}/auth/callback?token=${imwebToken}`;
}

// Imweb 로그인 위젯 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
  // Imweb 로그인 성공 이벤트 감지
  // (Imweb 문서에 따라 이벤트 이름이 다를 수 있음)
  window.addEventListener('imweb:login:success', handleImwebLogin);
});
</script>
```

### 4단계: 현재 웹앱에 인증 콜백 페이지 추가

현재 웹앱에 Imweb 토큰을 받아서 처리하는 페이지 추가:

**파일**: `apps/web/src/app/auth/callback/page.tsx`

```typescript
'use client';

import { useEffect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Imweb 토큰을 API로 전달하여 검증
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/imweb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('token', data.token);
            // 워크스페이스로 리다이렉트
            router.push('/workspace');
          }
        })
        .catch((error) => {
          console.error('인증 실패:', error);
          router.push('/');
        });
    } else {
      router.push('/');
    }
  }, [token, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}
```

### 5단계: 백엔드에 Imweb 인증 엔드포인트 추가

**파일**: `apps/api/src/modules/auth/auth.controller.ts`

```typescript
@Post('imweb')
async imwebLogin(@Body() payload: { token: string }) {
  return this.authService.imwebLogin(payload.token);
}
```

**파일**: `apps/api/src/modules/auth/auth.service.ts`

```typescript
async imwebLogin(imwebToken: string) {
  // Imweb API로 토큰 검증 및 사용자 정보 가져오기
  const imwebUser = await this.verifyImwebToken(imwebToken);
  
  // 데이터베이스에서 사용자 찾기 또는 생성
  let user = await db.findUserByEmail(imwebUser.email);
  
  if (!user) {
    // 새 사용자 생성
    user = await db.createUser({
      email: imwebUser.email,
      name: imwebUser.name,
      password: randomUUID(), // Imweb 로그인이므로 비밀번호 불필요
    });
  }
  
  // 세션 토큰 생성
  const token = randomUUID();
  this.sessions.set(token, user.id);
  
  return {
    token,
    user: this.serializeUser(user),
  };
}

private async verifyImwebToken(token: string) {
  // Imweb API 호출하여 토큰 검증
  // Imweb 개발자 문서에 따라 구현
  const response = await fetch('https://api.imweb.io/v2/auth/verify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new UnauthorizedException('유효하지 않은 Imweb 토큰입니다.');
  }
  
  return response.json();
}
```

## Imweb 페이지 설정

### Imweb 관리자에서 할 일

1. **페이지 생성**:
   - 페이지 이름: `로그인` 또는 `Login`
   - URL: `/login`

2. **로그인 위젯 추가**:
   - Imweb 위젯 라이브러리에서 로그인 위젯 선택
   - 또는 커스텀 HTML 코드 삽입

3. **JavaScript 코드 추가**:
   - 페이지 편집 → HTML 코드 삽입
   - 위의 JavaScript 코드 추가

4. **리다이렉트 URL 설정**:
   - 로그인 성공 후: `https://www.workbase-ai.com/auth/callback`

## 현재 웹앱 수정 사항

1. ✅ 인증 콜백 페이지 추가 (`/auth/callback`)
2. ✅ 백엔드 Imweb 인증 엔드포인트 추가
3. ✅ 로그인 페이지 수정 (선택사항: Imweb으로 리다이렉트)

## 테스트 체크리스트

- [ ] Imweb 로그인 페이지 접속
- [ ] Imweb 로그인 성공
- [ ] 토큰이 웹앱으로 전달되는지 확인
- [ ] 워크스페이스 페이지 접속 확인
- [ ] API 호출 시 인증 토큰 전달 확인

## 참고사항

- Imweb API 문서를 확인하여 정확한 엔드포인트 사용
- CORS 설정 확인 (Imweb → 현재 웹앱)
- 보안: 토큰을 URL에 포함하지 않고 POST로 전달하는 것이 더 안전

