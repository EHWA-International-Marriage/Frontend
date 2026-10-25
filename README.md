# 이화국제결혼 홈페이지

다문화가정이 운영하는 국제결혼 정보회사 이화국제결혼의 홈페이지입니다. 내용은 기존 홈페이지(goodwed.kr)를 바탕으로 했습니다.

- `index.html` 한 파일로 동작하는 정적 페이지입니다. 빌드 과정이 없습니다.
- 페이지 이동은 주소 뒤의 `#` 이름으로 합니다. 예: `#cost-uz`, `#documents`, `#notice`
- 회원 전용 게시판과 상담 글쓰기는 기존 goodwed.kr 게시판으로 연결됩니다.
- 로컬에서 보기: `python3 -m http.server 8000` 실행 후 http://localhost:8000

## Netlify 배포

`netlify.toml`에 설정이 들어 있어 빌드 명령 없이 저장소 루트를 그대로 배포합니다.
Netlify에서 이 GitHub 저장소를 연결하면 `main`에 push할 때마다 자동으로 다시 배포됩니다.
