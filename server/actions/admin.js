import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mongo from "server/index";
import Admin from "server/models/admin";
import Nonprofit from "server/models/nonprofit";

const responses = {
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD: "The password you entered is incorrect.",
  INVALID_ORG: "Please enter a valid nonprofit organization.",
  INVALID_TOKEN: "The current token is expired or invalid.",
  USER_EXISTS: "A user with this email already exists."
};

export async function login(email, password) {
  await Mongo();

  return Admin.findOne({ email: email })
    .then(async admin => {
      // if an admin with the provided email exists, use bcrypt's .compare()
      // function to determine whether the passed-in password matches the
      // hashed password stored in the database.
      if (admin)
        // if the provided password matches the one stored in the
        // database, resolve the promise.
        return (await bcrypt.compare(password, admin.password))
          ? Promise.resolve(admin)
          : Promise.reject(new Error(responses.INVALID_PASSWORD));
      else return Promise.reject(new Error(responses.INVALID_EMAIL));
    })
    .then(admin => {
      // sign a new jsonwebtoken using the newly-created admin's
      // name, email, and associated organization. as of now, the
      // token will only last for an hour.
      return jwt.sign(
        {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          org: admin.org
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h"
        }
      );
    });
}

export async function signup(fname, lname, email, password, org) {
  await Mongo();

  return Admin.countDocuments({ email: email })
    .then(count => {
      // if the admin doesn't already exist, use bcrypt's .hashSync()
      // function to salt, hash, and return the passed-in password.
      return count > 0
        ? Promise.reject(new Error(responses.USER_EXISTS))
        : bcrypt.hashSync(password, 10);
    })
    .then(hashed => {
      return Nonprofit.findOne({ name: org })
        .then(nonprofit => {
          // if the passed-in nonprofit exists, create a new admin
          // & associate it with the provided organization.
          return !nonprofit
            ? Promise.reject(new Error(responses.INVALID_ORG))
            : Admin.create({
                firstName: fname,
                lastName: lname,
                email: email,
                password: hashed,
                org: nonprofit._id
              });
        })
        .then(admin => {
          // sign a new jsonwebtoken using the newly-created admin's
          // name, email, and associated organization. as of now, the
          // token will only last for an hour.
          jwt.sign(
            {
              id: admin._id,
              firstName: admin.firstName,
              lastName: admin.lastName,
              email: admin.email,
              org: admin.org
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h"
            }
          );
        });
    });
}

export async function checkToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    return decoded
      ? Promise.resolve(decoded)
      : Promise.reject(new Error(responses.INVALID_TOKEN));
  });
}
