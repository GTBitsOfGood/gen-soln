import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

const HomePage = () => {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button
            onClick={e => {
              e.preventDefault();
              signIn().catch(err => console.log(err));
            }}
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button
            onClick={e => {
              e.preventDefault();
              signIn().catch(err => console.log(err));
            }}
          >
            Sign out
          </button>
        </>
      )}
    </>
  );
};

export default HomePage;
