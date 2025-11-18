# Supabase 설정 가이드

## 1단계: Supabase 연결 정보 가져오기

1. Supabase Dashboard 접속: https://app.supabase.com
2. 프로젝트 선택 (maub9955's Project)
3. **Settings** (왼쪽 사이드바) → **Database** 클릭
4. **Connection string** 섹션에서 **URI** 복사
   - 예: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
5. 또는 **Connection pooling** 섹션에서 **Session mode** URI 복사 (권장)

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

1. Render Dashboard → API 서비스 (api.workbase-ai.com) 선택
2. **Environment** 탭 클릭
3. 다음 환경 변수 추가:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
   (위에서 복사한 URI 사용)
4. **Save Changes** 클릭

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

