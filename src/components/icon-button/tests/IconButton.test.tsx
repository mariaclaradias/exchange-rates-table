import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "../IconButton";

test("renders button", () => {
  const onClick = jest.fn();

  render(<IconButton variant="refresh" onClick={onClick} />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
