import React from "react";
import { NextPage, InferGetServerSidePropsType } from "next";
import EventsPage from "components/events/EventsPage";

import { getCauses } from "server/actions/nonprofit";

const EventsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  return <EventsPage causesFilterOptions={props.causesFilterOptions} />;
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = async () => {
  // Don't remove the async otherwise InferGetStaticPropsType won't work as expected
  return {
    props: { causesFilterOptions: getCauses() }
  };
};

export default EventsNextPage;
