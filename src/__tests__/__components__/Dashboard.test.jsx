// react libraries
import React from 'react';

// third-party libraries
import { shallow, mount } from 'enzyme';
import render from 'react-test-renderer';
import { spy } from 'sinon';
import _ from 'lodash';

// components
import { Dashboard } from '../../containers/Dashboard';

const event = {
  target: {
    name: 'chosenNumber',
    value: 3,
  },
  preventDefault: spy(),
};

const props = {
  showMessage: spy(),
};

const data = [
  { id: 1, generatedNumbers: 12345 },
  { id: 2, generatedNumbers: 11345 },
  { id: 3, generatedNumbers: 11345 },
];

describe('App component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<Dashboard {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const mountWrapper = mount(<Dashboard {...props} />);
    expect(mountWrapper).toBeDefined();
    expect(mountWrapper.find('NumberInput').length).toBe(1);
    expect(mountWrapper.exists()).toBe(true);
  });

  it('should call handleChange method', () => {
    const mountWrapper = mount(<Dashboard {...props} />);
    const handleChangeSpy = spy(mountWrapper.instance(), 'handleChange');

    expect(mountWrapper.state().chosenNumber).toEqual(0);

    mountWrapper.instance().handleChange(event);
    expect(handleChangeSpy.called).toEqual(true);
    expect(mountWrapper.state().chosenNumber).toEqual(3);
  });

  it('should call handleButtonClick method', () => {
    const mountWrapper = shallow(<Dashboard {...props} />);
    const handleButtonClickSpy = spy(mountWrapper.instance(), 'handleButtonClick');

    expect(mountWrapper.state().buttonText).toEqual('Generate');

    mountWrapper.instance().handleButtonClick(event);
    expect(handleButtonClickSpy.called).toEqual(true);
    expect(mountWrapper.state().buttonText).toEqual('Generate');
  });

  it('should render text when no generated number data is available', () => {
    const shallowWrapper = mount(<Dashboard />);
    const renderTableSpy = spy(shallowWrapper.instance(), 'renderTable');
    shallowWrapper.setState({ data: null });

    shallowWrapper.instance().renderTable();
    expect(renderTableSpy.called).toEqual(true);
    expect(shallowWrapper.find('.empty_table__text').length).toEqual(1);
  });

  it('should call renderTable method', () => {
    const mountWrapper = mount(<Dashboard />);
    const renderTableSpy = spy(mountWrapper.instance(), 'renderTable');
    mountWrapper.setState({ data: [{ id: 1, generatedNumbers: 2340404040 }] });

    mountWrapper.instance().renderTable();
    expect(renderTableSpy.called).toEqual(true);
    expect(mountWrapper.find('Table').length).toEqual(1);
    expect(mountWrapper.find('DropDown').length).toEqual(1);
  });

  it('should render text when no generated number data is available', () => {
    const mountWrapper = mount(<Dashboard />);
    const renderTableSpy = spy(mountWrapper.instance(), 'renderTable');
    mountWrapper.setState({ data: null });

    mountWrapper.instance().renderTable();
    expect(renderTableSpy.called).toEqual(true);
    expect(mountWrapper.find('.empty_table__text').length).toEqual(1);
  });

  it('should sorts data by highest generated number', () => {
    const mountWrapper = mount(<Dashboard />);
    const handleSortClickSpy = spy(mountWrapper.instance(), 'handleSortClick');
    mountWrapper.setState({ data });
    const sortedData = _.orderBy(data, ['generatedNumbers'], ['desc']);
    mountWrapper.instance().handleSortClick(event, 'highest');
    expect(handleSortClickSpy.called).toEqual(true);
    expect(mountWrapper.state().data).toEqual(sortedData);
  });

  it('should sorts data by lowest generated number', () => {
    const mountWrapper = mount(<Dashboard />);
    const handleSortClickSpy = spy(mountWrapper.instance(), 'handleSortClick');
    mountWrapper.setState({ data });
    const sortedData = _.orderBy(data, ['generatedNumbers'], ['asc']);
    mountWrapper.instance().handleSortClick(event, 'lowest');
    expect(handleSortClickSpy.called).toEqual(true);
    expect(mountWrapper.state().data).toEqual(sortedData);
  });

  it('should sorts data by id', () => {
    const mountWrapper = mount(<Dashboard />);
    const handleSortClickSpy = spy(mountWrapper.instance(), 'handleSortClick');
    mountWrapper.setState({ data });
    const sortedData = _.orderBy(data, ['id']);
    mountWrapper.instance().handleSortClick(event, 'unique');
    expect(handleSortClickSpy.called).toEqual(true);
    expect(mountWrapper.state().data).toEqual(sortedData);
  });

  it('should validate number input field successfully', () => {
    const mountWrapper = mount(<Dashboard />);
    const validateFieldSpy = spy(mountWrapper.instance(), 'validateField');
    mountWrapper.setState({ chosenNumber: 2 });
    mountWrapper.instance().validateField();
    expect(validateFieldSpy.called).toEqual(true);
  });

  it('should validates number input field if float number is entered', () => {
    const mountWrapper = mount(<Dashboard {...props} />);
    const validateFieldSpy = spy(mountWrapper.instance(), 'validateField');
    mountWrapper.setState({ chosenNumber: 2.333 });
    mountWrapper.instance().validateField();
    expect(validateFieldSpy.called).toEqual(true);
    expect(mountWrapper.props().showMessage.called).toEqual(true);
  });

  it('should validates number input field if number greater than 500 is entered', () => {
    const mountWrapper = mount(<Dashboard {...props} />);
    const validateFieldSpy = spy(mountWrapper.instance(), 'validateField');
    mountWrapper.setState({ chosenNumber: 10000 });
    mountWrapper.instance().validateField();
    expect(validateFieldSpy.called).toEqual(true);
    expect(mountWrapper.props().showMessage.called).toEqual(true);
  });

  it('should call updateGeneratedNumbers method', () => {
    const mountWrapper = mount(<Dashboard {...props} />);
    const updateGeneratedNumbersSpy = spy(mountWrapper.instance(), 'updateGeneratedNumbers');
    mountWrapper.setState({ data });

    mountWrapper.instance().updateGeneratedNumbers();
    expect(updateGeneratedNumbersSpy.called).toEqual(true);
    expect(mountWrapper.find('Table').length).toEqual(1);
    expect(mountWrapper.find('DropDown').length).toEqual(1);
  });

  it('should call generatePhoneNumbers method', () => {
    const mountWrapper = mount(<Dashboard {...props} />);
    const generatePhoneNumbersSpy = spy(mountWrapper.instance(), 'generatePhoneNumbers');
    mountWrapper.setState({ data, choseNumber: 2 });
    expect(mountWrapper.state().data.length).toEqual(3);

    mountWrapper.instance().generatePhoneNumbers();
    expect(generatePhoneNumbersSpy.called).toEqual(true);
    expect(mountWrapper.props().showMessage.called).toEqual(true);
    expect(mountWrapper.state().data.length).toBeGreaterThanOrEqual(3);
  });

});
