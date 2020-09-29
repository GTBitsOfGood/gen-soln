import React from "react";
import { NextPage, GetServerSideProps, InferGetStaticPropsType } from "next";
import EventsPage from "components/events/EventsPage";

import { getCauses } from "server/actions/nonprofit";

const EventsNextPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  return <EventsPage causesFilterOptions={props.causesFilterOptions} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // make request here!
  return {
    props: {}
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  // Don't remove the async otherwise InferGetStaticPropsType won't work as expected
  return {
    props: { causesFilterOptions: getCauses() }
  };
};

export default EventsNextPage;
