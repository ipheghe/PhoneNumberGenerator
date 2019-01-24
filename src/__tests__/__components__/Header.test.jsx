// react library
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';

// components
import Header from '../../components/Header';

describe('App component', () => {
  it('rshould match component snapshot', () => {
    const tree = render.create(<Header />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<Header />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.menu__container__items').length).toBe(2);
    expect(shallowWrapper.exists()).toBe(true);
  });
});