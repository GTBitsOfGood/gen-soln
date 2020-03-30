import { getOrgNames } from "server/actions/nonprofit";

// @route   GET api/getOrgNames
// @desc    Requests List of Nonprofits
// @access  Public
const handler = (req, res) => {
  getOrgNames()
    .then(names => {
      res.status(200).json({
        success: true,
        payload: names
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
