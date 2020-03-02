import { checkToken } from "../../server/actions/admin.js";

export default async function(req, res) {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Admin does not have cookies."
    });
  }

  try {
    const admin = await checkToken(token);

    return res.status(200).json({
      success: true,
      payload: admin
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
