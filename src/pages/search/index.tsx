import { NextPage, GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import Head from 'next/head';
import React from 'react';
import { authConfig } from 'components/configs/auth';
import { SearchPage as Search } from 'components/pages/SearchPage';

const SearchPage: NextPage = (): JSX.Element => (
  <>
    <Head>
      <title>Search Page</title>
      <meta name="description" content="Search page" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <base href="/" />
    </Head>
    <Search />
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session | null = await getServerSession(context.req, context.res, authConfig);
  if (session) {
    return {
      props: {
        session,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/login?callbackUrl=${context.resolvedUrl}`,
      },
    };
  }
};

export default SearchPage;
