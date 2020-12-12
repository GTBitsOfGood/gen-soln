import React from "react";

import { Nonprofit } from "utils/types";

import NonprofitPageLayout from "./NonprofitPageLayout";

interface Props {
  nonprofit: Nonprofit;
}

const NonprofitPage: React.FC<Props> = nonprofit => {
  return <NonprofitPageLayout />;
};

export default NonprofitPage;
