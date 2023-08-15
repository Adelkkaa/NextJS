// import { HomePage } from "./components/pages/HomePage";
import { LoginPage } from 'components/pages/LoginPage';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = (): JSX.Element => (
  <>
    <Head>
      <title>Войти - Spotify</title>
      <meta name="description" content="Authorization" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <base href="/login" />
    </Head>
    <LoginPage />
  </>
);

export default Home;
