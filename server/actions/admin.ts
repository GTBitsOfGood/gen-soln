import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mongo from "server/index";
import Admin from "server/models/admin";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import config from "config";
import {
  ISignTokenInput,
  ILoginInput,
  ISignupInput,
  ICheckTokenInput,
  ITokenPayload,
  IAdminDocument
} from "utils/types";

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = "1d";

const jwtSignAdmin = ({
  _id,
  firstName,
  lastName,
  email,
  nonprofitId
}: ISignTokenInput): string =>
  jwt.sign(
    {
      id: _id,
      firstName,
      lastName,
      email,
      nonprofitId
    },
    config.jwtSecret!,
    {
      expiresIn: JWT_EXPIRES_IN
    }
  );

export async function login({
  email,
  password
}: ILoginInput): Promise<string | never> {
  await Mongo();

  const admin: IAdminDocument | null = await Admin.findOne({ email });
  if (admin) {
    if (!(await bcrypt.compare(password, admin.password))) {
      throw new Error(errors.admin.INVALID_LOGIN);
    }

    return jwtSignAdmin(admin);
  }

  throw new Error(errors.admin.INVALID_LOGIN);
}

export async function signup({
  firstName,
  lastName,
  email,
  password,
  nonprofitId
}: ISignupInput): Promise<string | never> {
  await Mongo();

  if (await Admin.exists({ email })) {
    throw new Error(errors.admin.USER_EXISTS);
  }

  const nonprofit: boolean = await Nonprofit.exists({ _id: nonprofitId });
  if (nonprofit) {
    const admin: IAdminDocument = await Admin.create({
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

export function checkToken({ token }: ICheckTokenInput): ITokenPayload | never {
  try {
    return jwt.verify(token, config.jwtSecret!) as ITokenPayload;
  } catch {
    throw new Error(errors.admin.INVALID_TOKEN);
  }
}
