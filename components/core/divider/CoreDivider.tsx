import React from "react";

import { Divider } from "@material-ui/core";

type Props = React.ComponentProps<typeof Divider>;

const CoreDivider: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;
  return <Divider {...rest} />;
};

export default CoreDivider;
