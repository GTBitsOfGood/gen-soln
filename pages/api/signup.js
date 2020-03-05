import { signup } from "server/actions/admin";

const handler = (req, res) => {
  return signup(
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.password,
    req.body.org
  )
    .then(token => {
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Max-Age=604800; SameSite=Lax; Path=/`
      );

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
