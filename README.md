# 이화국제결혼 홈페이지

다문화가정이 운영하는 국제결혼 정보회사 이화국제결혼의 홈페이지입니다. 내용은 기존 홈페이지(goodwed.kr)를 바탕으로 했습니다.

- 화면과 스타일은 `index.html`, 하위 페이지 내용은 `pages.js`에 있습니다.
- 페이지마다 실제 주소가 있습니다. 예: `/cost-uz/`, `/documents/`, `/notice/`
- `scripts/build.mjs`가 페이지별 HTML(내용이 미리 채워진 상태), `sitemap.xml`, `robots.txt`를 `dist/`에 만듭니다. Netlify는 배포할 때 이 빌드를 실행합니다.
- 회원 전용 게시판과 상담 글쓰기는 기존 goodwed.kr 게시판으로 연결됩니다.
- 로컬에서 보기: `node scripts/build.mjs && python3 -m http.server 8000 -d dist` 실행 후 http://localhost:8000 (Node 18 이상)

## 작업 방법

`main`은 실제 사이트입니다. 브랜치를 만들어 작업하고 PR로 합칩니다. 자세한 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)에 있습니다.

## Netlify 배포

`netlify.toml`에 설정이 들어 있습니다. Netlify가 `node scripts/build.mjs`로 `dist/`를 만들어 배포합니다.
Netlify에서 이 GitHub 저장소를 연결하면 `main`에 push할 때마다 자동으로 다시 배포됩니다.
