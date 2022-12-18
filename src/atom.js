import { atom } from 'recoil';

export const clubsState = atom({
  key: 'clubs',
  default: [],
});

export const squadsState = atom({
  key: 'squads',
  default: [],
});
