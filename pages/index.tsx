import React from "react";
import { NextPage } from "next";

import DonationPage from "components/donation/DonationPage";

const IndexPage: NextPage = () => {
  // TODO: get list of non-profits from the server and send them as props to DonationPage
  return <DonationPage />;
};

export default IndexPage;
