import { SvgIcon } from "@material-ui/core";
import React from "react";

interface Props {
  color: string;
}

const ChevronLeftIcon: React.FC<Props> = ({ color }: Props) => {
  return (
    <SvgIcon
      htmlColor={color}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0384 13.2803C9.74549 13.5732 9.27061 13.5732 8.97772 13.2803L4.72772 9.03033C4.43483 8.73744 4.43483 8.26256 4.72772 7.96967L8.97772 3.71967C9.27061 3.42678 9.74549 3.42678 10.0384 3.71967C10.3313 4.01256 10.3313 4.48744 10.0384 4.78033L6.31871 8.5L10.0384 12.2197C10.3313 12.5126 10.3313 12.9874 10.0384 13.2803Z"
      />
    </SvgIcon>
  );
};

export default ChevronLeftIcon;
