import React, { useRef, ReactNode, createRef } from 'react';
import Toast, { ToastConfig, ToastRef } from './index';

const toastRef = createRef<ToastRef>();

export const showToast = (config: ToastConfig) => {
  toastRef.current?.show(config);
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toast ref={toastRef} />
    </>
  );
};

export default ToastProvider;
