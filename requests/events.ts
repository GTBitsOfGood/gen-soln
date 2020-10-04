import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import { DatePageInformation, DatePaginatedEventCards } from "utils/types";

export const getUpcomingEvents = async ({
  page,
  date,
  totalCount,
  isLastPage
}: DatePageInformation) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ page, date, totalCount, isLastPage })
    }
  );
