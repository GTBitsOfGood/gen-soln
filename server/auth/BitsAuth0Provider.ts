import Providers from "next-auth/providers";

import config from "config";

const BitsAuth0Provider = Providers.Auth0({
  clientId: config.auth0.clientId as string,
  clientSecret: config.auth0.clientSecret as string,
  domain: config.auth0.domain as string
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
BitsAuth0Provider.profile = (auth0Profile: any): any => {
  return {
    id: auth0Profile.sub,
    firstName: auth0Profile.given_name,
    lastName: auth0Profile.family_name,
    email: (auth0Profile.email as string)?.toLowerCase(),
    emailVerified: auth0Profile.email_verified,
    image: auth0Profile.picture
  };
};

export default BitsAuth0Provider;
