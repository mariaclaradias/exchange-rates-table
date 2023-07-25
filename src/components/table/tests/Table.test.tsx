import { act, render, screen, waitFor } from "@testing-library/react";
import { Table } from "../Table";

describe("Table", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            timestamp: 1690156563,
            base: "EUR",
            date: "2023-07-23",
            rates: {
              AED: 4.086458,
              AFN: 95.260729,
              ALL: 101.037135,
            },
          }),
      })
    ) as jest.Mock;
  });

  test("should render the table header content", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => render(<Table />));

    const columnHeader1 = screen.getByText("Moeda");
    const columnHeader2 = screen.getByText("Valor (em BRL)");
    const columnHeader3 = screen.getByText("Horário");

    await waitFor(() => {
      expect(columnHeader1).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(columnHeader2).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(columnHeader3).toBeInTheDocument();
    });
  });

  test("should render the Table component content", async () => {
    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText("AED")).toBeInTheDocument();
    });
  });
});
