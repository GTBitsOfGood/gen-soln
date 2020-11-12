import config from "config";
import {
  DatePageRequest,
  DatePaginatedEventCards,
  LocationPageRequest,
  FilterPageRequest,
  FilterPaginatedEventCards,
  LocationPaginatedEventCards
} from "utils/types";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const getUpcomingEvents = async (datePageInformation: DatePageRequest) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards, DatePageRequest>(
    config.apis.getUpcomingEvents,
    {
      method: "GET"
    },
    datePageInformation
  );

export const getNearestEvents = async (
  locationPageInformation: LocationPageRequest
) =>
  fetchRequestWithPayloadResponse<
    LocationPaginatedEventCards,
    LocationPageRequest
  >(
    config.apis.getNearestEvents,
    {
      method: "GET"
    },
    locationPageInformation
  );

export const getFilteredEvents = async (
  filterPageInformation: FilterPageRequest
) =>
  fetchRequestWithPayloadResponse<FilterPaginatedEventCards, FilterPageRequest>(
    config.apis.getFilteredEvents,
    {
      method: "GET"
    },
    filterPageInformation
  );

export const getAllEvents = async (datePageInformation: DatePageRequest) =>
  fetchRequestWithPayloadResponse<DatePaginatedEventCards, DatePageRequest>(
    config.apis.getAllEvents,
    {
      method: "GET"
    },
    datePageInformation
  );
