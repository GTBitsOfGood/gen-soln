import {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import config from "config";
import { getAllEventIds, getEventById } from "server/actions/events";

const NonprofitEventPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  if (props.hasError) {
    return <ErrorPage statusCode={404} />;
  }

  //TODO: return event page
  return null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllEventIds();

  return { paths: ids.map(config.pages.event), fallback: true };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;

  try {
    const event = await getEventById(id);

    return {
      props: {
        event
      },
      revalidate: 1
    };
  } catch (error) {
    return {
      props: {
        hasError: true
      },
      revalidate: 1
    };
  }
};

export default NonprofitEventPage;
