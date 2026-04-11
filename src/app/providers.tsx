'use client';
import React from "react";
import { ProgressProvider } from '@bprogress/next/app';
import { Toaster } from '@/components/ui/sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="5px"
      color="linear-gradient(270deg, var(--accent-solid) 0%, var(--background-primary-button) 99.93%)"
      options={{ showSpinner: false, minimum: 0.8, easing: 'ease', speed: 400 }}
      shallowRouting={true}
    >
      <Toaster 
        position="bottom-right"
        expand={true}
        richColors
      />
      {children}
    </ProgressProvider>
  );
};

export default Providers;