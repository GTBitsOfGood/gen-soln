import { SvgIcon } from "@material-ui/core";
import React from "react";

interface Props {
  color: string;
}

const UncheckedIcon: React.FC<Props> = ({ color }: Props) => {
  return (
    <SvgIcon htmlColor={color} viewBox="0 0 16 16" fontSize="inherit">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 2.75C2.5 2.61193 2.61193 2.5 2.75 2.5H13.25C13.3881 2.5 13.5 2.61193 13.5 2.75V13.25C13.5 13.3881 13.3881 13.5 13.25 13.5H2.75C2.61193 13.5 2.5 13.3881 2.5 13.25V2.75ZM2.75 1C1.7835 1 1 1.7835 1 2.75V13.25C1 14.2165 1.7835 15 2.75 15H13.25C14.2165 15 15 14.2165 15 13.25V2.75C15 1.7835 14.2165 1 13.25 1H2.75ZM11.7803 6.28033C12.0732 5.98744 12.0732 5.51256 11.7803 5.21967C11.4874 4.92678 11.0126 4.92678 10.7197 5.21967L6.75 9.18934L5.28033 7.71967C4.98744 7.42678 4.51256 7.42678 4.21967 7.71967C3.92678 8.01256 3.92678 8.48744 4.21967 8.78033L6.21967 10.7803C6.51256 11.0732 6.98744 11.0732 7.28033 10.7803L11.7803 6.28033Z"
      />
    </SvgIcon>
  );
};

export default UncheckedIcon;
