import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import {
  DatePageInformation,
  DatePaginatedEventCards,
  LocationPageInformation,
  LocationPaginatedEventCards
} from "utils/types";

export const getUpcomingEvents = async (
  datePageInformation: DatePageInformation
) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "GET"
    },
    datePageInformation
  );

export const getNearestEvents = async (
  locationPageInformation: LocationPageInformation
) =>
  fetchRequestWithPayloadResponse<LocationPaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "GET"
    },
    locationPageInformation
  );
