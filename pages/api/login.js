import { login } from "server/actions/admin";

const handler = (req, res) => {
  login(req.body.email, req.body.password)
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
