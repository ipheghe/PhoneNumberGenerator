// react libraries
import React from 'react';

// third-party libraries
import { mount } from 'enzyme';
import render from 'react-test-renderer';
import { spy } from 'sinon';

// components
import DropDown from '../../components/DropDown';

const props = {
  handleSortClick: spy(),
  className: '',
};

describe('DropDown component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<DropDown {...props } />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const mountWrapper = mount(<DropDown {...props } />);
    expect(mountWrapper).toBeDefined();
    expect(mountWrapper.find('.dropdown__container').length).toBe(1);
    expect(mountWrapper.find('.dropdown__btn__item').length).toBe(3);
    expect(mountWrapper.find('.dropdown__btn__item').first().simulate('click'));
    expect(mountWrapper.exists()).toBe(true);
  });

  it('should call similate click event when any option is selected', () => {
    const shallowWrapper = mount(<DropDown {...props } />);
    const firstButtonClick = shallowWrapper.find('.dropdown__btn__item').at(1);
    firstButtonClick.simulate('click');
    const secondButtonClick = shallowWrapper.find('.dropdown__btn__item').at(2);
    secondButtonClick.simulate('click');
    expect(shallowWrapper.props().handleSortClick.called).toBe(true);
  });
});
