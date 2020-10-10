import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const ThreeBars: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="15" height="12" viewBox="0 0 15 12" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.258057 1.25C0.258057 1.05109 0.337077 0.86032 0.477727 0.71967C0.618377 0.57902 0.809147 0.5 1.00806 0.5H13.5081C13.707 0.5 13.8978 0.57902 14.0384 0.71967C14.1791 0.86032 14.2581 1.05109 14.2581 1.25C14.2581 1.44891 14.1791 1.63968 14.0384 1.78033C13.8978 1.92098 13.707 2 13.5081 2H1.00806C0.809147 2 0.618377 1.92098 0.477727 1.78033C0.337077 1.63968 0.258057 1.44891 0.258057 1.25ZM0.258057 6.25C0.258057 6.05109 0.337077 5.86032 0.477727 5.71967C0.618377 5.57902 0.809147 5.5 1.00806 5.5H13.5081C13.707 5.5 13.8978 5.57902 14.0384 5.71967C14.1791 5.86032 14.2581 6.05109 14.2581 6.25C14.2581 6.44891 14.1791 6.63968 14.0384 6.78033C13.8978 6.92098 13.707 7 13.5081 7H1.00806C0.809147 7 0.618377 6.92098 0.477727 6.78033C0.337077 6.63968 0.258057 6.44891 0.258057 6.25ZM1.00806 10.5C0.809147 10.5 0.618377 10.579 0.477727 10.7197C0.337077 10.8603 0.258057 11.0511 0.258057 11.25C0.258057 11.4489 0.337077 11.6397 0.477727 11.7803C0.618377 11.921 0.809147 12 1.00806 12H13.5081C13.707 12 13.8978 11.921 14.0384 11.7803C14.1791 11.6397 14.2581 11.4489 14.2581 11.25C14.2581 11.0511 14.1791 10.8603 14.0384 10.7197C13.8978 10.579 13.707 10.5 13.5081 10.5H1.00806Z"
      />
    </SvgIcon>
  );
};

export default ThreeBars;
