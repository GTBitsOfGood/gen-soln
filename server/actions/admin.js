import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mongo from "server/index";
import Admin from "server/models/admin";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import config from "config";

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = "1d";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const jwtSignAdmin = ({ _id, firstName, lastName, email, nonprofitId }) =>
  jwt.sign(
    {
      id: _id,
      firstName,
      lastName,
      email,
      nonprofitId
    },
    config.jwtSecret,
    {
      expiresIn: JWT_EXPIRES_IN
    }
  );

export async function login({ email, password }) {
  await Mongo();

  const admin = await Admin.findOne({ email });
  if (admin) {
    if (!(await bcrypt.compare(password, admin.password))) {
      throw new Error(errors.admin.INVALID_PASSWORD);
    }

    return jwtSignAdmin(admin);
  }

  throw new Error(errors.admin.INVALID_EMAIL);
}

export async function signup({
  firstName,
  lastName,
  email,
  password,
  nonprofitId
}) {
  await Mongo();

  if (await Admin.findOne({ email })) {
    throw new Error(errors.admin.USER_EXISTS);
  }

  const nonprofit = await Nonprofit.findOne({ _id: nonprofitId });
  if (nonprofit) {
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      nonprofitId,
      password: bcrypt.hashSync(password, SALT_ROUNDS)
    });

    return jwtSignAdmin(admin);
  }

  throw new Error(errors.admin.INVALID_ORG);
}

export function checkToken({ token }) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    throw new Error(errors.admin.INVALID_TOKEN);
  }
}
