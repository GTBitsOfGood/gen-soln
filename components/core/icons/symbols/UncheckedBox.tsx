import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const UncheckedBox: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon
      width="14"
      height="15"
      viewBox="0 0 14 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 2.25C1.5 2.11193 1.61193 2 1.75 2H12.25C12.3881 2 12.5 2.11193 12.5 2.25V12.75C12.5 12.8881 12.3881 13 12.25 13H1.75C1.61193 13 1.5 12.8881 1.5 12.75V2.25ZM1.75 0.5C0.7835 0.5 0 1.2835 0 2.25V12.75C0 13.7165 0.7835 14.5 1.75 14.5H12.25C13.2165 14.5 14 13.7165 14 12.75V2.25C14 1.2835 13.2165 0.5 12.25 0.5H1.75Z"
      />
    </SvgIcon>
  );
};

export default UncheckedBox;
