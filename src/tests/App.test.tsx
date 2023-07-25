import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("should render the app component correctly", async () => {
    render(<App />);
  });
});
