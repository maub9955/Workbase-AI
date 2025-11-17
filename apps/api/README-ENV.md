# .env 파일 설정 가이드

## .env 파일 위치
`.env` 파일은 `apps/api/` 디렉토리에 있습니다.

## macOS에서 .env 파일 보는 방법

### 방법 1: 터미널 사용
```bash
cd apps/api
cat .env
```

### 방법 2: Finder에서 숨김 파일 보기
1. Finder에서 `apps/api` 폴더로 이동
2. 키보드 단축키: `Cmd + Shift + .` (점)을 눌러 숨김 파일 표시
3. `.env` 파일이 보입니다

### 방법 3: VS Code에서 보기
1. VS Code에서 `apps/api` 폴더 열기
2. 파일 탐색기에서 `.env` 파일이 보입니다 (숨김 파일도 표시됨)

## .env 파일 내용 수정
`.env` 파일을 열어서 다음 내용을 실제 SMTP 설정으로 변경하세요:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Workbase AI <workbase-ai@support.com>
FRONTEND_URL=http://localhost:3000
PORT=4000
```

## Gmail 앱 비밀번호 생성 방법
1. Google 계정 설정으로 이동
2. 보안 > 2단계 인증 활성화
3. 앱 비밀번호 생성
4. 생성된 비밀번호를 `SMTP_PASS`에 입력
