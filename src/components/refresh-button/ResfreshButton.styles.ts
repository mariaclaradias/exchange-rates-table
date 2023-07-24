import styled from 'styled-components';

export const ButtonBase = styled.button`
  background: #003475;
  color: white;
  outline: none;
  border: 0px;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: grid;
  place-content: center;
  cursor: pointer;

  &:hover {
    background: #01224b;
  }
`;
