import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import { DatePageInformation, DatePaginatedEventCards } from "utils/types";

export const getUpcomingEvents = async (
  date: string,
  page: number,
  totalCount: number
): Promise<DatePageInformation> =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ date, page, totalCount })
    }
  );
