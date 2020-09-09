import React from "react";
import { NextPage, GetServerSideProps } from "next";

const EventsPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  // make request here!
  return {
    props: {}
  };
};

export default EventsPage;
