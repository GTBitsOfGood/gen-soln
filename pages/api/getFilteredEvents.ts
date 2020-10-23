import { NextApiRequest, NextApiResponse } from "next";

import {
  getFilteredEventsCardData,
  INVALID_COORDINATE
} from "server/actions/events";
import { getFilterValuesInQuery, FilterType, FilterValue } from "utils/filters";
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
      const causes = getFilterValuesInQuery(
        queryRecord,
        "causes" as FilterType
      ) as FilterValue<"cause">[];

      const cities = getFilterValuesInQuery(
        queryRecord,
        "locations" as FilterType
      );

      const times = getFilterValuesInQuery(
        queryRecord,
        "times" as FilterType
      ) as FilterValue<"time">[];

      let lat;
      if (queryRecord.lat === "") {
        lat = INVALID_COORDINATE;
      } else {
        lat = Number(queryRecord.lat);
      }

      let long;
      if (queryRecord.long === "") {
        long = INVALID_COORDINATE;
      } else {
        long = Number(queryRecord.long);
      }

      const page = Number(queryRecord.page);
      const totalCount = Number(queryRecord.totalCount);
      const date = queryRecord.date;

      if (
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
        causes,
        cities,
        times,
        page,
        lat,
        long,
        totalCount,
        date
      };
    }
  );
