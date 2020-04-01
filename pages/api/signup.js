// NOTE: This endpoint is somewhat of a security threat
// at the moment, as anyone can make a POST request and
// claim to be an admin for some particular organization.

import { signup } from "server/actions/admin";

// @route   POST api/signup
// @desc    Requests Admin Creation
// @access  Public
const handler = (req, res) => {
  signup(
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.password,
    req.body.org
  )
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
