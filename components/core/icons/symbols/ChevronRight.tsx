import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const ChevronRight: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="17" height="17" viewBox="0 0 17 17" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.47772 3.71967C6.77061 3.42678 7.24549 3.42678 7.53838 3.71967L11.7884 7.96967C12.0813 8.26256 12.0813 8.73744 11.7884 9.03033L7.53838 13.2803C7.24549 13.5732 6.77061 13.5732 6.47772 13.2803C6.18483 12.9874 6.18483 12.5126 6.47772 12.2197L10.1974 8.5L6.47772 4.78033C6.18483 4.48744 6.18483 4.01256 6.47772 3.71967Z"
      />
    </SvgIcon>
  );
};

export default ChevronRight;
