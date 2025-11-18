# Render API 서비스 완전 설정 가이드

## 현재 상태

- ✅ 코드 준비 완료 (PostgreSQL 지원)
- ✅ Supabase 데이터베이스 준비 완료
- ⚠️ Render API 서비스 설정 필요

## Render에서 해야 할 일 (단계별)

### 1단계: API 서비스 찾기 또는 생성

#### 방법 A: 기존 서비스 확인

1. Render Dashboard: https://dashboard.render.com
2. **Services** 메뉴 클릭
3. **Workbase-AI** 서비스 찾기
4. 있으면 클릭, 없으면 방법 B로 진행

#### 방법 B: 새 서비스 생성

1. Render Dashboard → **New +** → **Web Service** 클릭
2. GitHub 저장소 연결:
   - Repository: `maub9955/Workbase-AI`
   - Branch: `main`
3. 서비스 설정:
   - **Name**: `workbase-api`
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/main.js`
   - **Environment**: `Node`
4. **Create Web Service** 클릭

### 2단계: 환경 변수 설정 (중요!)

1. API 서비스 선택
2. **Settings** 탭 클릭
3. **Environment Variables** 섹션 찾기
4. 다음 환경 변수 추가:

#### 필수 환경 변수

**DATABASE_URL**:
```
postgresql://postgres:cx%2243bw@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres
```

또는 (비밀번호가 `cx%2243bw!@`인 경우):
```
postgresql://postgres:cx%2243bw!@@db.evboyoserxjptvwltyeo.supabase.co:5432/postgres
```

**PORT**:
```
4000
```

**ALLOWED_ORIGINS** (이미 있으면 확인):
```
*
```

5. **Save Changes** 클릭

### 3단계: Supabase 데이터베이스 스키마 생성

1. Supabase Dashboard 접속: https://app.supabase.com
2. 프로젝트 선택
3. **SQL Editor** 클릭
4. `SUPABASE-SETUP.md` 파일의 SQL 스크립트 복사
5. SQL Editor에 붙여넣고 **Run** 클릭
6. **Table Editor**에서 테이블 생성 확인

### 4단계: 서비스 재배포

1. API 서비스 페이지에서
2. **Manual Deploy** 섹션 찾기
3. **Deploy latest commit** 클릭
4. 배포 진행 상황 확인 (2-3분 소요)

### 5단계: 로그 확인

**Logs** 탭에서 다음 메시지 확인:

```
[Bootstrap] 데이터베이스 초기화 완료
[Database] PostgreSQL 연결 풀 생성 완료
[Database] PostgreSQL 연결 성공
[Database] PostgreSQL 데이터베이스 사용
API server running at http://localhost:4000/api
```

## 문제 해결

### 빌드 오류

**Logs** 탭에서 오류 메시지 확인 후 알려주세요.

### 서비스가 계속 Deploying 상태

1. **Cancel** 클릭하여 배포 취소
2. **Manual Deploy** → **Deploy latest commit** 다시 클릭
3. 여전히 문제가 있으면 서비스 삭제 후 재생성

### 데이터베이스 연결 오류

1. **DATABASE_URL** 환경 변수 확인
2. Supabase 데이터베이스가 실행 중인지 확인
3. 비밀번호가 올바른지 확인

## 확인 체크리스트

- [ ] Render API 서비스 생성/확인
- [ ] 환경 변수 `DATABASE_URL` 추가
- [ ] 환경 변수 `PORT` 확인 (4000)
- [ ] Supabase SQL 스키마 실행
- [ ] 서비스 재배포
- [ ] 로그에서 "PostgreSQL 연결 성공" 확인
- [ ] 웹 앱에서 로그인 테스트

## 다음 단계

위 단계를 완료한 후:
1. 웹 앱에서 회원가입 테스트
2. Supabase Table Editor에서 데이터 확인
3. 모든 기능 정상 작동 확인

