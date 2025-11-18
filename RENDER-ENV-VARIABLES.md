# Render 환경 변수 설정 가이드

## Render Dashboard에서 환경 변수 추가하는 방법

### 방법 1: 서비스 페이지에서 직접 설정 (가장 일반적)

1. **Render Dashboard 접속**: https://dashboard.render.com
2. **Services** 메뉴 클릭 (왼쪽 사이드바)
3. **API 서비스 선택** (api.workbase-ai.com 또는 비슷한 이름)
4. 서비스 페이지에서 다음 중 하나를 찾으세요:
   - **Environment** 탭 (상단 탭 메뉴)
   - **Environment Variables** 섹션
   - **Settings** → **Environment** (왼쪽 사이드바)

### 방법 2: Settings 메뉴에서 설정

1. Render Dashboard → API 서비스 선택
2. 왼쪽 사이드바에서 **Settings** 클릭
3. 페이지를 아래로 스크롤
4. **Environment Variables** 섹션 찾기
5. **Add Environment Variable** 또는 **+ Add** 버튼 클릭

### 방법 3: 서비스 편집 모드

1. Render Dashboard → API 서비스 선택
2. 상단 오른쪽에 **Edit** 또는 **Settings** 버튼 클릭
3. **Environment Variables** 섹션 찾기
4. **Add Environment Variable** 클릭

## 환경 변수 추가 단계

1. **Add Environment Variable** 또는 **+ Add** 버튼 클릭
2. 다음 정보 입력:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres`
3. **Save** 또는 **Add** 클릭
4. **Save Changes** 클릭 (페이지 하단에 있을 수 있음)

## 환경 변수 확인

추가한 환경 변수가 목록에 표시되어야 합니다:
- Key: `DATABASE_URL`
- Value: `postgresql://...` (일부만 표시될 수 있음)

## 서비스 재배포

환경 변수를 추가한 후 **반드시 재배포**해야 합니다:

1. 서비스 페이지에서 **Manual Deploy** 섹션 찾기
2. **Deploy latest commit** 또는 **Deploy** 버튼 클릭
3. 배포 완료까지 대기 (2-3분)

## 문제 해결

### Environment 탭이 보이지 않는 경우

1. **올바른 서비스 선택 확인**: API 서비스가 선택되어 있는지 확인
2. **권한 확인**: 서비스 소유자 또는 관리자 권한이 있는지 확인
3. **브라우저 새로고침**: 페이지를 새로고침해보세요
4. **다른 브라우저 시도**: 다른 브라우저에서 시도해보세요

### Settings 메뉴가 보이지 않는 경우

1. **서비스 타입 확인**: Web Service인지 확인 (Static Site가 아닌지)
2. **서비스 상태 확인**: 서비스가 정상적으로 실행 중인지 확인
3. **Render Dashboard 홈페이지**: https://dashboard.render.com 에서 다시 시작

## 스크린샷으로 확인

Render Dashboard의 일반적인 구조:
- 왼쪽 사이드바: Services, Settings 등
- 상단 탭: Overview, Logs, Metrics, Settings, Environment 등
- 메인 콘텐츠: 서비스 정보 및 설정

## 대안: Render CLI 사용

웹 UI에서 환경 변수를 추가할 수 없는 경우:

1. Render CLI 설치:
   ```bash
   npm install -g render-cli
   ```

2. 로그인:
   ```bash
   render login
   ```

3. 환경 변수 설정:
   ```bash
   render env:set DATABASE_URL="postgresql://..." --service [서비스ID]
   ```

## 도움이 필요한 경우

여전히 환경 변수 섹션을 찾을 수 없다면:
1. 현재 보고 있는 페이지의 스크린샷을 공유해주세요
2. 또는 Render Dashboard의 URL을 알려주세요

