import { subDataTableAPI } from "../../src/services/api.js";

describe("check secondary dimension", () => {
  it("check subdata from primary dimension", async () => {
    let getData = await subDataTableAPI(
      process.env.TOKEN,
      "Events.getName",
      "eventAction",
      "2022-06-22",
      "2022-06-23"
    );
    // expect 4 elements
    expect(getData.length).toBe(4);
  });
});
