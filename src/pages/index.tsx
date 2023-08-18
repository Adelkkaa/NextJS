import { HomePage } from 'components/pages/HomePage/index';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = (): JSX.Element => (
  <>
    <Head>
      <title>Spotify</title>
      <meta name="description" content="Home page" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <base href="/" />
    </Head>
    <HomePage />
  </>
);

export default Home;
