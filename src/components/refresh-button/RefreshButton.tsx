import { ArrowClockwise } from '@phosphor-icons/react';
import { FC } from 'react';
import { styled } from 'styled-components';

const ButtonBase = styled.button`
  background: #003475;
  color: white;ß
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

interface Props {
  onClick: () => void;
}

const RefreshButton: FC<Props> = ({ onClick }) => {
  return (
    <ButtonBase onClick={onClick}>
      <ArrowClockwise size={24} />
    </ButtonBase>
  );
};

export default RefreshButton;
