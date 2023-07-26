import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import { getExchangeRate } from "../../service/getExchangeRate";
import { useEffectOnce } from "usehooks-ts";
import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";
import { format } from "date-fns";
import {
  BaseTable,
  IconButtonWrapper,
  PaginationButtons,
  PaginationTitle,
  TableBodyRow,
  TableFooter,
  TableHeaderCell,
  TableHeaderRow,
  TableTitle,
  TableWrapper,
} from "./Table.styles";
import IconButton from "../icon-button/IconButton";

interface ExchangeRate {
  currency: string;
  value: number;
  date: string;
}

const columnHelper = createColumnHelper<ExchangeRate>();

const columns = [
  columnHelper.accessor("currency", {
    header: () => "Moeda",
    cell: (info) => info.getValue(),
    size: 500,
  }),
  columnHelper.accessor("value", {
    header: () => "Valor (em BRL)",
    cell: (info) => info.getValue(),
    size: 500,
  }),
  columnHelper.accessor("date", {
    header: () => "Horário",
    cell: (info) => info.getValue(),
    size: 900,
  }),
];

export const Table: FC = () => {
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const baseTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffectOnce(() => {
    getExchangeRateData();
  });

  const getExchangeRateData = async () => {
    const r = await getExchangeRate();

    if (!r) return;
    const formattedData = Object.entries(r.rates).map<ExchangeRate>(
      ([currency, value]) => ({
        currency,
        value,
        date: format(new Date(r.timestamp), "dd/MM/yyyy 'às' hh:mm"),
      })
    );
    setData(formattedData);
  };

  return (
    <TableWrapper>
      <Tooltip id="tooltip" />
      <a
        href="/#"
        data-tooltip-id="tooltip"
        data-tooltip-content="Recarregar dados"
      >
        <IconButton variant="refresh" onClick={() => getExchangeRateData()} />
      </a>

      <div>
        <BaseTable>
          <thead>
            {baseTable.getHeaderGroups().map((headerGroup) => (
              <TableHeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell key={header.id}>
                    {header.isPlaceholder ? null : (
                      <TableTitle
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <IconButtonWrapper>
                              <ArrowCircleUp size={20} weight="bold" />
                            </IconButtonWrapper>
                          ),
                          desc: (
                            <IconButtonWrapper>
                              <ArrowCircleDown size={20} weight="bold" />
                            </IconButtonWrapper>
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <div style={{ width: 28, height: 24 }} />
                        )}
                      </TableTitle>
                    )}
                  </TableHeaderCell>
                ))}
              </TableHeaderRow>
            ))}
          </thead>
          <tbody>
            {baseTable.getRowModel().rows.map((row) => (
              <TableBodyRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    <div>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </TableBodyRow>
            ))}
          </tbody>
        </BaseTable>
        <TableFooter>
          <PaginationTitle>
            {baseTable.getState().pagination.pageIndex + 1} of{" "}
            {baseTable.getPageCount()}
          </PaginationTitle>
          <PaginationButtons>
            <IconButton
              variant="backward"
              onClick={() => baseTable.previousPage()}
              disabled={!baseTable.getCanPreviousPage()}
            />
            <IconButton
              variant="forward"
              onClick={() => baseTable.nextPage()}
              disabled={!baseTable.getCanNextPage()}
            />
          </PaginationButtons>
        </TableFooter>
      </div>
    </TableWrapper>
  );
};
