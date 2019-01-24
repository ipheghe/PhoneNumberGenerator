// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';
import { spy } from 'sinon';

// components
import App from '../../App';

const event = {
  target: {
    name: 'chosenNumber',
    value: 3,
    selectedOptions: [
      { innerHTML: 'selected name' },
    ],
  },
  preventDefault: spy(),
};

describe('App component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<App />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('div').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should call handleChange method', () => {
    const shallowWrapper = shallow(<App />);
    const handleChangeSpy = spy(shallowWrapper.instance(), 'handleChange');

    expect(shallowWrapper.state().chosenNumber).toEqual(0);

    shallowWrapper.instance().handleChange(event);
    expect(handleChangeSpy.called).toEqual(true);
    expect(shallowWrapper.state().chosenNumber).toEqual(3);
  });

  it('should call handleButtonClick method', () => {
    const shallowWrapper = shallow(<App />);
    const handleButtonClickSpy = spy(shallowWrapper.instance(), 'handleButtonClick');

    expect(shallowWrapper.state().buttonText).toEqual('Generate');

    shallowWrapper.instance().handleButtonClick(event);
    expect(handleButtonClickSpy.called).toEqual(true);
    expect(shallowWrapper.state().buttonText).toEqual('Generating Numbers.....');
  });
});
