# Imweb 로그인 정보 가져오기 문제 해결

## 문제 상황

"로그인 정보를 가져올 수 없습니다. 다시 로그인해주세요." 오류 발생

## 원인

Imweb에서 사용자 정보를 가져오는 방법을 찾지 못하고 있습니다.

## 해결 방법

### 방법 1: 디버깅 코드 사용 (권장)

`IMWEB-DEBUG-CODE.js` 파일의 코드를 Imweb 페이지에 추가하세요. 이 코드는:

1. **모든 쿠키 확인**: Imweb이 사용하는 쿠키 이름 찾기
2. **window 객체 확인**: Imweb JavaScript API 확인
3. **localStorage 확인**: 저장된 사용자 정보 확인
4. **여러 API 엔드포인트 시도**: 다양한 방법으로 사용자 정보 가져오기
5. **수동 입력 옵션**: 정보를 가져올 수 없으면 사용자가 직접 입력

### 방법 2: 브라우저 콘솔에서 직접 확인

1. **Imweb 페이지에서 F12** 눌러서 개발자 도구 열기
2. **Console 탭** 클릭
3. 다음 코드를 콘솔에 붙여넣고 실행:

```javascript
// 모든 쿠키 확인
console.log('=== 쿠키 ===');
document.cookie.split(';').forEach(c => console.log(c.trim()));

// localStorage 확인
console.log('=== localStorage ===');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, ':', localStorage.getItem(key));
}

// window 객체에서 Imweb 관련 찾기
console.log('=== Imweb 객체 ===');
for (let key in window) {
  if (key.toLowerCase().includes('imweb')) {
    console.log(key, ':', window[key]);
  }
}
```

4. **결과 확인**: 어떤 쿠키나 localStorage에 사용자 정보가 있는지 확인
5. **결과를 알려주세요**: 어떤 값이 보이는지 알려주시면 코드를 수정하겠습니다

### 방법 3: 수동 입력 방식 (임시 해결책)

사용자가 직접 이메일을 입력하도록 하는 방식:

```javascript
async function redirectToWorkbaseAI() {
  // 사용자 정보를 가져올 수 없으면 수동 입력 받기
  const email = prompt('이메일을 입력해주세요:');
  if (!email || !email.includes('@')) {
    alert('올바른 이메일을 입력해주세요.');
    return;
  }
  
  const name = prompt('이름을 입력해주세요 (선택사항):') || email.split('@')[0];
  
  // API 호출
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
  
  // ... 나머지 코드
}
```

## 즉시 시도할 것

1. **`IMWEB-DEBUG-CODE.js` 파일의 코드를 Imweb 페이지에 추가**
2. **"디버깅 정보 보기" 버튼 클릭**
3. **브라우저 콘솔(F12) 확인**
4. **콘솔에 출력된 정보를 알려주세요**

## 필요한 정보

다음 정보를 알려주시면 정확한 코드를 작성해드릴 수 있습니다:

1. **브라우저 콘솔에 출력된 쿠키 목록**
2. **localStorage에 저장된 값들**
3. **window 객체에서 찾은 Imweb 관련 속성들**
4. **Network 탭에서 실패한 API 요청들**

## 대안: Imweb 관리자에서 확인

Imweb 관리자 페이지에서:
1. **사용자 관리** 또는 **회원 관리** 메뉴 확인
2. **API 설정** 또는 **개발자 도구** 확인
3. **로그인 후 사용자 정보를 가져오는 방법** 확인

이 정보를 알려주시면 코드를 수정하겠습니다.

