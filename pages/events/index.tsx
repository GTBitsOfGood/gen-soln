import React from "react";
import { NextPage, InferGetServerSidePropsType } from "next";
import EventsPage from "components/events/EventsPage";
import { Dropdown } from "../../utils/types";

import { getCauses } from "server/actions/nonprofit";

const EventsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  return (
    <EventsPage
      timeFilterOptions={props.timeFilterOptions}
      causesFilterOptions={props.causesFilterOptions}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = async () => {
  // Don't remove the async otherwise InferGetStaticPropsType won't work as expected
  const timeOptions: Dropdown[] = [
    { text: "Today", value: "TODAY" },
    { text: "Tomorrow", value: "TOMORROW" },
    { text: "This Week", value: "WEEK" },
    { text: "This Weekend", value: "WEEKEND" },
    { text: "Next Week", value: "NWEEK" },
    { text: "Next Weekend", value: "NWEEKEND" }
  ];

  return {
    props: {
      timeFilterOptions: timeOptions,
      causesFilterOptions: getCauses()
    }
  };
};

export default EventsNextPage;
