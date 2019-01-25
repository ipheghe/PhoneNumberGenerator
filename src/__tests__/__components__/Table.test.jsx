// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import render from 'react-test-renderer';

// components
import Table from '../../components/Table';

const tableConfig = {
  serial: {
    alias: '#',
    width: 'table-col-20',
  },
  id: { alias: 'id', width: 'table-col-30' },
  generatedNumbers: { alias: 'Generated Numbers' },
};

const props = {
  config: tableConfig,
  data: [{ id: 1, generatedNumbers: 1234555 }],
  headers: Object.keys(tableConfig),
};

describe('Table Component', () => {
  const shallowWrapper = shallow(<Table {...props} />);

  it('should render Table component', () => {
    expect(shallowWrapper.find('.table-wrapper').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Table {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should display table header and body rows', () => {
    expect(shallowWrapper.find('.table-row').length).toBe(2);
  });

  it('should display table header', () => {
    expect(shallowWrapper.find('.table-header').length).toBe(1);
  });
});
