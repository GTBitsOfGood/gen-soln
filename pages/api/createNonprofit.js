import { createNonprofit } from "server/actions/nonprofit";

const handler = (req, res) => {
  createNonprofit(req.body.name, req.body.about, req.body.logo, req.body.colors)
    .then(nonprofit => {
      res.status(200).json({
        success: true,
        payload: nonprofit
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
