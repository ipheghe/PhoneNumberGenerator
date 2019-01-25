import React from 'react';

const ToastContext = React.createContext({});

export const Provider = ToastContext.Provider;
export const Consumer = ToastContext.Consumer;
