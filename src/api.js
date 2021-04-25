const BASE_URL = "http://localhost:3030";

function get(url) {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      'Accept': "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function post(url, data) {
  return fetch(`${BASE_URL}/${url}`, {
    headers: {
      'Accept': "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}



// //FILTER TO BE USE IN TWO DIFFERET PLACES
// const filterLocation = async (paremter) => {
//   const filtered = await get(`/getLocations/${parameter}`)

//   // let param = zipcode / [borughs] / addresss&newcuurentpositon //If it's an address, create it into a string or an object
//   await fetch(`${BASE_URL}/getLocations/${paramEntered}`, {
//       headers: {
//           'Accept': 'application/json',
//       },
//   })
//       .then(response => response.json())
//       .then(data => {
//           setParam(prevState => ({
//               ...prevState,
//               returnedSites: data
//           }))
//           console.log(data)

//       })
//       .catch(err => console.log(err))
// }

export { get, post };
