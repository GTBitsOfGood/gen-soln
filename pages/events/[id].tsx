import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import urls from "config";
import { getAllEventIds, getEventById } from "server/actions/events";

const NonprofitEventPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (props.hasError) {
    return <ErrorPage statusCode={404} />;
  }

  //TODO: return event page
  return null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllEventIds();

  return { paths: ids.map(urls.pages.event), fallback: true };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
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
      }
    };
  }
};

export default NonprofitEventPage;
