import config from "config";
import { PaginateWithDate, PaginatedNonprofitCards } from "utils/types";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const getNonProfitsByDate = (date: PaginateWithDate) =>
  fetchRequestWithPayloadResponse<PaginatedNonprofitCards>(
    config.apis.getNonProfitsByDate,
    {
      method: "GET"
    },
    date
  );
