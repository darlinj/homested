import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {act} from 'react-dom/test-utils';

import GetCustomerform from './GetCustomerform';

configure({adapter: new Adapter()});

describe('The nav form component', () => {
  it('returns nothing by default', () => {
    const wrapper = mount(<GetCustomerform />);
    expect(wrapper.find('form').length).toBe(0);
  });

  it('renders the form if the user is authenticated', () => {
    const wrapper = mount(<GetCustomerform isAuthenticated="true" />);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('calls the getCustomerData function when the form is submitted', async () => {
    const callback = jest.fn(x => 'foo');
    const wrapper = mount(
      <GetCustomerform isAuthenticated="true" getCustomerData={callback} />,
    );
    await act(async () => {
      const searchTerm = wrapper.find('input.search-term');
      searchTerm.simulate('change', {
        target: {value: 'customer1234', id: 'search-term'},
      });
    });
    await act(async () => {
      wrapper.find('form.search-form').simulate('submit');
    });
    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe('customer1234');
  });
});
