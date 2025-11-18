// Imweb 페이지에 삽입할 간단한 JavaScript 코드
// 이 코드는 사용자 정보를 자동으로 가져오지 못하면 수동 입력을 받습니다

<script>
// Imweb 로그인 후 Workbase-AI로 이동 (간단한 버전)
async function redirectToWorkbaseAI() {
  console.log('=== Workbase-AI로 리다이렉트 시작 ===');
  
  // 먼저 쿠키에서 이메일 찾기 시도
  let email = null;
  let name = null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    const decodedValue = decodeURIComponent(cookieValue || '');
    
    // 이메일이 포함된 쿠키 찾기
    if (decodedValue.includes('@')) {
      email = decodedValue;
      console.log(`이메일 찾음 (${cookieName}):`, email);
    }
    
    // 이름 찾기
    if (cookieName.toLowerCase().includes('name') && decodedValue && !decodedValue.includes('@')) {
      name = decodedValue;
      console.log(`이름 찾음 (${cookieName}):`, name);
    }
  }
  
  // 이메일을 찾지 못했으면 수동 입력 받기
  if (!email) {
    email = prompt('이메일을 입력해주세요:');
    if (!email || !email.includes('@')) {
      alert('올바른 이메일을 입력해주세요.');
      return;
    }
  }
  
  // 이름이 없으면 수동 입력 받기
  if (!name) {
    name = prompt('이름을 입력해주세요 (선택사항, 엔터로 건너뛰기):') || email.split('@')[0];
  }
  
  console.log('사용자 정보:', { email, name });

  // 사용자 정보를 Workbase-AI API로 전달
  try {
    const response = await fetch('https://api.workbase-ai.com/api/auth/imweb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 오류:', errorText);
      throw new Error(`인증 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('API 응답:', data);
    
    if (data.token && data.user) {
      // Workbase-AI로 리다이렉트
      const webAppUrl = 'https://www.workbase-ai.com';
      window.location.href = `${webAppUrl}/auth/callback?token=${encodeURIComponent(data.token)}`;
    } else {
      throw new Error('토큰을 받을 수 없습니다.');
    }
  } catch (error) {
    console.error('Workbase-AI 인증 실패:', error);
    alert(`로그인에 실패했습니다: ${error.message}\n\n브라우저 콘솔(F12)을 확인해주세요.`);
  }
}

// 페이지 로드 시 버튼 추가
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== Imweb 로그인 페이지 로드 완료 ===');
  
  // "Workbase-AI로 이동" 버튼 추가
  const button = document.createElement('button');
  button.textContent = 'Workbase-AI로 이동';
  button.style.cssText = `
    padding: 15px 30px;
    font-size: 18px;
    cursor: pointer;
    margin: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: transform 0.2s;
    display: block;
    margin: 20px auto;
  `;
  button.onmouseover = function() {
    this.style.transform = 'scale(1.05)';
  };
  button.onmouseout = function() {
    this.style.transform = 'scale(1)';
  };
  button.onclick = redirectToWorkbaseAI;
  document.body.appendChild(button);
  
  // 디버깅: 모든 쿠키 출력
  console.log('=== 모든 쿠키 ===');
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    console.log(`${name}: ${value ? value.substring(0, 50) : '(empty)'}`);
  });
});
</script>

