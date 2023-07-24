import { render, screen } from "@testing-library/react";
import { Table } from "../Table";

describe("Table", () => {
  // global.fetch = jest.fn(() =>
  //   Promise.resolve({
  //     json: () =>
  //       Promise.resolve({
  //         success: true,
  //         timestamp: 1690156563,
  //         base: "EUR",
  //         date: "2023-07-23",
  //         rates: {
  //           AED: 4.086458,
  //           AFN: 95.260729,
  //           ALL: 101.037135,
  //         },
  //       }),
  //   })
  // ) as jest.Mock;

  beforeEach(() => {});

  test("should render the Table component correctly", () => {
    render(<Table />);
  });

  test("should render the table header content", () => {
    render(<Table />);

    const columnHeader1 = screen.getByText("Moeda");
    const columnHeader2 = screen.getByText("Valor (em BRL)");
    const columnHeader3 = screen.getByText("Horário");

    expect(columnHeader1).toBeInTheDocument();
    expect(columnHeader2).toBeInTheDocument();
    expect(columnHeader3).toBeInTheDocument();
  });

  test("should render the Table component content", () => {
    render(<Table />);
    const tableContent = screen.getByText("EUR");

    expect(tableContent).toBeInTheDocument();
  });
});
