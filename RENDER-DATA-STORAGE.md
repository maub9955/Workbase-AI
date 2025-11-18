# Render 데이터 저장 현황 및 해결 방법

## 현재 상황

Render의 무료 플랜에서는 **Persistent Disk가 제공되지 않습니다**. 
현재는 파일 기반 데이터베이스를 사용하고 있으며, 재배포 시 데이터가 손실될 수 있습니다.

## 즉시 확인 사항

### 1. 서버 로그 확인

Render Dashboard → API 서비스 → Logs 탭에서 다음 메시지 확인:

```
[Database] 데이터 로드 시작: /opt/render/project/src/data
[Database] 데이터 로드 완료: 사용자 X명, 페이지 Y개, 블록 Y개, 파일 Y개, 팀 Y개
```

**사용자 수가 0명이면**: 데이터가 손실된 상태입니다.

### 2. 데이터 저장 확인

회원가입 후 로그에서 다음 메시지 확인:

```
[Database] 사용자 생성 및 저장 완료: [이메일] ([사용자ID])
[Database] 사용자 저장 확인 완료: [이메일]
[Database] 저장 성공: /opt/render/project/src/data/users.json (XXX bytes)
```

## 현재 상태에서 데이터 보호 방법

### ✅ 데이터가 유지되는 경우

- 서버가 정상 실행 중일 때
- 코드 변경이 없어 자동 재배포가 발생하지 않을 때
- 수동 재배포를 하지 않을 때

### ❌ 데이터가 손실되는 경우

- **코드 변경 후 자동 재배포**: GitHub에 푸시하면 자동 재배포되며 데이터 손실
- **수동 재배포**: Render Dashboard에서 "Deploy latest commit" 클릭 시 데이터 손실
- **서비스 재시작**: Render가 서비스를 재시작할 때 데이터 손실

## 해결 방법 (우선순위 순)

### 방법 1: PostgreSQL 데이터베이스 사용 (가장 권장)

**장점**: 
- 데이터 영구 저장 보장
- 무료 플랜에서도 사용 가능 (제한적)
- 자동 백업 제공

**단계**:

1. **Render에서 PostgreSQL 생성**:
   - Render Dashboard → New + → PostgreSQL
   - Name: `workbase-db`
   - Database: `workbase`
   - Plan: Free (또는 Starter $7/월)
   - Create Database 클릭

2. **연결 정보 확인**:
   - 생성한 PostgreSQL 서비스 선택
   - Info 탭 → Internal Database URL 복사
   - 예: `postgresql://user:password@hostname:5432/dbname`

3. **환경 변수 설정**:
   - API 서비스 → Environment 탭
   - `DATABASE_URL` 추가 (위에서 복사한 URL)
   - Save Changes

4. **코드 마이그레이션**:
   - 파일 기반 DB → PostgreSQL로 변경 필요
   - 별도 작업 필요

### 방법 2: Supabase 사용 (무료, 추천)

**장점**:
- 완전 무료 (제한적)
- PostgreSQL 기반
- 자동 백업
- 관리형 서비스

**단계**:

1. Supabase (https://supabase.com) 계정 생성
2. 새 프로젝트 생성
3. Settings → Database → Connection string 복사
4. API 서비스 환경 변수에 `DATABASE_URL` 추가
5. 코드 마이그레이션 필요

### 방법 3: MongoDB Atlas 사용 (무료 티어)

**장점**:
- 완전 무료 티어 (512MB)
- NoSQL (현재 구조와 유사)
- 자동 백업

**단계**:

1. MongoDB Atlas (https://www.mongodb.com/cloud/atlas) 계정 생성
2. 무료 클러스터 생성 (M0)
3. Database Access에서 사용자 생성
4. Network Access에서 IP 허용 (0.0.0.0/0)
5. Connect → Drivers → Node.js → Connection string 복사
6. API 서비스 환경 변수에 `MONGODB_URI` 추가
7. 코드 마이그레이션 필요

### 방법 4: 현재 상태 유지 (임시)

**주의사항**:
- 재배포 시 데이터 손실 가능
- 프로덕션 환경에는 부적합
- 개발/테스트용으로만 사용

**데이터 보호 팁**:
- 재배포 최소화
- 정기적으로 데이터 확인
- 중요한 데이터는 수동 백업

## 권장 사항

### 개발/테스트 환경
- 현재 파일 시스템 사용
- 재배포 최소화
- 데이터 손실 가능성 인지

### 프로덕션 환경
- **반드시 PostgreSQL 또는 MongoDB 사용**
- Supabase 또는 MongoDB Atlas 무료 티어 추천
- 자동 백업 설정

## 다음 단계

1. **즉시**: 서버 로그에서 현재 데이터 상태 확인
2. **단기**: Supabase 또는 MongoDB Atlas 설정
3. **장기**: PostgreSQL/MongoDB로 코드 마이그레이션

## 문의

데이터베이스 마이그레이션이 필요하시면 알려주세요. 
PostgreSQL 또는 MongoDB로 마이그레이션하는 코드를 작성해드릴 수 있습니다.

