const axios = require("axios");

async function pageUrlApi(token, flag, beginDate, endDate) {
  let data = [];
  await axios
    .post(
      `https://di-tools.t-systems-mms.com/matomo/?module=API&method=CustomDimensions.getCustomDimension&idSite=1&period=range&date=${beginDate},${endDate}&format=JSON&idDimension=5&expanded=${flag}`,
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

export { pageUrlApi };
