# Supabase Connection String 찾기 가이드

## ⚠️ 중요: 무료 플랜에서도 사용 가능합니다!

Supabase 무료 플랜에서도 Connection string을 사용할 수 있습니다. 결제가 필요하지 않습니다.

## Connection String 찾는 방법

### 방법 1: Settings → API (가장 쉬운 방법)

1. Supabase Dashboard 접속: https://app.supabase.com
2. 프로젝트 선택
3. 왼쪽 사이드바에서 **Settings** → **API** 클릭
4. 페이지를 아래로 스크롤하여 **Database** 섹션 찾기
5. **Connection string** 또는 **Connection pooling** 섹션 확인

### 방법 2: Settings → Database

1. **Settings** → **Database** 클릭
2. **Connection string** 섹션 확인
3. 없으면 아래 방법 3 사용

### 방법 3: 직접 구성 (가장 확실한 방법)

Connection string이 보이지 않으면 직접 구성할 수 있습니다:

#### 1단계: 데이터베이스 비밀번호 확인

1. **Settings** → **Database** 클릭
2. **Database password** 섹션 확인
3. 비밀번호를 모르면:
   - **Reset database password** 클릭
   - 새 비밀번호 설정 (기억해두세요!)

#### 2단계: Project URL 확인

1. **Settings** → **API** 클릭
2. **Project URL** 확인
   - 예: `https://abcdefghijklmnop.supabase.co`
   - 여기서 `abcdefghijklmnop` 부분이 프로젝트 ID입니다

#### 3단계: Connection String 구성

다음 형식으로 Connection string을 만드세요:

```
postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres
```

**예시**:
- Project URL: `https://abcdefghijklmnop.supabase.co`
- 비밀번호: `myPassword123`
- Connection string: `postgresql://postgres:myPassword123@db.abcdefghijklmnop.supabase.co:5432/postgres`

### 방법 4: Connection Pooling 사용 (권장)

Connection pooling을 사용하면 더 안정적입니다:

1. **Settings** → **Database** 클릭
2. **Connection pooling configuration** 섹션 확인
3. **Connection string** 섹션이 있으면:
   - **Session mode** URI 사용 (권장)
   - 또는 **Transaction mode** URI 사용

## Render 환경 변수 설정

Connection string을 얻은 후:

1. Render Dashboard → API 서비스 선택
2. **Environment** 탭 클릭
3. 다음 환경 변수 추가:
   ```
   DATABASE_URL=postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres
   ```
4. **Save Changes** 클릭
5. 서비스 재배포

## 문제 해결

### Connection string이 보이지 않는 경우

1. **프로젝트가 활성화되었는지 확인**: 프로젝트 상태가 "Active"인지 확인
2. **브라우저 새로고침**: 페이지를 새로고침해보세요
3. **다른 브라우저 시도**: 다른 브라우저에서 시도해보세요
4. **직접 구성**: 위의 방법 3을 사용하여 직접 구성하세요

### 연결 오류가 발생하는 경우

1. **비밀번호 확인**: 데이터베이스 비밀번호가 올바른지 확인
2. **IP 제한 확인**: **Settings** → **Database** → **Network Restrictions**에서 IP 제한이 있는지 확인
3. **SSL 설정 확인**: Supabase는 SSL을 사용하므로, 코드에서 SSL 설정이 올바른지 확인

## 무료 플랜 제한사항

- **데이터베이스 크기**: 500MB
- **대역폭**: 월 5GB
- **연결 수**: 제한적이지만 일반적인 사용에는 충분합니다

프로덕션 환경에서는 유료 플랜을 고려하세요.

