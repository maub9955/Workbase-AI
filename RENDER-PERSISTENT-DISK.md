# Render Persistent Disk 설정 가이드

Render에서 데이터가 영구적으로 저장되도록 Persistent Disk를 설정하는 방법입니다.

## 문제 상황

Render의 기본 파일 시스템은 **임시적**입니다. 재배포 시 데이터가 손실될 수 있습니다.

## 해결 방법: Persistent Disk 사용

### 1. Render Dashboard에서 Persistent Disk 생성

1. Render Dashboard 접속: https://dashboard.render.com
2. **New +** → **Disk** 클릭
3. 다음 설정 입력:
   - **Name**: `workbase-data` (또는 원하는 이름)
   - **Size**: `1 GB` (또는 필요한 크기)
   - **Region**: API 서버와 같은 리전 선택
4. **Create Disk** 클릭

### 2. API 서비스에 Disk 연결

1. API 서비스 (api.workbase-ai.com) 선택
2. **Disks** 탭 클릭
3. **Attach Disk** 클릭
4. 생성한 Disk 선택
5. **Mount Path**: `/data` 입력
6. **Attach** 클릭

### 3. 환경 변수 설정

1. API 서비스의 **Environment** 탭 클릭
2. 다음 환경 변수 추가:
   ```
   DATA_DIR=/data
   ```
3. **Save Changes** 클릭

### 4. 서비스 재배포

환경 변수를 변경한 후:
1. **Manual Deploy** → **Deploy latest commit** 클릭
2. 배포 완료까지 대기 (2-3분)

### 5. 확인

배포 완료 후 서버 로그에서 다음 메시지 확인:
```
[Database] 데이터 로드 시작: /data
[Database] 데이터 로드 완료: 사용자 X명, 페이지 Y개, ...
```

## 대안: 외부 데이터베이스 사용

Persistent Disk 대신 외부 데이터베이스를 사용할 수도 있습니다:

### PostgreSQL (권장)

1. Render Dashboard에서 **New +** → **PostgreSQL** 클릭
2. 데이터베이스 생성
3. 환경 변수에 연결 정보 추가
4. 코드 수정하여 PostgreSQL 사용

### MongoDB Atlas

1. MongoDB Atlas에서 클러스터 생성
2. 연결 문자열을 환경 변수로 설정
3. 코드 수정하여 MongoDB 사용

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

## 참고

- Persistent Disk는 **유료 플랜**에서만 사용 가능합니다
- 무료 플랜에서는 데이터가 재배포 시 손실될 수 있습니다
- 프로덕션 환경에서는 반드시 Persistent Disk 또는 외부 데이터베이스를 사용하세요

