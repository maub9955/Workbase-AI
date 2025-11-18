// Imweb 페이지에 삽입할 디버깅 및 개선된 JavaScript 코드
// 이 코드를 Imweb 페이지의 HTML 코드 삽입 섹션에 추가하세요

<script>
// 디버깅: 모든 쿠키 출력
function debugCookies() {
  console.log('=== 모든 쿠키 ===');
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    console.log(`${name}: ${value}`);
  });
}

// 디버깅: window 객체에서 Imweb 관련 속성 확인
function debugImwebObjects() {
  console.log('=== Imweb 관련 객체 확인 ===');
  console.log('window.Imweb:', window.Imweb);
  console.log('window.imweb:', window.imweb);
  console.log('window.IMWEB:', window.IMWEB);
  
  // window 객체의 모든 속성 중 'imweb' 포함하는 것 찾기
  for (let key in window) {
    if (key.toLowerCase().includes('imweb')) {
      console.log(`window.${key}:`, window[key]);
    }
  }
}

// Imweb 로그인한 사용자 정보 가져오기 (개선된 버전)
async function getImwebUser() {
  console.log('=== Imweb 사용자 정보 가져오기 시작 ===');
  
  // 디버깅 정보 출력
  debugCookies();
  debugImwebObjects();
  
  // 방법 1: Imweb JavaScript API 사용
  if (window.Imweb && window.Imweb.getUser) {
    console.log('방법 1 시도: window.Imweb.getUser()');
    try {
      const user = window.Imweb.getUser();
      if (user && user.isLoggedIn) {
        console.log('방법 1 성공:', user);
        return {
          email: user.email,
          name: user.name || user.nickname || user.username,
          id: user.id,
        };
      }
    } catch (error) {
      console.error('방법 1 오류:', error);
    }
  }

  // 방법 2: 쿠키에서 직접 정보 가져오기 (가장 확실한 방법)
  console.log('방법 2 시도: 쿠키에서 정보 가져오기');
  const cookies = document.cookie.split(';');
  let email = null;
  let name = null;
  
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    const decodedValue = decodeURIComponent(cookieValue || '');
    
    // 이메일 찾기 (다양한 쿠키 이름 시도)
    if (cookieName.toLowerCase().includes('email') || 
        cookieName.toLowerCase().includes('user') ||
        cookieName.toLowerCase().includes('mail')) {
      if (decodedValue.includes('@')) {
        email = decodedValue;
        console.log(`이메일 찾음 (${cookieName}):`, email);
      }
    }
    
    // 이름 찾기
    if (cookieName.toLowerCase().includes('name') || 
        cookieName.toLowerCase().includes('nickname') ||
        cookieName.toLowerCase().includes('username')) {
      name = decodedValue;
      console.log(`이름 찾음 (${cookieName}):`, name);
    }
  }
  
  if (email) {
    console.log('방법 2 성공: 쿠키에서 정보 가져옴');
    return {
      email: email,
      name: name || email.split('@')[0],
      id: null,
    };
  }

  // 방법 3: localStorage에서 정보 가져오기
  console.log('방법 3 시도: localStorage에서 정보 가져오기');
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.toLowerCase().includes('user') || 
                  key.toLowerCase().includes('email') ||
                  key.toLowerCase().includes('imweb'))) {
        const value = localStorage.getItem(key);
        console.log(`localStorage[${key}]:`, value);
        
        try {
          const parsed = JSON.parse(value);
          if (parsed.email || parsed.user_email) {
            return {
              email: parsed.email || parsed.user_email,
              name: parsed.name || parsed.user_name || parsed.nickname,
              id: parsed.id || parsed.user_id,
            };
          }
        } catch (e) {
          // JSON이 아닌 경우
          if (value && value.includes('@')) {
            return {
              email: value,
              name: value.split('@')[0],
              id: null,
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('방법 3 오류:', error);
  }

  // 방법 4: Imweb API 호출 (절대 URL만 사용, 상대 경로 제거)
  console.log('방법 4 시도: Imweb API 호출 (절대 URL만)');
  const currentDomain = window.location.origin;
  const apiEndpoints = [
    `${currentDomain}/api/user/me`,
    `${currentDomain}/api/v2/user`,
    'https://api.imweb.io/v2/user/me',
    'https://api.imweb.io/v1/user',
  ];
  
  for (const endpoint of apiEndpoints) {
    try {
      console.log(`시도 중: ${endpoint}`);
      const response = await fetch(endpoint, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const user = await response.json();
        console.log(`방법 4 성공 (${endpoint}):`, user);
        return {
          email: user.email || user.user_email,
          name: user.name || user.user_name || user.nickname,
          id: user.id || user.user_id,
        };
      } else {
        console.log(`방법 4 실패 (${endpoint}): ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`방법 4 오류 (${endpoint}):`, error.message);
    }
  }

  console.error('=== 모든 방법 실패: 사용자 정보를 가져올 수 없음 ===');
  return null;
}

// Imweb 로그인 후 Workbase-AI로 이동
async function redirectToWorkbaseAI() {
  console.log('=== Workbase-AI로 리다이렉트 시작 ===');
  
  let imwebUser = await getImwebUser();
  
  if (!imwebUser || !imwebUser.email) {
    console.log('자동으로 사용자 정보를 가져올 수 없습니다. 수동 입력을 요청합니다.');
    
    // 사용자 정보를 가져올 수 없는 경우, 수동 입력 받기
    const email = prompt('이메일을 입력해주세요:');
    if (!email || !email.includes('@')) {
      alert('올바른 이메일을 입력해주세요.');
      return;
    }
    
    const name = prompt('이름을 입력해주세요 (선택사항, 엔터로 건너뛰기):') || email.split('@')[0];
    
    imwebUser = {
      email: email,
      name: name,
      id: null,
    };
    
    console.log('수동 입력된 사용자 정보:', imwebUser);
  }

  console.log('사용자 정보:', imwebUser);

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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== Imweb 로그인 페이지 로드 완료 ===');
  
  // 디버깅 정보 출력
  debugCookies();
  debugImwebObjects();
  
  // 이미 로그인된 경우 확인
  setTimeout(async () => {
    const user = await getImwebUser();
    if (user) {
      console.log('이미 로그인된 사용자:', user);
    } else {
      console.log('로그인된 사용자를 찾을 수 없습니다.');
    }
  }, 1000);
});

// 수동으로 리다이렉트하는 버튼 추가
function addTestButton() {
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
  `;
  button.onmouseover = function() {
    this.style.transform = 'scale(1.05)';
  };
  button.onmouseout = function() {
    this.style.transform = 'scale(1)';
  };
  button.onclick = redirectToWorkbaseAI;
  document.body.appendChild(button);
  
  // 디버깅 버튼 추가
  const debugButton = document.createElement('button');
  debugButton.textContent = '디버깅 정보 보기 (콘솔 확인)';
  debugButton.style.cssText = `
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    margin: 10px;
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 5px;
  `;
  debugButton.onclick = function() {
    getImwebUser().then(user => {
      console.log('최종 사용자 정보:', user);
      alert(user ? `사용자 정보:\n이메일: ${user.email}\n이름: ${user.name}` : '사용자 정보를 찾을 수 없습니다.\n콘솔을 확인해주세요.');
    });
  };
  document.body.appendChild(debugButton);
}

// 테스트용 버튼 추가
addTestButton();
</script>

