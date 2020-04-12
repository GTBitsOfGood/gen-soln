import urls from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const getDefaultNonprofitIdRequest = async () =>
  fetchRequestWithPayloadResponse<string>(urls.apis.getDefaultNonprofitId);
