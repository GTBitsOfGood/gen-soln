import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const ChevronUp: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="11" height="7" viewBox="0 0 11 7" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.477724 6.28033C0.184834 5.98744 0.184834 5.51256 0.477724 5.21967L4.72772 0.969668C5.02061 0.676777 5.49549 0.676777 5.78838 0.969668L10.0384 5.21967C10.3313 5.51256 10.3313 5.98744 10.0384 6.28033C9.74545 6.5732 9.27065 6.5732 8.97775 6.28033L5.25805 2.56066L1.53838 6.28033C1.24549 6.5732 0.770614 6.5732 0.477724 6.28033Z"
      />
    </SvgIcon>
  );
};

export default ChevronUp;
