# Render 데이터 영구 저장 가이드

Render에서 데이터가 영구적으로 저장되도록 설정하는 방법입니다.

## ⚠️ 중요: Render 무료 플랜 제한사항

**Render의 무료 플랜에서는 Persistent Disk가 제공되지 않습니다.** 
- 무료 플랜: 재배포 시 데이터가 손실될 수 있습니다
- 유료 플랜: Persistent Disk 사용 가능 (월 $0.25/GB)

## 해결 방법 1: PostgreSQL 데이터베이스 사용 (권장)

가장 안정적인 방법은 PostgreSQL 데이터베이스를 사용하는 것입니다.

### 1. Render에서 PostgreSQL 생성

1. Render Dashboard 접속: https://dashboard.render.com
2. **New +** → **PostgreSQL** 클릭
3. 다음 설정 입력:
   - **Name**: `workbase-db` (또는 원하는 이름)
   - **Database**: `workbase` (또는 원하는 이름)
   - **User**: 자동 생성 또는 직접 입력
   - **Region**: API 서버와 같은 리전 선택
   - **PostgreSQL Version**: 최신 버전 선택
   - **Plan**: Free (또는 Starter $7/월)
4. **Create Database** 클릭

### 2. 데이터베이스 연결 정보 확인

1. 생성한 PostgreSQL 서비스 선택
2. **Info** 탭에서 **Internal Database URL** 복사
   - 예: `postgresql://user:password@hostname:5432/dbname`

### 3. 환경 변수 설정

1. API 서비스 (api.workbase-ai.com) 선택
2. **Environment** 탭 클릭
3. 다음 환경 변수 추가:
   ```
   DATABASE_URL=postgresql://user:password@hostname:5432/dbname
   ```
   (위에서 복사한 Internal Database URL 사용)
4. **Save Changes** 클릭

### 4. 코드 마이그레이션

PostgreSQL을 사용하려면 코드를 수정해야 합니다. (별도 작업 필요)

---

## 해결 방법 2: 현재 파일 시스템 사용 (임시 해결책)

무료 플랜에서 PostgreSQL 마이그레이션이 어려운 경우, 현재 파일 시스템을 사용하되 다음을 주의하세요:

### ✅ 데이터가 유지되는 경우

- 서버가 실행 중일 때: 데이터는 메모리와 디스크에 저장됨
- 자동 재배포가 없는 경우: 데이터가 유지됨
- 수동 재배포를 하지 않는 경우: 데이터가 유지됨

### ❌ 데이터가 손실되는 경우

- **코드 변경 후 자동 재배포**: 데이터 손실 가능
- **수동 재배포**: 데이터 손실 가능
- **서비스 재시작**: 데이터 손실 가능

### 현재 상태 확인

서버 로그에서 다음 메시지 확인:
```
[Database] 데이터 로드 시작: /opt/render/project/src/data
[Database] 데이터 로드 완료: 사용자 X명, 페이지 Y개, ...
[Database] 사용자 생성 및 저장 완료: [이메일]
[Database] 사용자 저장 확인 완료: [이메일]
```

## 해결 방법 3: 외부 데이터베이스 사용

### MongoDB Atlas (무료 티어 제공)

1. MongoDB Atlas (https://www.mongodb.com/cloud/atlas)에서 계정 생성
2. 무료 클러스터 생성 (M0 - Free)
3. 연결 문자열 복사
4. 환경 변수에 추가:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/workbase
   ```
5. 코드 수정하여 MongoDB 사용

### Supabase (PostgreSQL, 무료 티어 제공)

1. Supabase (https://supabase.com)에서 프로젝트 생성
2. 연결 정보 복사
3. 환경 변수에 추가:
   ```
   DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
   ```
4. 코드 수정하여 PostgreSQL 사용

## 현재 상태 확인

서버 로그에서 다음을 확인하세요:

1. **데이터 디렉토리 경로**:
   ```
   [Database] 데이터 로드 시작: /opt/render/project/src/data
   ```
   또는
   ```
   [Database] 데이터 로드 시작: /data
   ```

2. **데이터 로드 상태**:
   ```
   [Database] 데이터 로드 완료: 사용자 X명, 페이지 Y개, ...
   ```

3. **저장 성공 여부**:
   ```
   [Database] 저장 성공: /data/users.json (XXX bytes)
   ```

## 문제 해결

### 데이터가 저장되지 않는 경우

1. **디렉토리 권한 확인**:
   - 서버 로그에서 "데이터 디렉토리 생성 실패" 오류 확인
   - Render의 디스크 마운트 경로 확인

2. **디스크 연결 확인**:
   - API 서비스의 **Disks** 탭에서 디스크가 연결되어 있는지 확인
   - 마운트 경로가 올바른지 확인

3. **환경 변수 확인**:
   - `DATA_DIR` 환경 변수가 설정되어 있는지 확인
   - 값이 올바른지 확인 (`/data`)

### 데이터가 손실되는 경우

1. **디스크 백업**:
   - Render는 자동으로 디스크를 백업합니다
   - 필요시 **Disks** 탭에서 백업 복원 가능

2. **수동 백업**:
   - 정기적으로 데이터 파일을 다운로드하여 백업
   - 또는 외부 스토리지(S3, Google Cloud Storage 등)에 백업

## 권장 사항

### 개발/테스트 환경 (무료 플랜)
- 현재 파일 시스템 사용
- 재배포를 최소화
- 정기적으로 데이터 백업 (수동)

### 프로덕션 환경 (유료 플랜 권장)
- **PostgreSQL 데이터베이스 사용** (가장 안정적)
- 또는 Render 유료 플랜의 Persistent Disk 사용
- 자동 백업 설정

## 현재 상태에서 데이터 보호 방법

1. **재배포 최소화**: 코드 변경을 최소화하여 자동 재배포 방지
2. **수동 백업**: 정기적으로 서버 로그에서 데이터 확인
3. **환경 변수 확인**: `DATA_DIR` 환경 변수가 올바르게 설정되어 있는지 확인

## 다음 단계

가장 안정적인 해결책은 **PostgreSQL 데이터베이스로 마이그레이션**하는 것입니다. 
이를 위해서는 코드 수정이 필요하지만, 데이터 영구 저장이 보장됩니다.

