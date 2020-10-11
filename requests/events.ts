import config from "config";

import {
  DatePageInformation,
  DatePaginatedEventCards,
  LocationPageInformation,
  LocationPaginatedEventCards
} from "utils/types";
import { fetchRequestWithPayloadResponse } from "utils/util";

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
    config.apis.getNearestEvents,
    {
      method: "GET"
    },
    locationPageInformation
  );
