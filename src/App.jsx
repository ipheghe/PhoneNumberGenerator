// react imports
import React, { Component } from 'react';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import ToastProvider from './components/Toast/ToastProvider';
import Toast from './components/Toast';
import Dashboard from './containers/Dashboard';


/**
 * Container component housing the Single-Page application
 *
 * @class App
 */
export default class App extends Component {

  /**
   * Renders App component
   *
   * @returns {JSX} jsx
   * @memberof App
   */
  render() {
    return (
      <ToastProvider>
        <Toast />
        <Header />
        <Dashboard />
        <Footer />
      </ToastProvider>
    );
  }
}
