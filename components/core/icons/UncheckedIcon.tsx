import { SvgIcon } from "@material-ui/core";
import React from "react";

interface Props {
  color: string;
}

const UncheckedIcon: React.FC<Props> = ({ color }: Props) => {
  return (
    <SvgIcon htmlColor={color} viewBox="0 0 16 17" fontSize="inherit">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 3.25C2.5 3.11193 2.61193 3 2.75 3H13.25C13.3881 3 13.5 3.11193 13.5 3.25V13.75C13.5 13.8881 13.3881 14 13.25 14H2.75C2.61193 14 2.5 13.8881 2.5 13.75V3.25ZM2.75 1.5C1.7835 1.5 1 2.2835 1 3.25V13.75C1 14.7165 1.7835 15.5 2.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V3.25C15 2.2835 14.2165 1.5 13.25 1.5H2.75Z"
      />
    </SvgIcon>
  );
};

export default UncheckedIcon;
