import { authConfig } from 'components/configs/auth';
import { LoginPage } from 'components/pages/LoginPage';
import { Session } from 'inspector';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import React from 'react';

const Login: NextPage = (): JSX.Element => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session | null = await getServerSession(context.req, context.res, authConfig);
  const { callbackUrl } = context.query;
  const encodedURI = typeof callbackUrl === 'string' ? encodeURI(callbackUrl) : '/';
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: `${encodedURI}` || `/`,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
};

export default Login;
