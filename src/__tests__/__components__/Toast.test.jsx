// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';
import { spy } from 'sinon';

// components
import { Toast } from '../../components/Toast';
import ToastProvider from '../../components/Toast/ToastProvider';

const props = {
  message: 'yes',
  className: '',
  showMessage: jest.fn(),
  hideMessage: jest.fn(),
};

jest.useFakeTimers();

describe('Toast component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<Toast {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<Toast {...props} />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.toast__container').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });
});

describe('Toast Provider component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<ToastProvider {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<ToastProvider {...props} />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should call showMessage method', () => {
    const shallowWrapper = shallow(<ToastProvider {...props} />);
    const showMessageSpy = spy(shallowWrapper.instance(), 'showMessage');
    expect(shallowWrapper.state().message).toEqual(null);

    shallowWrapper.instance().showMessage('hello', 'class');
    expect(showMessageSpy.called).toEqual(true);
    expect(shallowWrapper.state().message).toEqual('hello');
    expect(shallowWrapper.state().className).toEqual('class');
  });

  it('should call hideMessage method', () => {
    const shallowWrapper = shallow(<ToastProvider {...props} />);
    const hideMessageSpy = spy(shallowWrapper.instance(), 'hideMessage');
    shallowWrapper.setState({ message: 'hello' });

    shallowWrapper.instance().hideMessage();
    expect(shallowWrapper.state().message).toEqual('hello');
    expect(hideMessageSpy.called).toEqual(true);
    jest.runAllTimers();
    expect(shallowWrapper.state().message).toEqual(null);
  });
});
