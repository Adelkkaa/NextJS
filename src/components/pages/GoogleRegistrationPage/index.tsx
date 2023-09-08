import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import PasswordInput from 'shared/ui/PasswordInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormValues, Values } from '../RegistrationPage/ui/form';
import { useSession } from 'next-auth/react';

export type GoogleFormValues = Pick<FormValues, 'password' | 'passwordCopy'>;

type FuncSend = (password: string) => void;

export type GoogleValues = Exclude<Values, 'email' | 'name'>;

export const GoogleRegistrationPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [registryError, setRegistryError] = useState('');
  const { data, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  const registryNewUser: FuncSend = async (password) => {
    try {
      const response = await axios.get(`http://localhost:4000/users?email=${data?.user?.email}`);

      await axios.put(
        `http://localhost:4000/users/${data?.user?.email}`,
        {
          id: response.data.id,
          email: data?.user?.email,
          password,
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
      await axios.post(
        'http://localhost:4000/likedSongs',
        {
          id: data?.user?.email,
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

  const onFormSubmit = async (data: GoogleFormValues) => {
    const { password, passwordCopy } = data;
    if (password === passwordCopy) {
      registryNewUser(password), router.push(callbackUrl), toast.success('Пользователь создан');
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
        id="googleFormModal"
      >
        {['password', 'passwordCopy'].map((item) => {
          return (
            <PasswordInput
              key={item}
              name={item as GoogleValues}
              register={register}
              errors={errors}
            />
          );
        })}
        <button type="submit" form="googleFormModal" className={styles.formBtn}>
          <Typography color="black" level={4} weight="medium">
            Зарегистрироваться
          </Typography>
        </button>
        {registryError && <Typography color="red">{registryError}</Typography>}
      </form>
    </div>
  );
};
