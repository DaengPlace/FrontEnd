# 1. Project Overview (프로젝트 개요)

- 프로젝트 이름: 댕댕 플레이스
- 개발 기간 : 2024.11.12 ~ 2024.12.20
- 배포 운영 기간 : 2024.11.20 ~ 2024.12.24 [댕댕 플레이스](https://daengplace.vercel.app/)


<br/>

# 2. Team Members (팀원 및 팀 소개)

|                                          김예원                                           |                                           강보석                                           |                                          박예진                                           |
| :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/92143160?v=4" alt="김예원" width="150"> | <img src="https://avatars.githubusercontent.com/u/104492614?v=4" alt="강보석" width="150"> | <img src="https://avatars.githubusercontent.com/u/97819580?v=4" alt="박예진" width="150"> |
|                                            FE & 팀장                                             |                                             FE                                             |                                            FE                                             |
|                          [GitHub](https://github.com/yewoniiii)                           |                        [GitHub](https://github.com/KangBoSeok-kor)                         |                           [GitHub](https://github.com/uiop5809)                           |

<br/>

# 3. Key Features (주요 기능 및 ERD & 아키텍쳐)

- **회원가입**

  - 이메일 인증을 통한 사용자 회원가입
  - 사용자의 정보 등록
  - 사용자의 반려견 정보 등록

- **로그인**

  - 소셜 로그인을 통한 간편 로그인

- **사용자 및 반려견 회원 관리**

  - 사용자 등록, 조회, 수정, 삭제(물리적 삭제)
  - 반려견 등록, 조회, 수정, 삭제
  - 나의 반려견 견종 검색
  - 사용자 즐겨찾기

- **동반 가능 시설 조회**

  - 장소 필터링

- **리뷰 관리**

  - 리뷰 등록, 조회, 수정, 삭제
  - OCR(영수증 리뷰를 통한 리뷰 인증 시스템)
  - 인기 리뷰 리스트 조회
  - 리뷰 좋아요

- **사용자 및 반려견 성향 진단**
  - 사용자 성향 진단
  - 반려견 성향 진단
  - 성향 진단 기반의 장소 추천

## 3.1 프로젝트 ERD

![image](https://github.com/user-attachments/assets/48eeb8b9-4cc5-4642-b67c-1574275ccf77)

## 3.2 프로젝트 아키텍쳐

<img src="https://github.com/user-attachments/assets/fd0766cf-430c-4608-9469-80394765e961" width="600" height="1000"/>

## 3.3 API 명세서

> API 명세서의 경우 현재 노션에서 관리하고 있습니다.

![image](https://github.com/user-attachments/assets/2110705a-54f0-4d27-8de4-47c2b57ae44b)

<br/>

# 4. Tasks & Responsibilities (작업 및 역할 분담)

| 이름   | 담당 업무                                                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------- |
| 김예원 | <ul><li>기획안 작성</li><li>UI 설계</li><li>메인페이지</li><li>발표 자료 제작</li><li>개발 일정 관리</li><li>배포</li></ul> |
| 강보석 | <ul><li>지도 API</li><li>OCR</li><li>동반가능시설</li><li>리뷰 즐겨찾기, 좋아요</li></ul>                            |
| 박예진 | <ul><li>소셜로그인</li><li>공통 컴포넌트 제작</li><li>펫 CRUD</li></ul>                                           |

<br/>

# 5. Technology Stack (기술 스택) 및 협업툴 

- 프레임워크: Next.js
- 언어: JavaScript
- 패키지 매니저: yarn
- CSS 프레임워크: MUI
- 전역 상태 관리: Zustand
- 통신: Axios, React-query
- UI 문서화: Storybook
- 코드 품질 관리: ESLint, Prettier

<br/>

|                                                                                                                   |                                                                                                                      |                                                                                                                |                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100"> | <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="100"> | <img src="https://static-00.iconduck.com/assets.00/jira-icon-2048x2048-nmec2job.png" alt="Jira" width="100">   | <img src="https://blog.greggant.com/images/posts/2019-04-25-figma/Figma.png" alt="Figma" width="100">  |


<br/>

# 6. Project Structure (프로젝트 구조)

```plaintext
project/
├── .github/                # GitHub 관련 설정 파일
├── .storybook/             # Storybook 설정 파일
├── public/                 # 공개 정적 파일
├── src/                    # 소스 코드
│   ├── apis/               # 서버 통신 API
│   ├── app/                # Next.js 14 App Router 구조
│   │   ├── dog/            # 펫 페이지
│   │   ├── main/           # 메인 페이지
│   │   ├── mypage/         # 마이 페이지
│   │   ├── place/          # 장소 페이지
│   │   ├── recommend/      # 추천 페이지
│   │   ├── reviews/        # 리뷰 페이지
│   │   ├── search/         # 검색 페이지
│   │   └── signin/         # 회원가입 페이지
│   ├── components/         # 컴포넌트
│   ├── constants/          # 정적 데이터
│   ├── contexts/           # React 컨텍스트
│   ├── data/               # 더미데이터
│   ├── hooks/              # 커스텀 훅
│   ├── stores/             # zustand 상태관리
│   └── styles/             # 스타일시트
├── .babelrc                # Babel 설정 파일
├── .eslintrc.json          # ESLint 설정 파일
├── .gitignore              # Git에서 제외할 파일 목록
├── README.md               # 프로젝트 설명 문서
├── jsconfig.json           # JavaScript 설정 파일
├── next.config.mjs         # Next.js 설정 파일
├── package.json            # 프로젝트 메타데이터 및 의존성 목록
└── yarn.lock               # 정확한 패키지 버전 잠금 파일
```
<br/>

# 7. Development Workflow (개발 워크플로우)

## Git Conventions

### Commit 규칙

- Commit 메세지
- ex) feat(#10): 검색 결과 필터링 기능 추가

```tsx
git add .
git commit -m "feat(#10): 무엇을 작업"
git push origin 현재 작업 브랜치명
```

| Type       | 의미                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| `Feat`     | 새로운 기능 추가                                                                     |
| `Design`   | 사용자 UI 및 CSS 파일 추가 · 수정                                                    |
| `Chore`    | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore                                   |
| `Fix`      | 버그 수정                                                                            |
| `Style`    | 코드의 구조,형식 개선 (코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우) |
| `Docs`     | 문서 수정                                                                            |
| `Refactor` | 코드 리팩토링                                                                        |
| `Test`     | 테스트 코드, 리팩토링 테스트 코드 추가                                               |
| `Comment`  | comment 필요한 주석 추가 및 변경                                                     |
| `File`     | 파일 또는 폴더명 수정, 이동, 삭제 등의 작업만 수행한 경우                            |
| `!HOTFIX`  | 급하게 치명적인 버그를 고쳐야 하는 경우                                              |

<br/>

### Pull Request 규칙

```
  자주 커밋하고 PR은 300자가 넘지 않도록 주의! (자주 PR)
```

- **develop 브랜치**로 PR 날리기
- PR 제목은 commit 메세지랑 똑같이
  - 제목: **[Feat]** 핵심적인 부분만 간략하게
  - 내용: 간결하게 리스트 방식으로
- merge는 reviewer가 해주기
  : 코드 관련 수정사항, 질문 등 코멘트 남기기

<br/>

### 팀원 리뷰 후 Merge

→ PR 리뷰 시에는 해당 브랜치로 checkout 한 후 확인

→ Approve 이후 Merge 진행

## 브랜치 전략 (Branch Strategy)

### Branch 생성

- **브랜치명**
  : 기능/#이슈번호  
   ex) `feat/#11`, `chore/#5`, `refactor/#8`

```
브랜치 생성 및 이동
git checkout -b 브랜치명
```

- 브랜치 종류
  ### | **branch 종류**
  - `main`: 배포 브랜치
  - `develop`: 개발 브랜치
  - `기능/#이슈번호`: 세부 개발 브랜치

<br/>

# 8. 컨벤션 및 코드리뷰 수행 결과

![image](https://github.com/user-attachments/assets/ec5efe88-1a68-428c-be11-e1a461ba4e62)

![image](https://github.com/user-attachments/assets/2963dc56-a72b-4a09-9573-5b43f405aaee)

![image](https://github.com/user-attachments/assets/a49d6122-0626-4d8c-98e7-3cfda6cee807)

![image](https://github.com/user-attachments/assets/cdb78213-06a1-4456-b937-7ee47d979d95)

![image](https://github.com/user-attachments/assets/cd19bfc4-1369-4268-a911-d31bb3240ae8)

