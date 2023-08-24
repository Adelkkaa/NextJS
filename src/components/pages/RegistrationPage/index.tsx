import React from 'react';
import { RegistryForm } from './ui/form';
import { AuthLayout } from 'components/layouts/AuthLayout';

export const RegistryPage = () => {
  return (
    <AuthLayout>
      <RegistryForm />
    </AuthLayout>
  );
};
