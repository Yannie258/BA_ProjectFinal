import { secondDimensionTranslateName } from "../../src/services/helper/secondDimension.js";

describe("check secondary method", () => {
  it("check name of APIMethod to get data for secondary dimension", () => {
    let getMethod = secondDimensionTranslateName("Ereignisname");
    expect(getMethod).toBe("eventName");
  });
});
