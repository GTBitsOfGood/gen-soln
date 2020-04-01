import { createDonation } from "server/actions/donation";

// @route   POST api/createDonation
// @desc    Creates a Donation
// @access  Public
const handler = (req, res) => {
  createDonation(req.body.fname, req.body.lname, req.body.amount, req.body.org)
    .then(donation => {
      res.status(200).json({
        success: true,
        payload: donation
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
