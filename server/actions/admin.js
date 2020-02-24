import bcrypt from "bcryptjs";

import Mongo from "../index";
import Admin from "../models/admin";

export async function login(email, password) {
  await Mongo();

  const responses = [
    "There is no account currently associated with this email.",
    "The password you entered is incorrect. Please try again."
  ];

  return Admin.findOne({ email: email }).then(admin => {
    if (admin) {
      return bcrypt.compare(password, admin.password).then(result => {
        return result
          ? Promise.resolve(admin)
          : Promise.reject(new Error(responses[1]));
      });
    } else {
      return Promise.reject(new Error(responses[0]));
    }
  });
}
