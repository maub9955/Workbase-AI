# 이메일 설정 가이드

이메일 초대 기능을 사용하려면 SMTP 설정이 필요합니다.

## Render API 서버 환경 변수 설정

1. Render Dashboard에서 API 서비스로 이동
2. **Environment** 탭 클릭
3. 다음 환경 변수 추가:

### Gmail 사용 시
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
FRONTEND_URL=https://www.workbase-ai.com
```

### Gmail 앱 비밀번호 생성 방법
1. Google 계정 설정으로 이동: https://myaccount.google.com/
2. **보안** 탭 클릭
3. **2단계 인증** 활성화 (필수)
4. **앱 비밀번호** 섹션으로 이동
5. "앱 선택" → "기타(맞춤 이름)" 선택
6. 이름 입력 (예: "Workbase AI")
7. 생성된 16자리 비밀번호 복사 → `SMTP_PASS`에 입력

### 다른 SMTP 서비스 사용

#### SendGrid
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@yourdomain.com
FRONTEND_URL=https://www.workbase-ai.com
```

#### Mailgun
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
SMTP_FROM=noreply@yourdomain.com
FRONTEND_URL=https://www.workbase-ai.com
```

#### AWS SES
```
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-ses-username
SMTP_PASS=your-aws-ses-password
SMTP_FROM=noreply@yourdomain.com
FRONTEND_URL=https://www.workbase-ai.com
```

## 설정 확인

환경 변수를 추가한 후:
1. **Save Changes** 클릭
2. API 서비스 재배포 (자동으로 시작됨)
3. 서버 로그에서 "이메일 전송 서비스가 초기화되었습니다." 메시지 확인

## 테스트

1. 워크스페이스에서 페이지 열기
2. **공유** 버튼 클릭
3. **이메일 초대** 탭 선택
4. 회원가입된 사용자의 이메일 입력
5. **초대하기** 클릭
6. 초대된 사용자의 이메일 확인

## 문제 해결

### 이메일이 전송되지 않는 경우
- SMTP 설정이 올바른지 확인
- 서버 로그에서 오류 메시지 확인
- 방화벽/보안 그룹에서 포트 587/465 허용 확인
- Gmail 사용 시: 앱 비밀번호가 올바른지 확인

### SMTP 미설정 시
SMTP가 설정되지 않으면 서버 콘솔에 이메일 내용이 출력됩니다. 실제 이메일 전송을 위해서는 위의 설정이 필요합니다.

