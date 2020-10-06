import React from "react";
import { CoreButton } from "@core/buttons";
import { LongArrowRightIcon } from "@core/icons";

type Props = Omit<
  React.ComponentProps<typeof CoreButton>,
  "variant" | "endIcon"
>;

const CoreButtonWithLongArrow: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <CoreButton variant="text" endIcon={<LongArrowRightIcon />} {...rest}>
      {children}
    </CoreButton>
  );
};

export default CoreButtonWithLongArrow;
