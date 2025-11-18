# 이메일 설정 확인 및 테스트 가이드

## 현재 설정된 정보 (EMAIL-SETUP.md 기준)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=maub9955@gmail.com
SMTP_PASS="mgkx xyvg orce qfdi"
SMTP_FROM=maub9955@gmail.com
FRONTEND_URL=https://www.workbase-ai.com
```

## Render 환경 변수 설정 확인

1. **Render Dashboard 접속**: https://dashboard.render.com
2. **API 서비스 선택** (api.workbase-ai.com)
3. **Environment** 탭 클릭
4. 다음 환경 변수들이 정확히 설정되어 있는지 확인:

   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `maub9955@gmail.com`
   - `SMTP_PASS` = `mgkx xyvg orce qfdi` (따옴표 없이)
   - `SMTP_FROM` = `maub9955@gmail.com`
   - `FRONTEND_URL` = `https://www.workbase-ai.com`

**중요**: `SMTP_PASS`에 따옴표(`"`)를 넣지 마세요. Render는 환경 변수 값을 자동으로 처리합니다.

5. 환경 변수가 없거나 다르면:
   - **Add Environment Variable** 클릭
   - Key와 Value 입력
   - **Save Changes** 클릭
   - 서비스가 자동으로 재배포됩니다

## 서버 로그 확인

1. Render Dashboard에서 API 서비스의 **Logs** 탭 클릭
2. 다음 메시지가 보이는지 확인:
   ```
   이메일 전송 서비스가 초기화되었습니다.
   ```
3. 이 메시지가 보이면 SMTP 설정이 성공적으로 로드된 것입니다.
4. 이 메시지가 보이지 않으면:
   ```
   SMTP 설정이 없어 이메일 전송이 비활성화되었습니다.
   ```
   → 환경 변수가 제대로 설정되지 않은 것입니다.

## 이메일 테스트

### 방법 1: 페이지 공유로 테스트
1. 워크스페이스에 로그인
2. 아무 페이지나 열기
3. **공유** 버튼 클릭
4. **이메일 초대** 탭 선택
5. 회원가입된 다른 사용자의 이메일 입력
6. **초대하기** 클릭
7. 서버 로그 확인:
   - 성공: `이메일 전송 성공: [이메일] - Message ID: [ID]`
   - 실패: `이메일 전송 실패: [이메일]` + 오류 메시지

### 방법 2: 팀 멤버 초대로 테스트
1. 워크스페이스에서 **팀 관리** 버튼 클릭
2. 새 팀 만들기
3. 이메일로 멤버 초대
4. 서버 로그 확인

## 문제 해결

### 문제 1: "이메일 전송 서비스가 초기화되었습니다." 메시지가 보이지 않음
- **원인**: 환경 변수가 설정되지 않았거나 잘못됨
- **해결**: 
  1. Environment 탭에서 모든 SMTP 관련 환경 변수 확인
  2. 값이 정확한지 확인 (특히 `SMTP_PASS`에 따옴표가 없는지)
  3. **Save Changes** 후 재배포 대기

### 문제 2: "이메일 전송 실패" 오류
- **원인**: Gmail 앱 비밀번호가 잘못되었거나 2단계 인증이 비활성화됨
- **해결**:
  1. Google 계정에서 2단계 인증 활성화 확인
  2. 새로운 앱 비밀번호 생성
  3. Render 환경 변수 `SMTP_PASS` 업데이트
  4. 서비스 재배포

### 문제 3: 이메일이 수신함에 도착하지 않음
- **원인**: 스팸 폴더로 이동했거나 Gmail 보안 설정
- **해결**:
  1. 스팸 폴더 확인
  2. Gmail 보안 설정에서 "보안 수준이 낮은 앱의 액세스" 허용 (임시)
  3. 또는 OAuth 2.0 사용 고려

## Gmail 앱 비밀번호 재생성

1. Google 계정 설정: https://myaccount.google.com/
2. **보안** → **2단계 인증** (활성화되어 있어야 함)
3. **앱 비밀번호** 클릭
4. 기존 "Workbase AI" 앱 비밀번호 삭제 (선택사항)
5. 새 앱 비밀번호 생성:
   - 앱 선택: "기타(맞춤 이름)"
   - 이름: "Workbase AI"
   - 생성 클릭
6. 16자리 비밀번호 복사
7. Render 환경 변수 `SMTP_PASS` 업데이트
8. 서비스 재배포

## 확인 체크리스트

- [ ] Render Dashboard에서 모든 SMTP 환경 변수 확인
- [ ] 서버 로그에서 "이메일 전송 서비스가 초기화되었습니다." 메시지 확인
- [ ] 테스트 이메일 전송 시도
- [ ] 서버 로그에서 "이메일 전송 성공" 메시지 확인
- [ ] 수신함(또는 스팸 폴더)에서 이메일 확인

## 참고

- Gmail은 하루에 약 500개의 이메일 전송 제한이 있습니다
- 앱 비밀번호는 공개 저장소에 커밋하지 마세요
- 프로덕션 환경에서는 SendGrid, Mailgun, AWS SES 같은 전문 이메일 서비스 사용을 권장합니다

