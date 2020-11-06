import React from "react";

import { SvgIcon } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

const Globe: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="16" height="16" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5428 7.25H4.27599C4.42021 5.17587 5.14156 3.49378 5.85688 2.30158C5.97509 2.10456 6.09337 1.9205 6.2092 1.74982C3.72253 2.46097 1.84542 4.61601 1.5428 7.25ZM4.276 8.75H1.5428C1.84542 11.384 3.72258 13.5391 6.20929 14.2502C6.09344 14.0795 5.97512 13.8954 5.85688 13.6983C5.14157 12.5061 4.42023 10.8241 4.276 8.75ZM5.78026 8.75H10.2197C10.0792 10.4855 9.47094 11.9031 8.85688 12.9266C8.55063 13.437 8.24499 13.8457 8 14.1422C7.75501 13.8457 7.44937 13.437 7.14312 12.9266C6.52906 11.9031 5.92079 10.4855 5.78026 8.75ZM10.2198 7.25H5.78025C5.92077 5.51446 6.52905 4.09677 7.14312 3.07332C7.44937 2.56291 7.75501 2.15415 8 1.8577C8.24499 2.15415 8.55063 2.56291 8.85688 3.07332C9.47095 4.09677 10.0792 5.51446 10.2198 7.25ZM11.724 8.75C11.5798 10.8241 10.8584 12.5061 10.1431 13.6983C10.0249 13.8954 9.90656 14.0795 9.79071 14.2502C12.2774 13.5391 14.1546 11.384 14.4572 8.75H11.724ZM14.4572 7.25H11.724C11.5798 5.17587 10.8584 3.49378 10.1431 2.30158C10.0249 2.10456 9.90662 1.9205 9.7908 1.74981C12.2775 2.46096 14.1546 4.61601 14.4572 7.25ZM8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0Z"
      />
    </SvgIcon>
  );
};

export default Globe;
