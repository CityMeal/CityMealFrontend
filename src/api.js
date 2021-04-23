const BASE_URL = "http://localhost:3000";

function get(url) {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      Accept: "application/json",
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
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
export { get, post };
