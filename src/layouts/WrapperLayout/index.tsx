import { FC, PropsWithChildren, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { AuthLayout } from 'layouts/AuthLayout';
import { MainLayout } from 'layouts/MainLayout';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export const WrapperLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname, push } = useRouter();
  const { data, status } = useSession();

  const checkUserInDb = useCallback(async () => {
    const res = await axios.get(`http://localhost:4000/users?email=${data?.user?.email}`);
    const user = res.data;
    if (user.length === 0) {
      try {
        // const id = uuidv4();
        await axios.post(
          'http://localhost:4000/users',
          {
            id: data?.user?.email,
            email: data?.user?.email,
            password: '',
            name: data?.user?.name,
            image: data?.user?.image,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        push('/google');
      } catch (e) {
        console.error(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    if (status === 'authenticated') {
      checkUserInDb();
    }
  }, [status, data, checkUserInDb]);
  return (
    <>
      {pathname === '/login' || pathname === '/registration' || pathname === '/google' ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
};
