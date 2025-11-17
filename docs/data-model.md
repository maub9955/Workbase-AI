# Data Model Overview (Draft)

> 초기 버전 기준으로 문서화하며, 실제 구현 시 변경될 수 있습니다.

## 핵심 엔터티

- **users**: 사내 계정 / SSO 프로필과 매핑
- **teams**: 조직/프로젝트 단위 그룹, 권한 상속 단위
- **workspaces**: 팀 또는 프로젝트별 협업 공간
- **pages**
  - `id`, `workspace_id`, `parent_page_id`, `owner_id`
  - 표시 정보: `title`, `icon`, `cover_url`, `summary`
  - 권한: `is_private`, `is_published`, `shared_link_token`, `shared_link_expires_at`
  - 정렬: `position` (우선순위 기반, sibling 간 spacing)
- **blocks**
  - `id`, `page_id`, `parent_block_id`, `type`, `position`
  - `props` JSONB (예: `{ text: "hello" }`, `{ checked: false }`, `{ viewId: "..."}`
  - 기본 타입: paragraph, heading_1/2/3, bulleted_list, numbered_list, todo, toggle, callout, quote, divider, column, column_list, embed, calendar_view, task_list, file
  - 추가 메타: `attached_entity_id` (event, task, file 참조)
- **files**
  - `id`, `workspace_id`, `uploader_id`
  - 저장 메타: `storage_key`, `bucket`, `size`, `mime_type`, `checksum`
  - 접근 제어: `visibility`(page_inherit/shared_link/private)
- **events**: 캘린더 일정, 반복 설정 및 사용자 정의 필드 포함
- **tasks**: 일정/페이지와 연결 가능한 업무 아이템

## 관계 요약

- 한 `workspace`는 여러 `pages`, `events`, `tasks`, `files`를 소유
- `pages`는 `parent_page_id`를 통해 트리 구조를 형성 (무한 중첩)
- `pages` ↔ `blocks`는 1:n (블록 트리 구조, `parent_block_id`)
- `blocks` 안의 calendar/task/file 타입은 각각 `events`, `tasks`, `files` 엔터티와 연결
- `tasks`는 `users` (담당자) 및 `pages`(관련 문서)와 다:다 관계
- `files`는 `pages` 또는 `tasks`에 첨부될 수 있으며 공유 링크(`shared_links`)와 연관

## 권한 모델 개요

- 워크스페이스 단위 기본 역할(관리자/편집자/뷰어)
- 페이지/폴더별 세부 ACL (owner, editor, commenter, viewer) 및 상속 규칙
- 초대받은 사용자만 개인 워크스페이스 접근 가능 (기본 private)
- 공유 링크는 토큰/만료/비밀번호 옵션 제공, read-only 뷰
- 파일은 페이지 ACL을 기본 상속, 별도의 파일 공유 링크 발급 가능

## TODO

- 다이어그램(Figma 또는 dbdiagram) 첨부
- 속성 스키마(컬럼, 타입) 상세화 (pages/blocks/files/events/tasks)
- 버전 관리(Revision, Audit log) 모델 정의
- 공유 링크 / ACL 테이블 설계 및 마이그레이션 플랜
