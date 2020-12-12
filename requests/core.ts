import config from "config";
import { PaginatedNonprofitCards } from "utils/types";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const getNonProfitsByDate = () =>
  fetchRequestWithPayloadResponse<PaginatedNonprofitCards>(
    config.apis.getNonProfitsByDate,
    {
      method: "GET"
    }
  );
