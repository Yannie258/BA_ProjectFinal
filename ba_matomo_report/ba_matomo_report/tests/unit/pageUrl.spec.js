import { pageUrlApi } from "../../src/services/pageUrlApi.js";
describe("check url dimension", () => {
  it("check url dimension ", async () => {
    let data = await pageUrlApi(
      process.env.TOKEN,
      "1",
      "2022-06-22",
      "2022-06-23"
    );
    // expect 4 elements

    expect(data.length).toBe(4);
  });
});
