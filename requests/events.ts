import config from "config";
import {
  DatePageRequest,
  DatePaginatedEventCards,
  LocationPageRequest,
  LocationPaginatedEventCards
} from "utils/types";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const getUpcomingEvents = async (datePageInformation: DatePageRequest) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards>(
    config.apis.getUpcomingEvents,
    {
      method: "GET"
    },
    datePageInformation
  );

export const getNearestEvents = async (
  locationPageInformation: LocationPageRequest
) =>
  fetchRequestWithPayloadResponse<LocationPaginatedEventCards>(
    config.apis.getNearestEvents,
    {
      method: "GET"
    },
    locationPageInformation
  );
