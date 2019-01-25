// react lib imports
import React, { Component } from 'react';

// styles
import './Toast.scss';

// components
import { Provider } from './ToastContext';

/**
 * The represents the Toast Provider component
 *
 * @returns {JSX} JSX
 */
export default class ToastProvider extends Component {
  state = {
    message: null,
    className: '',
  };

  /**
   * This method shows toast message
   *
   * @param {string} message - message
   * @param {string} className - className
   * @return {void}  null
   */
  showMessage = (message, className) => {
    this.setState({ message, className }, () => this.hideMessage());
  };

  /**
   * This method hides toast message
   *
   * @return {void}  null
   */
  hideMessage = () => {
    const { timeOut } = this.props;
    setTimeout(() => {
      this.setState({ message: null, className: '' });
    }, timeOut || 3000);
  };

  /**
   * Renders Toast Provider
   *
   * @returns {JSX} jsx
   */
  render() {
    const { children } = this.props;
    const { message, className } = this.state;
    return (
      <Provider value={{
        className,
        message,
        showMessage: this.showMessage,
        hideMessage: this.hidemessage,
      }}>
        {children}
      </Provider>
    );
  }
}
