import { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import React from "react";
import { getUpcomingEventsCardDataCount, getUpcomingEventsCardData } from "server/actions/events";
import HomePageComponent from "../components/core/home/home";


const HomePage: NextPage<InferGetServerSidePropsType<
    typeof getServerSideProps
>> = props => {
    return (
        <HomePageComponent upcomingEvents={props.upcomingEventsFirstPageData} />
    );
};

export const getServerSideProps = async () => {
    const date = new Date();
    const upcomingEventsTotalCount = await getUpcomingEventsCardDataCount(date);
    const upcomingEventsFirstPageData = await getUpcomingEventsCardData({
        date: date.toJSON(),
        page: 0,
        totalCount: upcomingEventsTotalCount,
        isLastPage: false
    });

    return {
        props: {
            upcomingEventsFirstPageData
        }
    };
};

export default HomePage;
