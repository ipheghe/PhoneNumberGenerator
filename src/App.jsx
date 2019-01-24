// react imports
import React, { Component } from 'react';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import NumberInput from './components/NumberInput';

/**
 * Container component housing the Single-Page application
 *
 * @class App
 */
export default class App extends Component {
  /**
   * Creates an instance of App
   *
   * @param {object} props - props
   * @memberof App
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      chosenNumber: 0,
      buttonText: 'Generate',
    };
  }

  /**
   * This method handles number input change event
   *
   * @param {event} event - Sythentic event
   * @return {void}  null
   */
  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * This method handles text button Click to generate numbers
   *
   * @param {event} event - Sythentic event
   * @return {void}  null
   */
  handleButtonClick = event => {
    event.preventDefault();
    this.setState({
      buttonText: 'Generating Numbers.....',
    });
  }

  /**
   * Renders App component
   *
   * @returns {JSX} jsx
   * @memberof App
   */
  render() {
    const { chosenNumber, buttonText } = this.state;
    return (
      <div>
        <Header />
        <NumberInput
          value={chosenNumber}
          onChange={this.handleChange}
          handleButtonClick={this.handleButtonClick}
          buttonText={buttonText}
        />
        <Footer />
      </div>
    );
  }
}
