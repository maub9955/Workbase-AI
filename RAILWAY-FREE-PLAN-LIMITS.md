# Railway 무료 플랜 제한 확인

## 가능한 원인
Railway의 무료 플랜(Hobby)은 다음과 같은 제한이 있을 수 있습니다:
- 서비스가 일정 시간 비활성 후 자동 일시 중지
- 동시 실행 서비스 수 제한
- 월간 사용량 제한

## 확인 사항

### 1. 서비스 상태 확인

**@notion-clone/api** 서비스의 대시보드에서:

1. 서비스 상태 확인
   - "Active" 또는 "Running"인지 확인
   - "Paused" 또는 "Suspended"인지 확인

2. 서비스 재시작
   - 서비스가 일시 중지되었다면 **Deployments** 탭에서 **Redeploy** 클릭
   - 또는 서비스 설정에서 **Restart** 옵션 확인

### 2. Railway 플랜 확인

Railway 대시보드의 **Settings** 또는 **Billing** 섹션에서:

- 현재 플랜 확인
- 무료 플랜(Hobby)인지 확인
- 사용량 제한에 도달했는지 확인

### 3. 서비스 활성화

서비스가 일시 중지되었다면:

1. **Deployments** 탭으로 이동
2. **Redeploy** 클릭하여 서비스 재시작
3. 배포 완료까지 대기
4. Metrics에서 CPU 사용량 확인

## 해결 방법

### 방법 1: 서비스 재배포

1. **@notion-clone/api** 서비스의 **Deployments** 탭
2. 최신 배포의 **Redeploy** 클릭
3. 배포 완료까지 대기
4. Metrics에서 CPU 사용량 확인

### 방법 2: Railway 플랜 업그레이드 (필요시)

무료 플랜의 제한으로 인해 문제가 발생한다면:

1. Railway 대시보드의 **Settings** 또는 **Billing** 섹션
2. 플랜 업그레이드 옵션 확인
3. 필요시 유료 플랜으로 업그레이드

### 방법 3: 서비스 설정 확인

**Settings** → **Deploy** 섹션에서:

- **Auto-deploy**: 활성화되어 있는지 확인
- **Sleep after inactivity**: 비활성 후 일시 중지 설정 확인

## 일반적인 Railway 무료 플랜 제한

- **월간 크레딧**: 제한된 크레딧 제공
- **서비스 일시 중지**: 비활성 후 자동 일시 중지 가능
- **동시 실행 서비스**: 제한 가능

## 다음 단계

1. **Deployments** 탭에서 **Redeploy** 클릭
2. 배포 완료 후 Metrics에서 CPU 사용량 확인
3. 여전히 0이면 Railway 플랜 및 서비스 상태 확인
4. 필요시 Railway 지원팀에 문의

## 확인 체크리스트

- [ ] 서비스 상태가 "Active" 또는 "Running"인지 확인
- [ ] 서비스가 "Paused" 또는 "Suspended" 상태인지 확인
- [ ] **Redeploy**로 서비스 재시작
- [ ] Railway 플랜 및 사용량 확인
- [ ] 배포 후 Metrics에서 CPU 사용량 확인

