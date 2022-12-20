const BASE_URL = 'https://transfermarket.p.rapidapi.com';
const URL = `${BASE_URL}/competitions/get-table?id=GB1&seasonID=2022&domain=de`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1bb3fc8915mshab680e5712fc67cp124c14jsnd2240614ec9d',
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
  },
};

// api 요청 제한으로 5개 팀만 사용
export const getClubs = () => {
  return fetch(URL, options)
    .then((response) => response.json())
    .then((response) => response.table.slice(0, 5))
    .catch((err) => console.log(err));
};

export const getSquad = (clubId) => {
  return fetch(
    `${BASE_URL}/clubs/get-squad?id=${clubId}&saison_id=2022&domain=com`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.squad)
    .catch((err) => console.error(err));
};
