'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { CustomerServiceActorContext } from './customer-service-machine';

const CustomerService = dynamic(
  () => import('./customer-service').then(({ CustomerService }) => CustomerService),
  { ssr: false },
);

export function ContainerCustomerService() {
  return (
    <CustomerServiceActorContext.Provider>
      <CustomerService />
    </CustomerServiceActorContext.Provider>
  );
}
