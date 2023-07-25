import { waitFor } from "@testing-library/react";
import { getExchangeRate } from "../getExchangeRate";

describe(`getExchangeRate`, () => {
  let env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...env,
    };
  });

  afterEach(() => {
    process.env = env;
  });

  test("should properly call currency endpoint", async () => {
    const response = await getExchangeRate();

    await waitFor(() => {
      expect(response?.success).toBeTruthy();
    });
  });

  test("should return if proccess env is undefined", async () => {
    await waitFor(() => {
      process.env = {
        ...env,
        REACT_APP_API_KEY: undefined,
      };
    });

    const response = await getExchangeRate();

    await waitFor(() => {
      expect(response?.success).toBeUndefined();
    });
  });
});
