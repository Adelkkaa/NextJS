import { RegistryPage } from 'components/pages/RegistrationPage';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = (): JSX.Element => (
  <>
    <Head>
      <title>Регистрация - Spotify</title>
      <meta name="description" content="Authorization" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <base href="/registration" />
    </Head>
    <RegistryPage />
  </>
);

export default Home;
