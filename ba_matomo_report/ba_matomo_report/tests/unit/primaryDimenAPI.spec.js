import { callApi } from "../../src/services/api.js";

describe("check primary dimension", () => {
  it("check primary dimension amount of event Action", async () => {
    let data = await callApi(
      process.env.TOKEN,
      "Events.getName",
      "2022-06-22",
      "2022-06-23"
    );

    //return object includes label "plantshop.t-systems-mms.com.en"

    let match = data.filter(
      (e) => e.label === "plantshop.t-systems-mms.com.en"
    );

    //check
    expect(match !== []).toBe(true);
  });
});
