import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cn from 'classnames';

import styles from './styles.module.scss';

import backIcon from '@images/HomePage/backIcon.svg';
import forwardIcon from '@images/HomePage/forwardIcon.svg';
import skeletonAvatar from '@images/HomePage/skeletonAvatar.png';
import { Typography } from 'shared/ui/Typography';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const MainHeader = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const session = useSession();

  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainNav}>
        <button className={styles.mainNavBtn} onClick={router.back}>
          <Image src={backIcon} alt="back-icon" width={40} height={40} />
        </button>
        <button className={styles.mainNavBtn} onClick={router.forward}>
          <Image src={forwardIcon} alt="back-icon" width={40} height={40} />
        </button>
      </div>
      {session.status === 'unauthenticated' ? (
        <Link className={styles.mainAuth} href={'/login'}>
          <Typography weight="semibold" color="white" level={3}>
            Sign In
          </Typography>
        </Link>
      ) : (
        <button onClick={() => setIsOpened((prev) => !prev)} className={styles.mainProfile}>
          <Image src={skeletonAvatar} alt="profile-avatar" width={34} height={34} />
          <Typography>{session.data?.user?.name || 'User'}</Typography>
          <svg
            className={cn({ 'rotate-180': isOpened }, { 'rotate-0': !isOpened })} // todo переворот оформить
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.0003 14.6667L6.41699 8.25L15.5837 8.25L11.0003 14.6667Z" fill="white" />
          </svg>
          {isOpened && (
            <div className={styles.mainOptionList}>
              <Typography onClick={() => signOut()} className={styles.mainOption}>
                Log Out
              </Typography>
            </div>
          )}
        </button>
      )}
    </header>
  );
};

export default MainHeader;
