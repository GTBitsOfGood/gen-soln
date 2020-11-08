import { NextApiRequest, NextApiResponse } from "next";

import { getNonprofitsCardData } from "server/actions/core";
import { handleGetRequestWithPayloadResponse } from "utils/util";

// @route   GET nonprofts by date
// @desc    Gets nonprofts by date
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleGetRequestWithPayloadResponse(
    req,
    res,
    getNonprofitsCardData,
    ["date"],
    queryRecord => {
      const date = queryRecord.date;

      if (typeof date !== "string") {
        throw new Error(
          "API call to getNearestEvents did not receive data of the expected type!"
        );
      }

      return {
        date
      };
    }
  );
