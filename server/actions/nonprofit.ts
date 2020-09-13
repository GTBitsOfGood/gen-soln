import Mongo from "server/index";
import Stripe from "stripe";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import { Nonprofit as NonprofitType } from "utils/types";
import { Query } from "mongoose";
import config from "config";

type NonprofitNameWithId = Pick<NonprofitType, "name"> &
  Pick<NonprofitType, "_id">;

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
const stripe = new Stripe(config.stripe.secret_key!, {
  apiVersion: "2020-03-02"
});

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

export async function getNonprofitNamesWithIds(): Query<NonprofitNameWithId[]> {
  await Mongo();

  return Nonprofit.find({}, { name: 1 }).lean().sort({ name: 1 });
}

export async function getNonprofitIds(): Query<string[]> {
  await Mongo();

  return Nonprofit.distinct("_id");
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
  const defaultNonprofitId = await getDefaultNonprofitId();
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    // TODO: placeholder URLs
    refresh_url: config.baseUrl + config.pages.donate(defaultNonprofitId),
    return_url: config.baseUrl + config.pages.donate(defaultNonprofitId),
    type: "account_onboarding"
  });
  return accountLink.url;
}
