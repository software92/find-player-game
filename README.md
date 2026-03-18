# ⚽️ Find Football Player Quiz

축구 선수의 실루엣과 힌트를 보고 이름을 맞추는 인터랙티브 퀴즈 서비스입니다.

---

## 🚀 1. Project Overview (프로젝트 개요)

이 프로젝트는 간단한 웹 기반 퀴즈 게임입니다. 랜덤하게 생성되는 선수 데이터를 바탕으로 사용자가 이름을 검색하고 정답을 맞추는 과정을 담고 있습니다. 데이터 로딩 최적화와 상태 유지에 중점을 두고 개발했습니다.

### 주요 기능

- **랜덤 퀴즈 엔진**: 수많은 선수 데이터 중 무작위로 문제를 생성하고 변경합니다.
- **이미지 프로세싱**: 정답 전에는 이미지를 Blur 처리하고, 정답 시 이미지를 선명하게 바꿉니다.
- **점진적 힌트 시스템**: 사용자의 오답에 따라 힌트를 제공합니다.
- **UX 최적화**: 데이터 로딩 중 레이아웃 무너짐을 방지하는 **Shimmer Skeleton UI**를 적용했습니다.
- **상태 보존**: 새로고침 시에도 진행 중인 퀴즈가 초기화되지 않도록 **Persistence** 로직을 구현했습니다.

---

## 🛠 2. Tech Stack (기술 스택)

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-%23DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)

### State & Data

![Recoil](https://img.shields.io/badge/Recoil-ca4245?style=for-the-badge&logo=recoil&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

---

## 🎨 3. Key Features & Logic (핵심 기능 및 로직)

### ✅ Skeleton UI

실제 UI 구조와 유사한 스켈레톤 박스를 배치했습니다. `linear-gradient`와 `keyframes`를 이용한 애니메이션으로 실제 데이터가 로딩하기 전 이미지를 대체해서 시각적 안정감을 제공합니다.

### ✅ Persistence State (상태 유지)

`recoil-persist`를 활용하여 sessionStorage에 퀴즈 상태를 저장합니다. 사용자가 실수로 페이지를 새로고침하더라도 마지막으로 풀던 퀴즈를 이어서 진행할 수 있습니다.

---

## 📂 4. Project Structure (폴더 구조)

```text
src/
 ├── api/            # 외부, firebase API 요청에 대한 인스턴스 및 공통 함수
 ├── atoms/          # Recoil states (퀴즈 데이터 및 전역 상태 관리)
 └── components/     # UI 컴포넌트 (HintBox, SearchForm, Skeleton 등)
 │   └── layout/     # UI Layout 컴포넌트 (RootLayout)
 ├── hooks/          # 커스텀 훅 (useQuizGenerator, 데이터 Fetching 로직)
 ├── constant/       # API 엔드포인트, 라우터 경로 등 고정 값
 ├── types/          # 공통 Interface 및 Type 정의
 ├── styles/         # GlobalStyle 및 Theme 정의
 ├── utils/          # 유틸 함수
 ├── services/       # firebase, 외부 API 페칭 함수
 ├── routes/         # router, loader 파일
 └── pages/          # 라우팅 페이지 (Home, Submission 등)
```

## ⚙️ 5. Getting Started (시작하기)

1. 저장소 복제

```Bash
git clone [https://github.com/your-username/find-football-player.git](https://github.com/your-username/find-football-player.git)
```

2. 패키지 설치

```Bash
npm install
```

3. 로컬 서버 실행

```Bash
npm run dev
```

## 📸 6. Screenshots (스크린샷)퀴즈 화면로딩(Skeleton)힌트 시스템

| 퀴즈 화면 | 로딩(Skeleton) | 힌트 시스템 |
| --------- | -------------- | ----------- |
| a         | b              | c           |

---

### 💡 팁

- **이미지 추가:** `📸 6. Screenshots` 섹션에 실제 구동 영상을 GIF로 찍어서 올리면 오픈 소스나 포트폴리오로서의 가치가 훨씬 높아집니다. (추천 도구: ScreenToGif, GIPHY Capture)
- **배지 커스텀:** 상단의 기술 스택 배지 색상은 본인의 브랜드 컬러에 맞게 수정하실 수 있습니다.

이 README 구조가 마음에 드시나요? 추가하고 싶은 다른 특별한 로직이 있다면 말씀해 주세요! ⚽️
