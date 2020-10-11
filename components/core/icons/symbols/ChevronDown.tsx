import React from "react";

import { SvgIcon } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

const ChevronDown: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="11" height="7" viewBox="0 0 11 7" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0384 0.719668C10.3313 1.01256 10.3313 1.48744 10.0384 1.78033L5.78838 6.0303C5.49549 6.3232 5.02061 6.3232 4.72772 6.0303L0.477724 1.78033C0.184834 1.48744 0.184834 1.01256 0.477724 0.719668C0.770614 0.426777 1.24549 0.426777 1.53838 0.719668L5.25805 4.43934L8.97775 0.719668C9.27065 0.426777 9.74545 0.426777 10.0384 0.719668Z"
      />
    </SvgIcon>
  );
};

export default ChevronDown;
