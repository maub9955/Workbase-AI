# Imweb 로그인 연동 - 다음 단계

## 현재 상태

✅ Imweb 빈 페이지 생성 완료
✅ Imweb 회원가입/로그인 완료
✅ HTML 코드 홈화면에 붙여넣기 완료

## 다음 단계: Imweb 로그인 연동 완성

### 1단계: Imweb 로그인 상태 확인

Imweb에서 로그인한 사용자 정보를 가져오는 방법을 확인해야 합니다.

**방법 A: Imweb JavaScript API 사용**

Imweb이 제공하는 JavaScript API를 사용하여 로그인한 사용자 정보 가져오기:

```javascript
// Imweb 로그인 상태 확인
function checkImwebLogin() {
  // Imweb이 제공하는 API 확인 필요
  // 예시 (실제 API는 Imweb 문서 확인):
  if (window.Imweb && window.Imweb.getUser) {
    const user = window.Imweb.getUser();
    if (user && user.isLoggedIn) {
      // 로그인된 사용자 정보
      return user;
    }
  }
  return null;
}
```

**방법 B: Imweb 세션/쿠키 확인**

Imweb이 세션이나 쿠키에 사용자 정보를 저장하는 경우:

```javascript
// 쿠키에서 사용자 정보 확인
function getImwebUserFromCookie() {
  // Imweb이 사용하는 쿠키 이름 확인 필요
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    // Imweb 사용자 정보 쿠키 찾기
    if (name === 'imweb_user' || name === 'imweb_token') {
      return JSON.parse(decodeURIComponent(value));
    }
  }
  return null;
}
```

**방법 C: Imweb API 직접 호출**

Imweb API를 직접 호출하여 현재 로그인한 사용자 정보 가져오기:

```javascript
async function getImwebUserInfo() {
  try {
    // Imweb API 엔드포인트 확인 필요
    const response = await fetch('https://api.imweb.io/v2/user/me', {
      credentials: 'include', // 쿠키 포함
    });
    
    if (response.ok) {
      const user = await response.json();
      return user;
    }
  } catch (error) {
    console.error('Imweb 사용자 정보 가져오기 실패:', error);
  }
  return null;
}
```

### 2단계: 수정된 JavaScript 코드

Imweb 페이지의 HTML 코드에서 JavaScript 부분을 다음으로 교체하세요:

```html
<script>
// Imweb 로그인한 사용자 정보 가져오기
async function getImwebUser() {
  // 방법 1: Imweb JavaScript API 사용
  if (window.Imweb && window.Imweb.getUser) {
    const user = window.Imweb.getUser();
    if (user && user.isLoggedIn) {
      return {
        email: user.email,
        name: user.name || user.nickname,
        id: user.id,
      };
    }
  }

  // 방법 2: Imweb API 호출
  try {
    const response = await fetch('https://api.imweb.io/v2/user/me', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const user = await response.json();
      return {
        email: user.email,
        name: user.name || user.nickname,
        id: user.id,
      };
    }
  } catch (error) {
    console.error('Imweb API 호출 실패:', error);
  }

  // 방법 3: 쿠키에서 정보 가져오기 (Imweb이 쿠키를 사용하는 경우)
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'imweb_user_email') {
      return {
        email: decodeURIComponent(value),
        name: '', // 쿠키에서 이름 가져오기 또는 API 호출
      };
    }
  }

  return null;
}

// Imweb 로그인 후 Workbase-AI로 이동
async function redirectToWorkbaseAI() {
  const imwebUser = await getImwebUser();
  
  if (!imwebUser || !imwebUser.email) {
    alert('로그인 정보를 가져올 수 없습니다. 다시 로그인해주세요.');
    return;
  }

  // 사용자 정보를 Workbase-AI API로 전달
  try {
    const response = await fetch('https://api.workbase-ai.com/api/auth/imweb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: imwebUser.email,
        name: imwebUser.name || imwebUser.email.split('@')[0],
        imwebId: imwebUser.id,
      }),
    });

    if (!response.ok) {
      throw new Error('인증 실패');
    }

    const data = await response.json();
    
    if (data.token && data.user) {
      // Workbase-AI로 리다이렉트 (토큰 포함)
      const webAppUrl = 'https://www.workbase-ai.com';
      window.location.href = `${webAppUrl}/auth/callback?token=${encodeURIComponent(data.token)}`;
    } else {
      throw new Error('토큰을 받을 수 없습니다.');
    }
  } catch (error) {
    console.error('Workbase-AI 인증 실패:', error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
  }
}

// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', function() {
  // Imweb 로그인 버튼 클릭 이벤트 리스너
  const loginButton = document.getElementById('imweb-login-button');
  if (loginButton) {
    loginButton.addEventListener('click', async function() {
      // Imweb 로그인 처리 (Imweb이 자동으로 처리)
      // 로그인 성공 후 콜백
      setTimeout(async () => {
        const user = await getImwebUser();
        if (user) {
          await redirectToWorkbaseAI();
        }
      }, 1000); // 로그인 처리 대기
    });
  }

  // 이미 로그인된 경우 자동으로 리다이렉트
  setTimeout(async () => {
    const user = await getImwebUser();
    if (user) {
      // 자동 리다이렉트 옵션 (선택사항)
      // await redirectToWorkbaseAI();
    }
  }, 2000);
});

// Imweb 로그인 성공 이벤트 리스너 (Imweb이 이벤트를 제공하는 경우)
window.addEventListener('imweb:login:success', async function(event) {
  await redirectToWorkbaseAI();
});
</script>
```

