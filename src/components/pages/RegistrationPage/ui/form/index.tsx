import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from 'shared/ui/Input';
import PasswordInput from 'shared/ui/PasswordInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import Link from 'next/link';

export type FormValues = {
  email: string;
  name: string;
  password: string;
  passwordCopy: string;
};

type FuncSend = (email: string, password: string, name: string) => void;

export type Values = 'email' | 'password' | 'passwordCopy' | 'name';

export const RegistryForm = () => {
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

  const [registryError, setRegistryError] = useState('');

  const checkUserExists = async (email: string) => {
    try {
      const res = await axios.get('http://localhost:4000/users');
      const users = res.data;
      const currentUser = users.find(
        (user: { id: number; email: string; password: string; name: string } | undefined) =>
          user?.email === email,
      );
      return currentUser !== undefined;
    } catch (e) {
      console.error(e);
    }
  };

  const registryNewUser: FuncSend = async (email, password, name) => {
    try {
      // const id = uuidv4(); Из-за использования id, которые генерируются случайно json-server создает большие трудности при создании put запроса
      const { data, status } = await axios.post(
        'http://localhost:4000/users',
        {
          id: email,
          email,
          password,
          name,
          image: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      await axios.post(
        'http://localhost:4000/likedSongs',
        {
          id: email,
          tracks: [],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onFormSubmit = async (data: FormValues) => {
    const { email, password, passwordCopy, name } = data;
    if (password === passwordCopy) {
      const res = await checkUserExists(email);
      !res
        ? (registryNewUser(email, password, name),
          router.push('/login'),
          toast.success('Пользователь создан'))
        : setRegistryError('Пользователь с таким e-mail адресом уже существует');
    } else {
      setRegistryError('Пароли должны совпадать!');
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Регистрация в Spotify</h1>
      <hr className={styles.formSeparation} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={styles.formRegistry}
        id="loginFormModal"
      >
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
          {...register('name', {
            required: 'Имя пользователя обязательно',
            validate: {
              maxLength: (v) => v.length <= 255 || 'Максимальное число символов 255',
            },
          })}
          label={'Введите имя пользователя'}
          errorMessage={errors.name?.message}
          type={'text'}
        />
        {['password', 'passwordCopy'].map((item) => {
          return (
            <PasswordInput
              key={item}
              name={item as Exclude<Values, 'email' | 'name'>}
              register={register}
              errors={errors}
            />
          );
        })}
        <button type="submit" form="loginFormModal" className={styles.formBtn}>
          <Typography color="black" level={4} weight="medium">
            Зарегистрироваться
          </Typography>
        </button>
        {registryError && <Typography color="red">{registryError}</Typography>}
      </form>
      <hr className={styles.formSeparation} />
      <div className={styles.formLogin}>
        <Typography>Уже зарегистрированы?</Typography>
        <Link className={styles.formLink} href="/login">
          Авторизоваться
        </Link>
      </div>
    </div>
  );
};
