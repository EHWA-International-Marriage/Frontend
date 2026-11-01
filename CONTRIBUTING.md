# 브랜치 · PR 규칙

이 저장소는 이화국제결혼 홈페이지입니다. `main`에 들어간 내용은 Netlify가 바로 실제 사이트에 배포합니다. 그래서 규칙은 하나로 모입니다. **`main`에는 확인된 변경만, PR로만 들어갑니다.**

## 브랜치

GitHub Flow를 씁니다. 사이트가 하나이고 `main`이 곧 배포본이라 `develop` 같은 중간 브랜치는 두지 않습니다.

| 브랜치 | 용도 | 예시 |
|---|---|---|
| `main` | 실제 사이트. 직접 push 금지 | |
| `feat/…` | 새 페이지 · 새 기능 | `feat/kazakhstan-cost` |
| `fix/…` | 깨진 화면 · 링크 · 동작 수정 | `fix/mobile-menu-close` |
| `content/…` | 문구 · 가격 · 연락처 · 사진만 바꿀 때 | `content/2027-uzbek-price` |
| `chore/…` | 설정 · 문서 · 정리 | `chore/update-readme` |
| `hotfix/…` | 실제 사이트에 급히 고쳐야 할 문제 | `hotfix/wrong-phone-number` |

- 항상 최신 `main`에서 만듭니다: `git switch main && git pull && git switch -c feat/…`
- 이름은 영어 소문자와 `-`만 씁니다.
- 브랜치는 짧게 씁니다. 한 브랜치에 한 가지 일만 하고, 며칠 안에 PR로 합칩니다.

## 커밋 메시지

`종류: 무엇을 바꿨는지` 형식으로 한 줄 요약을 씁니다. 한국어로 써도 됩니다.

```
feat: 카자흐스탄 비용 및 절차 페이지 추가
fix: 모바일에서 메뉴가 닫히지 않는 문제 수정
content: 우즈베키스탄 중도금 2027년 기준으로 변경
```

종류는 브랜치와 같이 `feat` · `fix` · `content` · `chore` · `hotfix`를 씁니다.

## PR

1. 작업 브랜치를 push하고 `main`을 향해 PR을 엽니다. PR 양식이 자동으로 채워집니다.
2. Netlify가 PR마다 **미리보기 주소(Deploy Preview)**를 댓글로 달아 줍니다. 리뷰는 이 주소에서 실제 화면을 보고 합니다.
3. 데스크톱과 휴대폰 화면을 모두 확인하고, 바뀐 화면의 스크린샷을 PR에 붙입니다.
4. 리뷰어 1명 이상이 승인하면 **Squash and merge**로 합칩니다. PR 하나가 `main`에서 커밋 하나가 되어 기록이 깔끔해지고, 되돌리기도 쉽습니다.
5. 합친 뒤 작업 브랜치는 지웁니다. GitHub에서 자동 삭제를 켜 두면 편합니다.

혼자 작업할 때도 PR을 거칩니다. 미리보기에서 한 번 더 보는 것만으로도 깨진 화면이 실제 사이트에 나가는 일을 막을 수 있습니다.

### 꼭 확인할 것

- 고객 이름, 연락처, 사진 같은 개인정보가 들어가지 않았는지 확인합니다. 실제 고객 사진은 본인 동의를 받은 것만 씁니다.
- 가격, 등록번호, 전화번호처럼 법적 · 금전적 의미가 있는 내용은 대표님 확인을 받습니다.
- 비밀번호, API 키, 토큰은 저장소에 절대 넣지 않습니다.

## 급한 수정 (hotfix)

실제 사이트에 잘못된 전화번호나 깨진 화면이 나갔을 때 씁니다.

1. `main`에서 `hotfix/…` 브랜치를 만들고 고칩니다.
2. PR을 열고 미리보기만 확인한 뒤 바로 합칩니다. 리뷰는 합친 뒤에 받아도 됩니다.

## 되돌리기

- **가장 빠른 방법:** Netlify의 **Deploys**에서 문제없던 이전 배포를 골라 **Publish deploy**를 누르면 몇 초 안에 이전 화면으로 돌아갑니다. 코드는 그대로이므로 이어서 아래 방법으로 정리합니다.
- **코드까지 되돌리기:** GitHub에서 문제의 PR을 열고 **Revert** 버튼으로 되돌리는 PR을 만들어 합칩니다.

## 저장소 설정 (관리자가 한 번만)

GitHub 저장소 **Settings**에서:

- **Rules → Rulesets → New branch ruleset**, 대상 `main`:
  - Restrict deletions, Block force pushes
  - Require a pull request before merging (승인 1명)
  - Require status checks to pass: Netlify의 `netlify/…/deploy-preview` 체크 (Netlify를 연결한 뒤 PR을 한 번 열어야 목록에 나타납니다)
- **General → Pull Requests:** Allow squash merging만 켜고, Automatically delete head branches를 켭니다.

Netlify **Site configuration → Build & deploy → Continuous deployment**에서:

- Production branch: `main`
- Deploy Previews: Any pull request against your production branch
