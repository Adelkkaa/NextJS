import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { fetchImages } from '../../../redux/features/actionCreators';

import { useSession, signOut } from 'next-auth/react';

import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const HomePage = () => {
  const { photos, isLoading, error } = useAppSelector((state) => state.imagesDataSliceReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchImages(10));
  }, []);

  const session = useSession();
  console.log(session);
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Post Page</h1>
        {session.data && (
          <Link href="#" onClick={() => signOut({ callbackUrl: '/login' })}>
            SignOut
          </Link>
        )}
        <Link className={styles.link} href={'/newPage'}>
          Перейти на другую страницу
        </Link>
      </div>
      <div className={styles.contentWrapper}>
        {error && <span>Произошла ошибка</span>}
        {isLoading && <span>Загрузка...</span>}
        {photos &&
          !error &&
          !isLoading &&
          photos.map((item) => {
            return (
              <div className={styles.photoWrapper} key={item.id}>
                <Image src={item.thumbnailUrl || item.url} width={300} height={300} alt="photo" />
                <p className={styles.photoTitle}>{item.title}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};
