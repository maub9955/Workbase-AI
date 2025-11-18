# Railway API 서버 도메인 생성 해결

## 문제
- 포트 입력 필드에 "8080"이 기본값으로 들어있음
- "Generate Domain" 버튼이 비활성화됨

## 해결 방법

### 1. 포트를 4000으로 변경
1. 포트 입력 필드에서 "8080"을 지우기
2. "4000" 입력
3. "Generate Domain" 버튼이 활성화되는지 확인
4. 활성화되면 "Generate Domain" 클릭

### 2. 포트가 여전히 비활성화되는 경우

**환경 변수 확인:**
1. **Variables** 탭으로 이동
2. `PORT` 환경 변수가 있는지 확인
3. 없으면 추가: `PORT=4000`
4. Networking으로 돌아가서 다시 시도

**서비스 재시작:**
1. **Deployments** 탭으로 이동
2. 최신 배포의 "Redeploy" 클릭
3. 배포 완료 후 Networking에서 다시 시도

## API 서버 포트 확인

API 서버는 `apps/api/src/main.ts`에서:
```typescript
const port = process.env.PORT ?? "4000";
```

Railway는 자동으로 `PORT` 환경 변수를 설정하지만, 도메인 생성 시에는 포트를 명시적으로 입력해야 할 수 있습니다.

## 다음 단계

1. 포트를 "4000"으로 변경
2. "Generate Domain" 버튼 클릭
3. 생성된 도메인 복사 (예: `workbase-api-production.up.railway.app`)
4. Web 도메인과 함께 Porkbun DNS 설정 진행

