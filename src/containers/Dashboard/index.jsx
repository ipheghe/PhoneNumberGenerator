// react imports
import React, { Component } from 'react';

// third-party libraries import
import _ from 'lodash';
import { CSVLink } from 'react-csv';

// styles
import './Dashboard.scss';

// components
import NumberInput from '../../components/NumberInput';
import Table from '../../components/Table';
import DropDown from '../../components/DropDown';
import { Consumer } from '../../components/Toast/ToastContext';

const configuration = {
  serial: {
    alias: '#',
    width: 'table-col-20',
  },
  id: { alias: 'id', width: 'table-col-30' },
  generatedNumbers: { alias: 'Generated Numbers' },
};

/**
 * Container component housing the Single-Page application
 *
 * @class Dashboard
 */
export class Dashboard extends Component {
  /**
   * Creates an instance of App
   *
   * @param {object} props - props
   * @memberof dashboard
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      chosenNumber: 0,
      buttonText: 'Generate',
      errorMessage: '',
      data: [],
    };
  }

  /**
   * This method generates random phone numbers
   *
   * @return {void}  null
   */
  generatePhoneNumbers = () => {
    const { chosenNumber, data } = this.state;
    const { showMessage } = this.props;
    const formattedNumber = parseInt(chosenNumber, 10);
    let generatedNumber;
    let generatedData = [];

    for (let i = 1; i < formattedNumber + 1; i += 1) {
      generatedNumber = String(
        Math.floor(Math.random() * 900000000) + 100000000
      );
      const addZeroToNumbers = generatedNumber.padStart(10, '0');

      if (_.findIndex(data, { generatedNumbers: addZeroToNumbers }) === -1) {
        if (
          _.findIndex(generatedData, { generatedNumbers: addZeroToNumbers }) ===
          -1
        ) {
          generatedData.push({ generatedNumbers: addZeroToNumbers });
        }
      }
    }
    const lastId = data.sort((a, b) => b.id - a.id);
    const updatedGeneratedData = generatedData.map((item, index) => {
      item['id'] = lastId[0] ? lastId[0].id + index + 1 : 1;
      return item;
    });
    showMessage('Number(s) generated successfully', 'success');
    return updatedGeneratedData;
  };

  /**
   * This method validates input field after submitting
   *
   * @return {void}  null
   */
  validateField = () => {
    const { chosenNumber } = this.state;
    const { showMessage } = this.props;
    const formattedNumber = parseInt(chosenNumber, 10);
    if (chosenNumber % 1 !== 0) {
      showMessage('Number must be an integer', 'error');
      return false;
    }
    if (!formattedNumber || formattedNumber === 0) {
      showMessage('Please enter a number value', 'error');
      return false;
    }
    if (formattedNumber > 500) {
      showMessage('Number must be between 1 and 500', 'error');
      return false;
    }

    return true;
  };

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
  };

  /**
   * This method handles text button Click to generate numbers
   *
   * @param {event} event - Sythentic event
   * @return {void}  null
   */
  handleButtonClick = event => {
    event.preventDefault();
    this.setState(
      {
        buttonText: 'Generating Numbers.....',
      },
      () => this.updateGeneratedNumbers()
    );
  };

  /**
   * This method updates generated numbers
   *
   * @return {void}  null
   */
  updateGeneratedNumbers = () => {
    const { data } = this.state;
    const isNumberFieldValidated = this.validateField();
    if (isNumberFieldValidated) {
      const generatedNumbersData = this.generatePhoneNumbers();
      const updatedData = [...data, ...generatedNumbersData];
      this.setState({
        data: updatedData,
        buttonText: 'Generate',
      });
    } else {
      this.setState({ buttonText: 'Generate' });
    }
  };

  /**
   * This method sorts generated numbers by selected option
   *
   * @param {event} event - Sythentic event
   * @param {string} sortOption - sort option
   * @return {void}  null
   */
  handleSortClick = (event, sortOption) => {
    event.preventDefault();

    let { data } = this.state;
    if (sortOption === 'highest') {
      data = _.orderBy(data, ['generatedNumbers'], ['desc']);
    }
    if (sortOption === 'lowest') {
      data = _.orderBy(data, ['generatedNumbers'], ['asc']);
    }
    if (sortOption === 'unique') {
      data = _.sortBy(data, ['id']);
    }

    this.setState(state => (state.data !== data ? { data } : null));
  };

  /**
   * This method renders table componenet or a text if no generated number
   *
   * @return {JSX}  JSX
   */
  renderTable = () => {
    const { data } = this.state;

    if (data && data.length > 0) {
      return (
        <>
          <DropDown
            className="dropdown__dashboard"
            handleSortClick={this.handleSortClick}
          />
          <Table
            data={data}
            config={configuration}
            headers={Object.keys(configuration)}
          />
        </>
      );
    }

    return (
      <div className="empty_table__text">
        <h1>No Generated Number Yet.</h1>
        <h1>Please enter a number to be generated</h1>
      </div>
    );
  };

  /**
   * This method renders details of max, min and total numbers
   *
   * @return {JSX}  JSX
   */
  renderNumberDetails = () => {
    const { data } = this.state;
    const maxNumber = data.length
      ? _.orderBy(data, ['generatedNumbers'], ['desc'])[0].generatedNumbers
      : 0;
    const minNumber = data.length
      ? _.orderBy(data, ['generatedNumbers'], ['asc'])[0].generatedNumbers
      : 0;

    return (
      <div className="number__details">
        <p>
          Total Numbers: <span>{data.length ? data.length : 0}</span>
        </p>
        <p>
          Max Number: <span>{maxNumber}</span>
        </p>
        <p>
          Minimum Numbers: <span>{minNumber}</span>
        </p>
      </div>
    );
  };

  /**
   * This method renders download button
   *
   * @return {JSX}  JSX
   */
  renderDownloadButton = () => {
    const { data } = this.state;
    if (data && data.length) {
      return (
        <button className="download__btn">
          <CSVLink data={data}>Download Data</CSVLink>
        </button>
      );
    }
  };

  /**
   * Renders Dashboard component
   *
   * @memberof Dashboard
   * @returns {JSX} jsx
   */
  render() {
    const { chosenNumber, buttonText, data } = this.state;

    return (
      <div className="container">
        <div className="number__input__section">
          {data && this.renderNumberDetails()}
          {this.renderDownloadButton()}
        </div>
        <NumberInput
          value={chosenNumber}
          onChange={this.handleChange}
          handleButtonClick={this.handleButtonClick}
          buttonText={buttonText}
        />
        {this.renderTable()}
      </div>
    );
  }
}

/**
 * This renders the dashboard component with context
 *
 * @param {object} props - props
 * @returns {JSX} JSX
 */
export default function DashboardWithContext(props) {
  return (
    <Consumer>
      {context => <Dashboard {...props} showMessage={context.showMessage} />}
    </Consumer>
  );
}
