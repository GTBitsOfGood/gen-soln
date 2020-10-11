import React from "react";

import { SvgIcon } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

const CheckCircle: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="17" height="17" viewBox="0 0 17 17" {...props}>
      <g clipPath="url(#clip0)">
        <path d="M12.0384 6.78033C12.3313 6.48744 12.3313 6.01256 12.0384 5.71967C11.7455 5.42678 11.2706 5.42678 10.9777 5.71967L7.00806 9.68934L5.53839 8.21967C5.24549 7.92678 4.77062 7.92678 4.47773 8.21967C4.18483 8.51256 4.18483 8.98744 4.47773 9.28033L6.47773 11.2803C6.77062 11.5732 7.24549 11.5732 7.53839 11.2803L12.0384 6.78033Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.258057 8.5C0.258057 4.08172 3.83978 0.5 8.25806 0.5C12.6763 0.5 16.2581 4.08172 16.2581 8.5C16.2581 12.9183 12.6763 16.5 8.25806 16.5C3.83978 16.5 0.258057 12.9183 0.258057 8.5ZM1.75806 8.5C1.75806 4.91015 4.66821 2 8.25806 2C11.8479 2 14.7581 4.91015 14.7581 8.5C14.7581 12.0899 11.8479 15 8.25806 15C4.66821 15 1.75806 12.0899 1.75806 8.5Z"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" transform="translate(0.258057 0.5)" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default CheckCircle;
