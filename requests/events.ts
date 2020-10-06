import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import {
  DatePageInformation,
  DatePaginatedEventCards,
  LocationPageInformation
} from "utils/types";

export const getUpcomingEvents = async (
  datePageInformation: DatePageInformation
) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    },
    datePageInformation
  );

export const getNearestEvents = async (
  locationPageInformation: LocationPageInformation
) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    },
    locationPageInformation
  );
