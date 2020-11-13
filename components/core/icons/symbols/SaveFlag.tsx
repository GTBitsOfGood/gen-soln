import React from "react";

import { SvgIcon } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

const SaveFlag: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="10" height="14" viewBox="0 0 10 14" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 1.5C1.61193 1.5 1.5 1.61193 1.5 1.75V11.6608L4.52322 9.1711C4.80016 8.94298 5.19984 8.94298 5.47678 9.1711L8.5 11.6608V1.75C8.5 1.61193 8.3881 1.5 8.25 1.5H1.75ZM0 1.75C0 0.7835 0.7835 0 1.75 0H8.25C9.2165 0 10 0.7835 10 1.75V13.25C10 13.5402 9.8326 13.8044 9.5701 13.9283C9.3076 14.0521 8.9973 14.0134 8.7732 13.8289L5 10.7216L1.22678 13.8289C1.00275 14.0134 0.69238 14.0521 0.42991 13.9283C0.16744 13.8044 0 13.5402 0 13.25V1.75Z"
      />
    </SvgIcon>
  );
};

export default SaveFlag;
