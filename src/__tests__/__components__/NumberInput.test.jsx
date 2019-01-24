// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';

// components
import NumberInput from '../../components/NumberInput';

const props = {
  value: 4,
  onChange: jest.fn(),
  buttonText: 'generate',
  handleButtonClick: jest.fn(),
};

describe('NumberInput component', () => {
  it('should match component snapshot', () => {
    const tree = render.create(<NumberInput {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const shallowWrapper = shallow(<NumberInput {...props} />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.input__container').length).toBe(1);
    expect(shallowWrapper.find('input').length).toBe(1);
    expect(shallowWrapper.find('button').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });
});
