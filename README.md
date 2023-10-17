# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)

### 기본 요구사항

- [ ] 바닐라 JS만을 이용해 노션을 클로닝합니다.
- [ ] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
- [ ] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [ ] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - [ ] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [ ] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [ ] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [ ] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [ ] History API를 이용해 SPA 형태로 만듭니다.
  - [ ] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [ ] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 커밋 메세지 설명서

해당 프로젝트의 커밋 메세지는 <a href="https://gitmoji.dev/">깃모지</a>를 사용하고 있습니다.

프로젝트에서 사용하는 깃모지의 의미는 다음과 같습니다.

🎉: 첫 커밋 메세지(프로젝트 시작 시)에 사용됩니다. </br>
📝: 리드미 추가/수정이나 주석 추가/수정 시에 사용됩니다. </br>
✨: 새로운 기능 추가 시에 사용됩니다. </br>
🚚: 파일명/폴더명 또는 파일/폴더의 경로가 변경됐을 시에 사용됩니다. </br>
⚰️: 더이상 사용하지 않는 코드를 지웠을 때 사용됩니다. </br>
🔥: 파일이나 코드를 삭제했을 때 사용됩니다. </br>
💄: UI, style을 추가/변경했을 때 사용됩니다. </br>
