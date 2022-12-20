import { atom, selector } from 'recoil';

export const clubsState = atom({
  key: 'clubs',
  default: [],
});

export const squadsState = atom({
  key: 'squads',
  default: [],
});

export const quizState = atom({
  key: 'quiz',
  default: {},
});

export const isSquadsLoadingState = atom({
  key: 'isSquadsLoading',
  default: true,
});

// selector
export const totalPlayerState = selector({
  key: 'totalPlayer',
  get: ({ get }) => {
    const totalSquad = get(squadsState);
    let totalPlayer = [];

    // 선수 정보에 클럽 id를 포함시킴
    for (const club of totalSquad) {
      club.squad.forEach((player) => {
        totalPlayer.push({
          clubId: club.id,
          clubImage: club.clubImage,
          ...player,
        });
      });
    }

    return totalPlayer;
  },
});
