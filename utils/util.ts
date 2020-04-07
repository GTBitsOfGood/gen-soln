import { NextApiRequest, NextApiResponse } from "next";

export const pathWithDonate = (path = "[id]") => `/donate/${path}`;

export const handleRequestsWithPayloadResponse = async (
  req: NextApiRequest,
  res: NextApiResponse,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  callback: (body: NextApiRequest["body"]) => Promise<any>,
  bodyHasProperties: string[] = []
) => {
  try {
    if (bodyHasProperties.some(property => !(property in req.body))) {
      res.status(400).json({
        success: false,
        message: `One or more of the following properties was missing in req.body: [${bodyHasProperties}]`
      });
    }

    const payload = await callback(req.body);
    res.status(200).json({
      success: true,
      payload
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
