import styled from 'styled-components';

export const BaseTable = styled.table`
  border-collapse: collapse;
  box-shadow: 9px 7px 18px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const TableHeaderRow = styled.tr`
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

export const TableHeaderCell = styled.th`
  color: #003475;
  min-width: calc(100% + 50px);
`;

export const TableBodyRow = styled.tr`
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

export const TableTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  border-radius: 16px;
  padding: 2px;
  &:hover {
    background-color: rgba(223, 220, 220, 0.54);
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  gap: 12px;
`;