### 3단계: 백엔드 수정

Imweb에서 직접 토큰을 받는 대신, 사용자 정보(email, name)를 받아서 처리하도록 수정:

**파일**: `apps/api/src/modules/auth/auth.service.ts`

```typescript
async imwebLogin(payload: { email: string; name: string; imwebId?: string }) {
  try {
    // 데이터베이스에서 사용자 찾기 또는 생성
    let user = db.findUserByEmail(payload.email);

    if (!user) {
      // 새 사용자 생성
      const { user: newUser } = db.createUser({
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        password: randomUUID(), // Imweb 로그인이므로 비밀번호 불필요
      });
      user = newUser;
    }

    // 세션 토큰 생성
    const token = randomUUID();
    this.sessions.set(token, user.id);

    return {
      token,
      user: this.serializeUser(user),
    };
  } catch (error) {
    console.error('Imweb 로그인 오류:', error);
    throw new UnauthorizedException('Imweb 로그인에 실패했습니다.');
  }
}
```

**파일**: `apps/api/src/modules/auth/auth.controller.ts`

```typescript
@Post("imweb")
async imwebLogin(@Body() payload: { email: string; name: string; imwebId?: string }) {
  return this.authService.imwebLogin(payload);
}
```

### 4단계: 테스트

1. **Imweb 페이지에서 로그인**
2. **브라우저 개발자 도구 열기** (F12)
3. **Console 탭에서 확인**:
   - `getImwebUser()` 함수가 사용자 정보를 가져오는지 확인
   - 오류 메시지 확인
4. **Network 탭에서 확인**:
   - `/api/auth/imweb` API 호출이 성공하는지 확인
5. **Workbase-AI로 리다이렉트되는지 확인**

## 문제 해결

### 사용자 정보를 가져올 수 없는 경우

1. **Imweb 개발자 문서 확인**: 정확한 API 엔드포인트 확인
2. **브라우저 콘솔 확인**: JavaScript 오류 확인
3. **쿠키 확인**: Imweb이 사용하는 쿠키 이름 확인

### API 호출이 실패하는 경우

1. **CORS 오류 확인**: Render API 서버의 CORS 설정 확인
2. **네트워크 오류 확인**: 브라우저 Network 탭에서 확인
3. **API 엔드포인트 확인**: `https://api.workbase-ai.com/api/auth/imweb` 접근 가능한지 확인

## 다음 단계

1. 위의 JavaScript 코드를 Imweb 페이지에 추가
2. 백엔드 코드 수정 (이미 완료된 경우 스킵)
3. 테스트
4. 문제가 있으면 브라우저 콘솔 오류 메시지 확인 후 알려주세요

