# 이화행정사사무소 홈페이지 시안

출입국 전문 행정사사무소 홈페이지 디자인 시안입니다. 상호, 연락처, 주소, 업무 사례와 공지는 모두 가상의 예시입니다.

- `index.html` 한 파일로 동작하는 정적 페이지입니다. 빌드 과정이 없습니다.
- 페이지 이동은 주소 뒤의 `#` 이름으로 합니다. 예: `#vietnam`, `#employment`, `#notice`
- 로컬에서 보기: `python3 -m http.server 8000` 실행 후 http://localhost:8000

## GitHub Pages 배포

Settings → Pages에서 Source를 `Deploy from a branch`, 브랜치 `main`, 폴더 `/ (root)`로 저장합니다.
