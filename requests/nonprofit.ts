import urls from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const getDefaultNonprofitIdRequest = async (): Promise<string> =>
  fetchRequestWithPayloadResponse<string>(urls.apis.getDefaultNonprofitId);
