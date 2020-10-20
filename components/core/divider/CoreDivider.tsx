import React from "react";

import { Divider } from "@material-ui/core";

type Props = React.ComponentProps<typeof Divider>;

const CoreDivider: React.FC<Props> = (props: Props) => {
  return <Divider {...props} />;
};

export default CoreDivider;
