import { checkToken } from "server/actions/admin.js";

const handler = (req, res) => {
  if (!req.body.token)
    res.status(400).json({
      success: false,
      message: "Admin doesn't have cookies."
    });

  checkToken(req.body.token)
    .then(admin => {
      res.status(200).json({
        success: true,
        payload: admin
      });
    })
    .catch(error => {
      res.status(400).json({
        success: false,
        message: error.message
      });
    });
};

export default handler;
