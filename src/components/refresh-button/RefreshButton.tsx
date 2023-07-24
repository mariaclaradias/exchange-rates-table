import { ArrowClockwise } from '@phosphor-icons/react';
import { FC } from 'react';
import { ButtonBase } from './ResfreshButton.styles';

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
