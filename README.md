# ⚽ Find Player Game

![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=GitHub%20Actions&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://software92.github.io/find-player-game/)
![Deploy Status](https://img.shields.io/github/actions/workflow/status/software92/find-player-game/deploy.yml?branch=master&style=flat-square&label=Deploy&logo=GitHub%20Actions&logoColor=white)

## 1. 프로젝트 소개

Find Player Game은 블러 처리된 프리미어리그 선수 이미지를 보고
선수를 맞추는 퀴즈형 웹 게임입니다.

단순한 게임 구현을 넘어,
자동완성 검색, 상태 기반 UI 변화, 초기 데이터 Preload 전략을 통해
사용자 입력 흐름과 인터랙션 경험 개선에 초점을 맞춰 개발했습니다.

## 2. 주요 기능

- 블러 처리된 선수 이미지 기반 퀴즈
- 선수 이름 자동완성 검색 기능
- 팀 이미지 호버 시 선수 목록 확인 및 클릭 입력 지원
- 오답 입력 시 힌트 제공
- 정답 입력 시 이미지 원본 공개 및 입력 제한
- 초기 로딩 시 전체 선수 데이터 preload 및 캐싱

## 3. 기술 스택

- React
- TypeScript
- React Query
- Github Actions
- Recoil
- Firebase (Realtime Database / Cloud Functions)

## 4. 기술 개선 및 최적화

### 1. 마이그레이션 (CRA → Vite, JS → TS)

기존 CRA 기반 Javascript 프로젝트를
Vite + Typescript 환경으로 마이그레이션했습니다.

- 빌드 속도 개선 (개발 생산성 향상)
- 코드 가독성 및 개발 편의성 향상
- 정적 타입을 통한 런타임 에러 사전 방지

### 2. 서버리스 아키텍처 구축 (Firebase)

외부 Football API의 호출 제한 문제를 해결하기 위해
Firebase 기반 서버리스 구조를 도입했습니다.

Cloud Functions: 외부 API 데이터를 수집 및 가공
Realtime Database: 수집된 데이터를 저장해서 클라이언트가 직접 조회하도록 구성

- API 의존도를 줄이고 안정적인 데이터 제공 구조 확보
- 외부 API 호출 횟수를 줄여 Rate Limit 문제 해결
- 클라이언트는 외부 API를 직접 호출하지 않고, DB만 조회하는 구조로 설계하여 응답 속도와 안정성을 개선

### 3. 검색 성능 최적화 (Debounce)

자동완성 검색 시 발생하는 불필요한 연산과 리렌더링을 줄이기 위해
`useDebouncedValue` 커스텀 훅을 구현했습니다.

- 입력 성능 개선 및 UX 향상

## 5. 기술 선택 이유

- TypeScript
  선수 데이터 와 상태 구조의 타입을 정의해서
  자동완성 및 정답 처리 과정에서 발생할 수 있는 오류를 줄이기 위해 도입했습니다.

- React Query
  초기 로딩 시 데이터를 캐싱해서
  불필요한 API 요청을 줄이고 빠른게 응답을 제공하기 위해 사용했습니다.

- Recoil
  정답 및 입력 상태를 전역으로 관리하기 위해 사용했으며,
  단순한 상태 구조에 적합한 가벼운 상태 관리 라이브러리를 선택했습니다

- Firebase
  - Realtime Database
    단순한 데이터 구조에서 사용하기 적합한 서버리스 데이터베이스로 선택했습니다.
  - Cloud Functions
    외부 API 데이터를 수집하고 가공하는 로직을 클라이언트와 분리하기 위해 사용했습니다.

- Github Actions
  초기에는 선수 데이터 변경 주기가 긴 특성을 고려해서 데이터 업데이트를 자동화 및 예약 실행하도록 구성했습니다.
  현재는 불필요한 API 요청 방지 하기 위해 수동 업데이트 방식으로 변경해서 사용하고 있습니다.

## 6. 사용자 경험 개선 포인트

### 1. 자동완성 기반 입력 UX 개선

1.1 사용자가 선수 이름을 정확히 기억하지 못하는 경우를 고려해서
검색어 입력 시 자동완성 목록을 제공합니다

1.2 사용자가 팀의 이미지를 호버하면 팀의 선수 목록을 제공하고
클릭으로 입력을 대체할 수 있습니다

- 입력 편의성 향상 및 진입 장벽 감소

### 2. 상태 기반 UI 변화 처리

사용자의 입력 결과에 따라 UI 상태를 변경합니다

```
오답 → 힌트 제공
정답 → 이미지 블러 해제 + 입력 비활성화
```

- 확실한 사용자 피드백
- 인터랙션 중심 UX 강화

### 3. 초기 데이터 preload 처리, Skeleton UI

게임 시작 전 전체 선수 데이터를 미리 로딩하고
로딩 상태에서 Skeleton UI를 제공합니다

- 로딩 지연 최소화
- 끊김없는 사용자 경험 제공
- 초기 진입 UX 개선

### 4. 상태 관리 전략

- Recoil을 사용해서 퀴즈 상태를 전역으로 관리
- `recoil-persist`를 사용해서 sessionStorage에 상태를 저장하고
  페이지를 새로고침하거나 종료하기 전까지 퀴즈 상태를 유지합니다

## 7. 내가 담당한 역할

- 전체 프론트엔드 개발 (단독 프로젝트)
- UI 설계 및 사용자 인터랙션 구현
- 자동완성 검색 기능 구현
- 게임 상태 관리 (정답/오답/힌트 처리)
- 초기 데이터 로딩 및 상태 처리
- 성능 최적화 (debounce, preload)

## 8. 아쉬운 점 및 개선 방향

- 테스트 코드 미구현
- 문제 다양성 기능 추가(문제 범위인 리그를 변경하거나 여러 개 동시 선택)
- 점수 및 랭킹 시스템 구현
- Next.js 기반 서버 컴포넌트 도입으로 성능 개선

## 9. 실행 방법

```bash
npm install
npm run dev
```
