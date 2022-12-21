const BASE_URL = 'https://transfermarket.p.rapidapi.com';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b66200a805msh9de49bb31304e19p144786jsnc7f28372619d',
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
  },
};

// api 요청 제한으로 5개 팀만 사용
export const getClubs = () => {
  return fetch(
    `${BASE_URL}/competitions/get-table?id=GB1&seasonID=2022&domain=de`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.log(err));
};

export const getSquad = (clubId) => {
  return fetch(
    `${BASE_URL}/clubs/get-squad?id=${clubId}&saison_id=2022&domain=com`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};
