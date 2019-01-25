// react lib imports
import React from 'react';

// styles
import './Toast.scss';

// components
import { Consumer } from './ToastContext';

/**
 * This renders the Toast component
 *
 * @returns {JSX} JSX
 */
export const Toast = ({ message, className }) => (
  <>
    {message && (
      <div className={`toast__container ${className}`}>
        <p>{message}</p>
      </div>
    )}
  </>
);

/**
 * This renders the Toast component
 *
 * @param {object} props - props
 * @returns {JSX} JSX
 */
export default function ToastWithContext(props) {
  return (
    <Consumer>
      {context => (
        <Toast
          {...props}
          message={context.message}
          className={context.className}
        />
      )}
    </Consumer>
  );
}
