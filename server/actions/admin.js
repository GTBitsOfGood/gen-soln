import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mongo from "server/index";
import Admin from "server/models/admin";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import config from "config";

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = "1d";

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

  const admin = await Admin.findOne({ email }).lean();
  if (!admin) {
    throw new Error(errors.admin.INVALID_LOGIN);
  }
  if (Array.isArray(admin)) {
    throw new Error(errors.GENERIC_TEXT);
  }
  if (!(await bcrypt.compare(password, admin.password))) {
    throw new Error(errors.admin.INVALID_LOGIN);
  }

  return jwtSignAdmin(admin);
}

export async function signup({
  firstName,
  lastName,
  email,
  password,
  nonprofitId
}) {
  await Mongo();

  if (await Admin.exists({ email })) {
    throw new Error(errors.admin.USER_EXISTS);
  }

  const nonprofitExists = await Nonprofit.exists({ _id: nonprofitId });
  if (nonprofitExists) {
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      nonprofitId,
      password: bcrypt.hashSync(password, SALT_ROUNDS)
    });

    return jwtSignAdmin(admin);
  }

  throw new Error(errors.nonprofit.INVALID_ID);
}

export function checkToken({ token }) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    throw new Error(errors.admin.INVALID_TOKEN);
  }
}
