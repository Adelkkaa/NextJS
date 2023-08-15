import Head from "next/head";
import Image from "next/image";
import React from "react";

import styles from "../../components/pages/HomePage/styles.module.css";
import Link from "next/link";
import { postApi } from "../../../redux/services/postService";

const Table: React.FC = () => {
  const { data: photos, error, isLoading } = postApi.useFetchAllPhotosQuery(3);
  return (
    <>
      <Head>
        <title>Страница таблицы</title>
        <meta name="description" content="Страница таблицы" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/images/logo.svg" />
        <base href="/table" />
      </Head>

      <div className={styles.wrapper}>
        <h1>Post Page</h1>
        <Link className={styles.link} href={"/"}>
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
                <Image
                  src={item.thumbnailUrl || item.url}
                  width={300}
                  height={300}
                  alt="photo"
                />
                <p className={styles.photoTitle}>{item.title}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Table;
