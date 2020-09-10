import React from "react";
import { NextPage, GetServerSideProps } from "next";
import EventsPage from "components/events/EventsPage";

const EventsNextPage: NextPage = () => {
  return <EventsPage />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // make request here!
  return {
    props: {}
  };
};

export default EventsNextPage;
