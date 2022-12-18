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

// selector
export const totalSquadState = selector({
  key: 'totalPlayer',
  get: ({ get }) => {
    const squads = get(squadsState);
    const totalSquads = squads.map((squad) => squad.squad);

    return totalSquads;
  },
});
