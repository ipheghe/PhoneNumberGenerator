// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';

// components
import App from '../../App';

describe('App component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<App />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('Header').length).toBe(1);
    expect(shallowWrapper.find('Footer').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });
});
