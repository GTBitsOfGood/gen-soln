import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createNonprofitMuiTheme from "utils/theme";
import { Nonprofit } from "utils/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Accessing env variables on client side is a bit weird. See next.config.js
/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE!);

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Elements stripe={stripePromise}>
        <Head>
          <title>Donation Marketplace Solution</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider
          theme={createNonprofitMuiTheme(
            pageProps.nonprofit as Nonprofit | undefined
          )}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Elements>
    );
  }
}
