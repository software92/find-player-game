const BASE_URL = 'https://transfermarket.p.rapidapi.com';
const URL = `${BASE_URL}/competitions/get-table?id=GB1&seasonID=2022&domain=de`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '07dd671c78msh58716bc59c7e46ep1845fdjsn832fe709251d',
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
  },
};

export const getClubs = () => {
  return fetch(URL, options)
    .then((response) => response.json())
    .then((response) => response.table)
    .catch((err) => console.log(err));
};

export const getSquad = (clubId) => {
  return fetch(
    `${BASE_URL}/clubs/get-squad?id=${clubId}&saison_id=2022&domain=de`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response.squad))
    .catch((err) => console.error(err));
};
