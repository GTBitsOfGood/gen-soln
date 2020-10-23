import { NextApiRequest, NextApiResponse } from "next";

import { getFilteredEventsCardData } from "server/actions/events";
import { FilterValue } from "utils/filters";
import { handleGetRequestWithPayloadResponse } from "utils/util";

// @route   GET filtered events card data
// @desc    Gets event data given filter parameters
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleGetRequestWithPayloadResponse(
    req,
    res,
    getFilteredEventsCardData,
    ["causes", "cities", "times", "lat", "long", "page", "totalCount", "date"],
    queryRecord => {
      const { causes, cities, times, date } = queryRecord;

      const lat = Number(queryRecord.lat);
      const long = Number(queryRecord.long);
      const page = Number(queryRecord.page);
      const totalCount = Number(queryRecord.totalCount);

      if (
        typeof causes !== "string" ||
        typeof cities !== "string" ||
        typeof times !== "string" ||
        isNaN(lat) ||
        isNaN(long) ||
        isNaN(page) ||
        isNaN(totalCount) ||
        Array.isArray(date)
      ) {
        throw new Error(
          "API call to getFilteredEvents did not receive data of the expected type!"
        );
      }

      return {
        causes:
          causes === "" ? [] : (causes.split(",") as FilterValue<"cause">[]),
        cities: cities === "" ? [] : cities.split(","),
        times: times === "" ? [] : (times.split(",") as FilterValue<"time">[]),
        page,
        lat,
        long,
        totalCount,
        date
      };
    }
  );
