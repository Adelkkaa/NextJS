import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { menuItems } from './constants';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from 'shared/ui/Typography';
import { useRouter } from 'next/router';

const LeftMenu = () => {
  const router = useRouter();
  return (
    <div className={styles.menu}>
      <div className={styles.menuLinks}>
        {menuItems.map((item, key) => (
          <div
            className={cn({
              [styles.menuLinkThird]: key === 2,
            })}
            key={item.title}
          >
            <Link
              className={cn(styles.menuLink, {
                [styles.menuLinkActive]: router.asPath === item.link,
              })}
              href={item.link}
            >
              <Image
                className={styles.menuLinkIcon}
                src={item.icon}
                width={32}
                height={32}
                alt={`${item.title}-icon`}
              />
              <Typography className={styles.menuLinkTitle}>{item.title}</Typography>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftMenu;
