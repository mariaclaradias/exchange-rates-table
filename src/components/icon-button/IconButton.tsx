import { ArrowClockwise, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { FC } from "react";
import { ButtonBase } from "./IconButton.styles";

type Variant = "refresh" | "forward" | "backward";

interface Props {
  onClick: () => void;
  variant: Variant;
  disabled?: boolean;
}

const RefreshButton: FC<Props> = ({ onClick, variant, disabled = false }) => {
  return (
    <ButtonBase onClick={onClick} disabled={disabled}>
      {variant === "refresh" && <ArrowClockwise size={24} weight="bold" />}
      {variant === "forward" && <ArrowRight size={24} weight="bold" />}
      {variant === "backward" && <ArrowLeft size={24} weight="bold" />}
    </ButtonBase>
  );
};

export default RefreshButton;
