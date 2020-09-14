import Stripe from "stripe";
import Mongo, { stripeConstructor } from "server/index";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import { Nonprofit as NonprofitType } from "utils/types";
import config from "config";

type NonprofitNameWithId = Pick<NonprofitType, "name"> &
  Pick<NonprofitType, "_id">;

const stripe = stripeConstructor();

export async function createNonprofit({
  name,
  headline,
  about,
  background,
  logo,
  primaryColor,
  secondaryColor
}: NonprofitType) {
  await Mongo();

  return Nonprofit.create({
    name,
    headline,
    about,
    background,
    logo,
    primaryColor,
    secondaryColor
  });
}

export async function getNonprofitNamesWithIds(): Promise<
  NonprofitNameWithId[]
> {
  await Mongo();

  // Using exec to get a fully-fledged Promise instead of Mongoose Query.
  // This allows run-action.ts to run this function.
  return Nonprofit.find({}, { name: 1 }).lean().sort({ name: 1 }).exec();
}

export async function getNonprofitIds(): Promise<string[]> {
  await Mongo();

  // Using exec to get a fully-fledged Promise instead of Mongoose Query.
  // This allows run-action.ts to run this function.
  return Nonprofit.distinct("_id").exec();
}

export async function getNonprofitById(_id: string): Promise<NonprofitType> {
  await Mongo();

  // Exclude donation information for now:
  const nonprofit = await Nonprofit.findOne({ _id }, { donations: 0 }).lean();

  if (nonprofit == null) {
    throw new Error(errors.nonprofit.INVALID_ID);
  }

  if (Array.isArray(nonprofit)) {
    throw new Error(errors.GENERIC_TEXT);
  }

  // @ts-ignore: Temporary, until our Nonprofit Mongoose model is typed
  return nonprofit;
}

export async function getDefaultNonprofitId(): Promise<string> {
  await Mongo();

  const result = (await Nonprofit.find({}, { _id: 1 })
    .lean()
    .sort({ name: 1 })
    .limit(1)) as Array<Pick<NonprofitType, "_id">>;

  if (!result.length) {
    throw new Error(errors.nonprofit.NO_DATA);
  }

  return result[0]._id;
}

export async function createStripeAccount(): Promise<Stripe.Account["id"]> {
  const account = await stripe.accounts.create({
    type: "standard"
  });
  return account.id;
}

export async function linkStripeAccount(
  accountId: Stripe.Account["id"]
): Promise<Stripe.AccountLink["url"]> {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    /* TODO: These are placeholder URLs. They should be replaced with the URL of
         our nonprofit on-boarding form once we create that. */
    refresh_url: config.baseUrl,
    return_url: config.baseUrl,
    type: "account_onboarding"
  });
  return accountLink.url;
}
