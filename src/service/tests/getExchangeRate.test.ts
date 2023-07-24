import { getExchangeRate } from "../getExchangeRate";

describe(`getExchangeRate`, () => {
  test("should properly call currency endpoint", async () => {
    const response = await getExchangeRate();
    expect(response?.success).toBeTruthy();
  });
});
