const axios = require("axios");
// primary dimension
async function callApi(token, methods, beginDate, endDate) {
  let item = null;
  await axios
    .post(
      `https://di-tools.t-systems-mms.com/matomo/?module=API&method=${methods}&idSite=1&period=range&date=${beginDate},${endDate}&format=JSON&expanded=1`,
      null,
      {
        params: {
          token_auth: token,
        },
      }
    )
    .then((response) => (item = response.data))

    .catch((err) => console.log("Error:", err));
  return item;
}
// secondary dimension

async function subDataTableAPI(
  token,
  firstDimension,
  secondDimension,
  beginDate,
  endDate
) {
  let data = [];
  await axios
    .post(
      `https://di-tools.t-systems-mms.com/matomo/?&module=API&method=${firstDimension}&idSite=1&secondaryDimension=${secondDimension}&period=range&date=${beginDate},${endDate}&format=JSON&expanded=1`,
      null,
      {
        params: {
          token_auth: token,
        },
      }
    )
    .then((response) => (data = response.data))

    .catch((err) => console.log("Error:", err));
  return data;
}

export { callApi, subDataTableAPI };
