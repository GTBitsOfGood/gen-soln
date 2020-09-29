import React from "react";
import {
  NextPage,
  GetServerSideProps,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next";
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: { causesFilterOptions: await getCauses() }
  };
};

export default EventsNextPage;
