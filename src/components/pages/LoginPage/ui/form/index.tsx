import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import GoogleButton from '../googleButton';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';
import Input from 'shared/ui/Input';
import eyeLogo from '@images/eyeLogo.svg';
import Image from 'next/image';
import Link from 'next/link';

// Переместить все на JSON server.
type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm<FormValues>();

  const emailValue = useWatch({ name: 'email', control });
  const passwordValue = useWatch({ name: 'password', control });
  const [authError, setAuthError] = useState('');
  const [isCheckPassword, setIsCheckPassword] = useState(false);

  const onFormSubmit = async (data: FormValues) => {
    const { email, password } = data;
    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/newPage');
      setAuthError('');
    } else {
      console.log(res);
      setAuthError('E-mail адрес или пароль введены неверно');
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Войти в Spotify</h1>
      <GoogleButton />
      <hr className={styles.formSeparation} />
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.formLogin} id="loginFormModal">
        <Input
          {...register('email', {
            required: 'Email обязателен',
            validate: {
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Email адрес должен быть валидным',
              maxLength: (v) => v.length <= 255 || 'Максимальное число символов 255',
            },
          })}
          errorMessage={errors.email?.message}
          label={'Введите e-mail адрес'}
        />
        <Input
          {...register('password', {
            required: 'Пароль обязателен',
            validate: {
              maxLength: (v) => v.length <= 255 || 'Максимальное число символов 255',
            },
          })}
          label={'Введите пароль'}
          errorMessage={errors.password?.message}
          type={isCheckPassword ? 'text' : 'password'}
        >
          <Image
            onMouseDown={() => setIsCheckPassword(true)}
            onMouseUp={() => setIsCheckPassword(false)}
            className={styles.eyeLogo}
            src={eyeLogo}
            alt="eye-logo"
            width={32}
            height={32}
          />
        </Input>
        <button type="submit" form="loginFormModal" className={styles.formBtn}>
          <Typography color="black" level={4} weight="medium">
            Войти
          </Typography>
        </button>
        {authError && <Typography color="red">{authError}</Typography>}
      </form>
      <hr className={styles.formSeparation} />
      <div className={styles.formRegistry}>
        <Typography>Нет аккаунта?</Typography>
        <Link className={styles.formLink} href="/registration">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
