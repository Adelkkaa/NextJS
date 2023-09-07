import React, { useState } from 'react';
import Input from 'shared/ui/Input';
import { FormValues, Values } from '../../../components/pages/RegistrationPage/ui/form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

import eyeLogo from '@images/AuthPage/eyeLogo.svg';

import styles from './styles.module.scss';

type Val = {
  password: string;
  passwordCopy: string;
  email?: string;
  name?: string;
};

type Props = {
  name: Exclude<Values, 'email' | 'name'>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<Pick<FormValues, 'password' | 'passwordCopy'>>;
};

const PasswordInput: React.FC<Props> = ({ register, name, errors }) => {
  const [isCheckPassword, setIsCheckPassword] = useState(false);

  return (
    <Input
      {...register(name, {
        required: 'Пароль обязателен',
        validate: {
          maxLength: (v) => v.length <= 255 || 'Максимальное число символов 255',
          minLength: (v) => v.length >= 8 || 'Минимальное число символов 8',
        },
      })}
      label={name === 'password' ? 'Введите пароль' : 'Повторите пароль'}
      errorMessage={errors[name]?.message}
      type={isCheckPassword ? 'text' : 'password'}
    >
      <Image
        onPointerDown={() => setIsCheckPassword(true)}
        onPointerUp={() => setIsCheckPassword(false)}
        className={styles.eyeLogo}
        src={eyeLogo}
        alt="eye-logo"
        width={32}
        height={32}
      />
    </Input>
  );
};

export default PasswordInput;
