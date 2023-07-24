import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { getExchangeRate } from '../../service/getExchangeRate';
import { useEffectOnce } from 'usehooks-ts';
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react';
import RefreshButton from '../refresh-button/RefreshButton';
import { Tooltip } from 'react-tooltip';
import { format } from 'date-fns';

const BaseTable = styled.table`
  border-collapse: collapse;
  box-shadow: 9px 7px 18px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const TableHeaderRow = styled.tr`
  th:first-child {
    padding-left: 30px;
  }
  th:last-child {
    padding-right: 30px;
  }
  th {
    padding: 30px 30px;
  }
`;

const TableHeaderCell = styled.th`
  color: #003475;
  min-width: calc(100% + 50px);
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid #eee;

  td:first-child {
    padding-left: 30px;
  }
  td:last-child {
    padding-right: 30px;
  }
  td {
    padding: 20px 30px;
  }
`;

const TableTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  border-radius: 16px;
  padding: 2px;
  &:hover {
    background-color: rgba(223, 220, 220, 0.54);
  }
`;

const TableWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

type ExchangeRate = {
  currency: string;
  value: number;
  date: string;
};

const columnHelper = createColumnHelper<ExchangeRate>();

const columns = [
  columnHelper.accessor('currency', {
    header: () => 'Moeda',
    cell: (info) => info.getValue(),
    size: 500,
  }),
  columnHelper.accessor('value', {
    header: () => 'Valor (em BRL)',
    cell: (info) => info.getValue(),
    size: 500,
  }),
  columnHelper.accessor('date', {
    header: () => 'Horário',
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
  });

  useEffectOnce(() => {
    getExchangeRateData();
  });

  const getExchangeRateData = () => {
    getExchangeRate().then((r) => {
      const formattedData = Object.entries(r.rates).map<ExchangeRate>(
        ([currency, value]) => ({
          currency,
          value,
          date: format(new Date(r.timestamp), "dd/MM/yyyy 'às' hh:mm"),
        })
      );
      setData(formattedData);
    });
  };

  return (
    <TableWrapper>
      <Tooltip id="tooltip" />
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
                          ? 'cursor-pointer select-none'
                          : '',
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </TableBodyRow>
          ))}
        </tbody>
      </BaseTable>
      <a data-tooltip-id="tooltip" data-tooltip-content="Recarregar dados">
        <RefreshButton onClick={() => getExchangeRateData()} />
      </a>
    </TableWrapper>
  );
};
