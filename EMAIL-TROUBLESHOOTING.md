# 이메일 발송 문제 해결 가이드

## 현재 설정 확인

현재 `.env` 파일에 다음이 설정되어 있습니다:
- SMTP_HOST: smtp.gmail.com
- SMTP_PORT: 587
- SMTP_USER: maub9955@gmail.com
- SMTP_PASS: mgkx xyvg orce qfdi
- SMTP_FROM: Workbase AI <workbase-ai@support.com>

## 문제 해결 단계

### 1. Gmail 앱 비밀번호 확인

Gmail 앱 비밀번호는 공백 없이 입력해야 합니다:
```bash
# 현재 (공백 포함)
SMTP_PASS=mgkx xyvg orce qfdi

# 수정 (공백 제거)
SMTP_PASS=mgkxyvgorceqfdi
```

또는 따옴표로 감싸기:
```bash
SMTP_PASS="mgkx xyvg orce qfdi"
```

### 2. Gmail 2단계 인증 확인

1. Google 계정 설정 → 보안
2. "2단계 인증"이 활성화되어 있는지 확인
3. 활성화되어 있지 않으면 활성화

### 3. 앱 비밀번호 재생성

1. Google 계정 설정 → 보안
2. "앱 비밀번호" 섹션으로 이동
3. 새 앱 비밀번호 생성
4. 생성된 비밀번호를 `.env` 파일에 업데이트

### 4. API 서버 재시작

환경 변수를 변경한 후 API 서버를 재시작하세요:
```bash
# API 서버 중지 후 재시작
npm run dev --filter=@notion-clone/api
```

### 5. 로그 확인

API 서버 콘솔에서 다음 메시지를 확인하세요:

**성공 시:**
```
이메일 전송 서비스가 초기화되었습니다.
이메일 전송 성공: recipient@example.com - Message ID: <xxx>
```

**실패 시:**
```
이메일 전송 실패: recipient@example.com
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

### 6. 일반적인 오류 메시지

#### "Invalid login" 또는 "Username and Password not accepted"
- 앱 비밀번호가 잘못되었거나 공백이 포함됨
- 2단계 인증이 비활성화됨

#### "Connection timeout"
- 방화벽이나 네트워크 문제
- SMTP_PORT가 잘못됨 (587 또는 465)

#### "Authentication failed"
- Gmail 계정의 "보안 수준이 낮은 앱 액세스" 설정 확인
- (현재는 사용되지 않지만, 일부 경우 필요할 수 있음)

### 7. 테스트 방법

1. 공유 모달에서 이메일 초대 시도
2. API 서버 콘솔 로그 확인
3. 수신자의 스팸 폴더 확인
4. Gmail 계정의 "보안" 섹션에서 최근 로그인 활동 확인

### 8. 대안: 다른 이메일 서비스 사용

Gmail이 계속 문제가 있다면 다른 SMTP 서비스를 사용할 수 있습니다:

#### SendGrid (무료 티어: 100개/일)
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun (무료 티어: 5,000개/월)
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

## 빠른 수정 방법

`.env` 파일에서 `SMTP_PASS`를 따옴표로 감싸거나 공백을 제거하세요:

```bash
# 방법 1: 따옴표 사용
SMTP_PASS="mgkx xyvg orce qfdi"

# 방법 2: 공백 제거
SMTP_PASS=mgkxyvgorceqfdi
```

그 후 API 서버를 재시작하세요.

