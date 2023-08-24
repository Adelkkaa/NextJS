import React, { useState } from 'react';
import Input from 'shared/ui/Input';
import { FormValues, Values } from '../form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

import eyeLogo from '@images/AuthPage/eyeLogo.svg';

import styles from './styles.module.scss';

type Props = {
  name: Values;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};

const PasswordInput: React.FC<Props> = ({ register, name, errors }) => {
  const [isCheckPassword, setIsCheckPassword] = useState(false);

  return (
    <Input
      {...register(name as Values, {
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
        onMouseDown={() => setIsCheckPassword(true)}
        onMouseUp={() => setIsCheckPassword(false)}
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
