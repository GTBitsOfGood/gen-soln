import { getNonprofitNames } from "server/actions/nonprofit";

// @route   GET api/getNonprofitNames
// @desc    Requests List of Nonprofits
// @access  Public
const handler = (req, res) => {
  getNonprofitNames()
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
