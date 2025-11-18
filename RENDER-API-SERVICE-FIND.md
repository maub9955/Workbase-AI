# Render API 서비스 찾기 가이드

## Render Dashboard에서 API 서비스 찾는 방법

### 방법 1: Services 메뉴에서 찾기

1. **Render Dashboard 접속**: https://dashboard.render.com
2. 왼쪽 사이드바에서 **Services** 클릭
3. 서비스 목록에서 다음을 찾으세요:
   - `api` 또는 `api.workbase-ai.com`
   - `workbase-api`
   - `@notion-clone/api`
   - 또는 비슷한 이름의 서비스

### 방법 2: 모든 서비스 확인

1. Render Dashboard → **Services** 클릭
2. 서비스 목록을 스크롤하여 확인
3. 서비스 타입이 **Web Service**인 것 찾기

### 방법 3: 검색 기능 사용

1. Render Dashboard 상단의 검색 바 사용
2. `api` 또는 `workbase` 검색

## API 서비스가 없는 경우

### 새 API 서비스 생성

1. Render Dashboard → **New +** 클릭
2. **Web Service** 선택
3. GitHub 저장소 연결:
   - Repository: `maub9955/Workbase-AI`
   - Branch: `main`
4. 서비스 설정:
   - **Name**: `workbase-api` 또는 `api`
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/main.js`
   - **Environment**: `Node`
5. **Create Web Service** 클릭

## 환경 변수 설정

API 서비스를 찾거나 생성한 후:

1. 서비스 선택
2. **Settings** 탭 또는 왼쪽 사이드바에서 **Settings** 클릭
3. **Environment Variables** 섹션 찾기
4. **Add Environment Variable** 클릭
5. 다음 추가:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:cx%2243bw@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres`
     (또는 `postgresql://postgres:cx%2243bw!@@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres`)
6. **Save Changes** 클릭

## 현재 상태 확인

- **workbase-web**: 정상 배포됨 ✅
- **workbase-api**: 빌드 오류 수정됨 (자동 재배포 대기 중)

## 다음 단계

1. Render Dashboard에서 API 서비스 찾기 또는 생성
2. 환경 변수 `DATABASE_URL` 추가
3. 서비스 재배포
4. 배포 완료 후 로그 확인

