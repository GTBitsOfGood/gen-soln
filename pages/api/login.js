import { login } from "server/actions/admin";

// @route   POST api/login
// @desc    Requests Admin Login
// @access  Public
const handler = (req, res) => {
  login(req.body.email, req.body.password)
    .then(token => {
      res.status(200).json({
        success: true,
        payload: token
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
