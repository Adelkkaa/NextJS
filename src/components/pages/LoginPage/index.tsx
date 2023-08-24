import React from 'react';
import { LoginForm } from './ui/form';
import { AuthLayout } from 'components/layouts/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
