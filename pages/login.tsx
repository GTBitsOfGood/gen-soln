import React from "react";
import { NextPage } from "next";

// import urls from "config";
// import nextCookie from "next-cookies";
// import Router from "next/router";

import AuthPage from "components/auth/AuthPage";
// import { checkToken } from "requests/admin";

const LoginPage: NextPage = () => <AuthPage />;

// LoginPage.getInitialProps = async ctx => {
//     const { token } = nextCookie(ctx);

//     try {
//         await checkToken(token);
//         if (ctx.res) {
//             ctx.res.writeHead(302, { Location: urls.pages.index });
//             ctx.res.end();
//         } else {
//             await Router.push(urls.pages.index);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

export default LoginPage;
