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
    const dados = {
      success: true,
      timestamp: 1690156563,
      base: 'EUR',
      date: '2023-07-23',
      rates: {
        AED: 4.086458,
        AFN: 95.260729,
        ALL: 101.037135,
        AMD: 432.730755,
        ANG: 2.003853,
        AOA: 919.536019,
        ARS: 298.864841,
        AUD: 1.654607,
        AWG: 2.005385,
        AZN: 1.896617,
        BAM: 1.954584,
        BBD: 2.245003,
        BDT: 120.68491,
        BGN: 1.955631,
        BHD: 0.419139,
        BIF: 3146.742095,
        BMD: 1.112558,
        BND: 1.477781,
        BOB: 7.683219,
        BRL: 5.316802,
        BSD: 1.111808,
        BTC: 0.000037005922,
        BTN: 91.165377,
        BWP: 14.629897,
        BYN: 2.806454,
        BYR: 21806.132208,
        BZD: 2.241206,
        CAD: 1.471441,
        CDF: 2847.034657,
        CHF: 0.963776,
        CLF: 0.033048,
        CLP: 911.897006,
        CNY: 7.996843,
        COP: 4420.536896,
        CRC: 596.229026,
        CUC: 1.112558,
        CUP: 29.482781,
        CVE: 110.191439,
        CZK: 24.041593,
        DJF: 197.966825,
        DKK: 7.451136,
        DOP: 62.39118,
        DZD: 149.80679,
        EGP: 34.265447,
        ERN: 16.688366,
        ETB: 61.223307,
        EUR: 1,
        FJD: 2.467984,
        FKP: 0.865538,
        GBP: 0.865648,
        GEL: 2.870505,
        GGP: 0.865538,
        GHS: 12.897975,
        GIP: 0.865538,
        GMD: 66.428732,
        GNF: 9562.050485,
        GTQ: 8.728569,
        GYD: 232.815142,
        HKD: 8.697426,
        HNL: 27.36997,
        HRK: 7.480682,
        HTG: 151.765571,
        HUF: 379.538052,
        IDR: 16716.18043,
        ILS: 4.027693,
        IMP: 0.865538,
        INR: 91.219223,
        IQD: 1456.493768,
        IRR: 47005.565917,
        ISK: 146.31212,
        JEP: 0.865538,
        JMD: 171.593235,
        JOD: 0.788915,
        JPY: 157.676157,
        KES: 158.1059,
        KGS: 97.760764,
        KHR: 4591.143387,
        KMF: 492.971795,
        KPW: 1001.253592,
        KRW: 1431.472326,
        KWD: 0.341645,
        KYD: 0.926524,
        KZT: 495.601636,
        LAK: 21222.795161,
        LBP: 16689.016081,
        LKR: 364.982907,
        LRD: 206.101045,
        LSL: 19.992416,
        LTL: 3.285094,
        LVL: 0.672975,
        LYD: 5.265724,
        MAD: 10.773996,
        MDL: 19.345963,
        MGA: 4927.933836,
        MKD: 61.481746,
        MMK: 2334.947194,
        MNT: 3835.943243,
        MOP: 8.95223,
        MRO: 397.182931,
        MUR: 51.088909,
        MVR: 17.077676,
        MWK: 1171.271234,
        MXN: 18.9018,
        MYR: 5.074934,
        MZN: 70.369329,
        NAD: 19.992667,
        NGN: 881.157356,
        NIO: 40.664698,
        NOK: 11.226648,
        NPR: 145.864243,
        NZD: 1.804062,
        OMR: 0.428054,
        PAB: 1.111908,
        PEN: 3.987419,
        PGK: 4.025495,
        PHP: 60.889979,
        PKR: 318.825327,
        PLN: 4.465783,
        PYG: 8088.967038,
        QAR: 4.050816,
        RON: 4.935416,
        RSD: 117.112133,
        RUB: 100.683216,
        RWF: 1301.190398,
        SAR: 4.173371,
        SBD: 9.2952,
        SCR: 15.003954,
        SDG: 669.195969,
        SEK: 11.591854,
        SGD: 1.481035,
        SHP: 1.353704,
        SLE: 23.235831,
        SLL: 21973.015684,
        SOS: 632.487434,
        SRD: 42.756155,
        STD: 23027.699505,
        SVC: 9.728947,
        SYP: 2795.336316,
        SZL: 20.018544,
        THB: 38.283392,
        TJS: 12.180421,
        TMT: 3.893952,
        TND: 3.413886,
        TOP: 2.606334,
        TRY: 29.991331,
        TTD: 7.546305,
        TWD: 34.864236,
        TZS: 2718.508184,
        UAH: 40.862375,
        UGX: 4048.481032,
        USD: 1.112558,
        UYU: 42.263703,
        UZS: 12908.96803,
        VEF: 3218287.76719,
        VES: 32.320767,
        VND: 26320.335342,
        VUV: 130.214429,
        WST: 2.985117,
        XAF: 655.549117,
        XAG: 0.045206,
        XAU: 0.000567,
        XCD: 3.006743,
        XDR: 0.820889,
        XOF: 655.549117,
        XPF: 119.574373,
        YER: 278.528956,
        ZAR: 19.997714,
        ZMK: 10014.348323,
        ZMW: 21.653527,
        ZWL: 358.243147,
      },
    };
    const formattedData = Object.entries(dados.rates).map<ExchangeRate>(
      ([currency, value]) => ({
        currency,
        value,
        date: format(new Date(dados.timestamp), "dd/MM/yyyy 'às' hh:mm"),
      })
    );
    setData(formattedData);
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
