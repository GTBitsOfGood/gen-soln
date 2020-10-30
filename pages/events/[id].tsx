import React from "react";

import {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import EventsPageDescription from "components/events/description/EventsPageEventDescription";
import config from "config";
import { getAllEventIds, getEventById } from "server/actions/events";
import { getNonprofitInfoForEventPageById } from "server/actions/nonprofit";

const NonprofitEventPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  if (props.hasError || props.event == null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <EventsPageDescription
      event={props.event}
      nonProfitInfo={props.nonProfitInfo}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllEventIds();

  return { paths: ids.map(config.pages.event), fallback: true };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;

  try {
    const event = await getEventById(id);
    const nonProfitInfo = await getNonprofitInfoForEventPageById(
      event.nonprofitId
    );

    return {
      props: {
        event,
        nonProfitInfo
      },
      revalidate: config.nextJSPageRegenerationTime
    };
  } catch (error) {
    return {
      props: {
        hasError: true
      },
      revalidate: config.nextJSPageRegenerationTime
    };
  }
};

export default NonprofitEventPage;
