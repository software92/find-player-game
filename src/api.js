const URL =
  'https://transfermarket.p.rapidapi.com/competitions/get-table?id=GB1&seasonID=2022&domain=de';
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
