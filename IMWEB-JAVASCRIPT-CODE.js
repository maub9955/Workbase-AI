// Imweb 페이지에 삽입할 JavaScript 코드
// 이 코드를 Imweb 페이지의 HTML 코드 삽입 섹션에 추가하세요

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

  // 방법 3: 쿠키에서 정보 가져오기
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    // Imweb이 사용하는 쿠키 이름 확인 필요
    if (name === 'imweb_user_email' || name === 'imweb_email') {
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
      const errorText = await response.text();
      console.error('API 오류:', errorText);
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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('Imweb 로그인 페이지 로드 완료');
  
  // Imweb 로그인 버튼 클릭 이벤트 리스너
  const loginButton = document.getElementById('imweb-login-button');
  if (loginButton) {
    loginButton.addEventListener('click', async function() {
      // Imweb 로그인 처리 후 콜백
      setTimeout(async () => {
        const user = await getImwebUser();
        if (user) {
          await redirectToWorkbaseAI();
        }
      }, 1000);
    });
  }

  // 이미 로그인된 경우 확인 (선택사항)
  setTimeout(async () => {
    const user = await getImwebUser();
    if (user) {
      console.log('이미 로그인된 사용자:', user);
      // 자동 리다이렉트를 원하면 아래 주석 해제
      // await redirectToWorkbaseAI();
    }
  }, 2000);
});

// Imweb 로그인 성공 이벤트 리스너 (Imweb이 이벤트를 제공하는 경우)
window.addEventListener('imweb:login:success', async function(event) {
  console.log('Imweb 로그인 성공 이벤트:', event);
  await redirectToWorkbaseAI();
});

// 수동으로 리다이렉트하는 버튼 (테스트용)
function addManualRedirectButton() {
  const button = document.createElement('button');
  button.textContent = 'Workbase-AI로 이동';
  button.style.cssText = 'padding: 10px 20px; font-size: 16px; cursor: pointer; margin: 20px;';
  button.onclick = redirectToWorkbaseAI;
  document.body.appendChild(button);
}

// 테스트용 버튼 추가 (개발 중에만 사용)
// addManualRedirectButton();
</script>

