# Imweb 페이지에 삽입할 HTML/JavaScript 코드

## Imweb 빈 페이지 설정

### 1단계: Imweb 페이지 생성

1. Imweb 관리자 페이지 접속
2. **페이지 관리** → **새 페이지 만들기**
3. 페이지 이름: `로그인` 또는 `Login`
4. URL: `/login` (또는 원하는 경로)

### 2단계: HTML 코드 삽입

Imweb 페이지 편집 모드에서 **HTML 코드 삽입** 또는 **커스텀 스크립트** 섹션에 다음 코드를 추가하세요:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workbase-AI 로그인</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .login-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
    .imweb-login-widget {
      /* Imweb 로그인 위젯이 여기에 표시됩니다 */
      margin-bottom: 1rem;
    }
    .info {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h1>Workbase-AI 로그인</h1>
    
    <!-- Imweb 로그인 위젯을 여기에 추가하세요 -->
    <div class="imweb-login-widget" id="imweb-login-widget">
      <!-- Imweb에서 제공하는 로그인 위젯 코드를 여기에 삽입 -->
    </div>
    
    <div class="info">
      로그인 후 Workbase-AI로 이동합니다.
    </div>
  </div>

  <script>
    // Imweb 로그인 성공 후 처리
    function handleImwebLoginSuccess(imwebToken) {
      if (!imwebToken) {
        console.error('Imweb 토큰을 받을 수 없습니다.');
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      // 현재 웹앱으로 리다이렉트 (토큰 포함)
      const webAppUrl = 'https://www.workbase-ai.com';
      window.location.href = `${webAppUrl}/auth/callback?token=${encodeURIComponent(imwebToken)}`;
    }

    // Imweb 로그인 위젯 이벤트 리스너
    document.addEventListener('DOMContentLoaded', function() {
      // 방법 1: Imweb 로그인 성공 이벤트 감지
      // (Imweb 문서에 따라 이벤트 이름이 다를 수 있음)
      window.addEventListener('imweb:login:success', function(event) {
        const token = event.detail?.token || event.token;
        handleImwebLoginSuccess(token);
      });

      // 방법 2: Imweb 로그인 위젯 콜백 함수
      // Imweb 위젯이 window 객체에 콜백을 등록하는 경우
      if (window.ImwebLoginCallback) {
        window.ImwebLoginCallback = function(token) {
          handleImwebLoginSuccess(token);
        };
      }

      // 방법 3: Imweb API 직접 호출 (Imweb 개발자 문서 확인 필요)
      // 예시:
      // const imwebApi = new ImwebAPI();
      // imwebApi.onLoginSuccess(function(token) {
      //   handleImwebLoginSuccess(token);
      // });
    });

    // Imweb 로그인 위젯이 로드된 후 실행
    window.addEventListener('load', function() {
      // Imweb 로그인 위젯이 자동으로 이벤트를 발생시키는 경우
      // 또는 위젯의 콜백 함수를 설정
      console.log('Imweb 로그인 페이지 로드 완료');
    });
  </script>

  <!-- Imweb 로그인 위젯 스크립트 (Imweb에서 제공하는 스크립트) -->
  <!-- 예시: <script src="https://widget.imweb.io/login.js"></script> -->
</body>
</html>
```

## Imweb 로그인 위젯 추가 방법

### 방법 A: Imweb 위젯 라이브러리 사용

1. Imweb 관리자 → **위젯** → **로그인 위젯** 선택
2. 위젯을 페이지에 추가
3. 위젯 설정에서 **콜백 URL** 설정:
   - `https://www.workbase-ai.com/auth/callback`

### 방법 B: Imweb API 직접 사용

Imweb 개발자 문서를 확인하여 로그인 API를 직접 호출:

```javascript
// 예시 (실제 API는 Imweb 문서 확인 필요)
async function loginWithImweb(email, password) {
  const response = await fetch('https://api.imweb.io/v2/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (data.token) {
    handleImwebLoginSuccess(data.token);
  }
}
```

## 테스트

1. Imweb 페이지에서 로그인 시도
2. 로그인 성공 후 `https://www.workbase-ai.com/auth/callback?token=...`로 리다이렉트되는지 확인
3. 워크스페이스 페이지로 자동 이동하는지 확인

## 문제 해결

### 리다이렉트가 안 되는 경우

1. **JavaScript 콘솔 확인**: 브라우저 개발자 도구에서 오류 확인
2. **이벤트 이름 확인**: Imweb 문서에서 정확한 이벤트 이름 확인
3. **토큰 확인**: `handleImwebLoginSuccess` 함수에서 토큰이 제대로 전달되는지 확인

### CORS 오류가 발생하는 경우

1. Render API 서버의 CORS 설정 확인
2. Imweb 도메인을 허용된 Origin에 추가

## 참고사항

- **Imweb 개발자 문서 필수 확인**: 실제 API 엔드포인트와 이벤트 이름은 Imweb 문서를 참고하세요
- **보안**: 토큰을 URL에 포함하는 것보다 POST로 전달하는 것이 더 안전합니다 (추후 개선 가능)
- **테스트**: 먼저 로컬 환경에서 테스트한 후 프로덕션에 배포하세요

