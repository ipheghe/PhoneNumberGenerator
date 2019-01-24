// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';

// components
import Footer from '../../components/Footer';

describe('Footer component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<Footer />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<Footer />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.footer__container').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });
});
