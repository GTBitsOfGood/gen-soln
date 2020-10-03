import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import { DatePageInformation, DatePaginatedEventCards } from "utils/types";

export const getUpcomingEvents = async (
  datePageInformation: DatePageInformation
) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ datePageInformation })
    }
  );
