# Supabase 설정 가이드

## 1단계: Supabase 연결 정보 가져오기

### 방법 1: Settings → Database (권장)

1. Supabase Dashboard 접속: https://app.supabase.com
2. 프로젝트 선택 (maub9955's Project)
3. **Settings** (왼쪽 사이드바) → **Database** 클릭
4. **Connection string** 섹션이 보이지 않으면 아래 방법 2 사용

### 방법 2: Settings → API (더 쉬운 방법)

1. Supabase Dashboard 접속: https://app.supabase.com
2. 프로젝트 선택 (maub9955's Project)
3. **Settings** (왼쪽 사이드바) → **API** 클릭
4. **Project API keys** 섹션에서:
   - **Project URL** 확인 (예: `https://xxxxx.supabase.co`)
   - **Database** 섹션으로 스크롤
   - **Connection string** 또는 **Connection pooling** 섹션 확인

### 방법 3: 직접 구성 (가장 확실한 방법)

1. **Settings** → **Database** 클릭
2. **Database password** 섹션에서:
   - 비밀번호를 알고 있으면 사용
   - 모르면 **Reset database password** 클릭하여 새 비밀번호 설정
3. **Settings** → **API** 클릭
4. **Project URL** 확인 (예: `https://xxxxx.supabase.co`)
5. Connection string을 다음 형식으로 직접 구성:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
   - `[YOUR-PASSWORD]`: 위에서 확인한 데이터베이스 비밀번호
   - `xxxxx`: Project URL에서 추출 (예: `https://abcdefghijklmnop.supabase.co` → `abcdefghijklmnop`)

### 방법 4: Connection Pooling 사용 (권장)

1. **Settings** → **Database** 클릭
2. **Connection pooling configuration** 섹션 확인
3. **Connection string** 섹션이 있으면 **Session mode** URI 사용
4. 없으면 위 방법 3으로 직접 구성

**참고**: Supabase 무료 플랜에서도 Connection string 사용이 가능합니다. 결제가 필요하지 않습니다.

## 2단계: 데이터베이스 스키마 생성

Supabase Dashboard → **SQL Editor** 클릭 → 다음 SQL 실행:

```sql
-- Users 테이블
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  personal_page_id UUID,
  team_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages 테이블
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id TEXT NOT NULL,
  title TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  collaborators UUID[] DEFAULT '{}',
  child_page_ids UUID[] DEFAULT '{}',
  block_ids UUID[] DEFAULT '{}',
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocks 테이블
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  props JSONB DEFAULT '{}',
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Files 테이블
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams 테이블
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_pages_owner_id ON pages(owner_id);
CREATE INDEX IF NOT EXISTS idx_pages_parent_page_id ON pages(parent_page_id);
CREATE INDEX IF NOT EXISTS idx_blocks_page_id ON blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_files_page_id ON files(page_id);
CREATE INDEX IF NOT EXISTS idx_teams_owner_id ON teams(owner_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

## 3단계: Render 환경 변수 설정

### Render Dashboard에서 환경 변수 추가

1. **Render Dashboard 접속**: https://dashboard.render.com
2. **Services** 메뉴 클릭 (왼쪽 사이드바)
3. **API 서비스 선택** (api.workbase-ai.com 또는 비슷한 이름)
4. 다음 중 하나의 방법으로 환경 변수 섹션 찾기:
   - **방법 A**: 상단 탭 메뉴에서 **Environment** 또는 **Settings** 탭 클릭
   - **방법 B**: 왼쪽 사이드바에서 **Settings** 클릭 → 페이지 스크롤 → **Environment Variables** 섹션
   - **방법 C**: 서비스 페이지에서 **Environment Variables** 섹션 직접 찾기

5. **Add Environment Variable** 또는 **+ Add** 버튼 클릭
6. 다음 정보 입력:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
     (위에서 만든 Connection string 사용)
7. **Save** 또는 **Add** 클릭
8. **Save Changes** 클릭 (페이지 하단에 있을 수 있음)

**참고**: 환경 변수 섹션을 찾을 수 없다면 `RENDER-ENV-VARIABLES.md` 파일을 참고하세요.

## 4단계: 코드 마이그레이션

코드가 자동으로 PostgreSQL을 사용하도록 수정됩니다.

## 5단계: 서비스 재배포

1. Render Dashboard → API 서비스
2. **Manual Deploy** → **Deploy latest commit** 클릭
3. 배포 완료까지 대기 (2-3분)

## 확인

배포 완료 후:
1. 서버 로그에서 다음 메시지 확인:
   ```
   [Database] PostgreSQL 연결 성공
   [Database] 데이터 로드 완료: 사용자 X명, 페이지 Y개, ...
   ```
2. 웹 앱에서 회원가입 테스트
3. Supabase Dashboard → **Table Editor**에서 데이터 확인

## 문제 해결

### 연결 오류가 발생하는 경우

1. **비밀번호 확인**: Supabase Dashboard → Settings → Database → Database password 확인
2. **IP 허용**: Supabase Dashboard → Settings → Database → Connection pooling → Allowed IPs 확인
3. **환경 변수 확인**: Render Dashboard에서 `DATABASE_URL`이 올바르게 설정되었는지 확인

### 테이블이 생성되지 않는 경우

1. Supabase Dashboard → **SQL Editor**에서 SQL 다시 실행
2. **Table Editor**에서 테이블이 생성되었는지 확인

