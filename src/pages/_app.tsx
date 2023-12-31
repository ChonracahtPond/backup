// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { SessionProvider } from "next-auth/react"

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }: any) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

import React, { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Simulate checking login state
    // Replace with actual login state management logic
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If not logged in and not on the login page, redirect to login page
    if (!isLoggedIn && router.pathname !== "/login") {
      router.push("/login");
    }

    // If logged in and on the login page, redirect to welcome page
    if (isLoggedIn && router.pathname === "/login") {
      router.push("/welcome");
    }
  }, [router.pathname]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>my-firstall</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
