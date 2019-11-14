import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavForm from './NavForm';

configure({ adapter: new Adapter() })

describe('The nav form component', () => {
  it('returns nothing by default', () => {
    const wrapper = mount(<NavForm />);
    expect(wrapper.find('form').length).toBe(0);
  });

  it('renders the form if the user is authenticated', () => {
    const wrapper = mount(<NavForm isAuthenticated="true" />);
    expect(wrapper.find('form').length).toBe(1);
  });
//  xit('shows the logout link when logged out', () => {
//    const someMethod = () => {};
//    const wrapper = mount(<UserStatus isAuthenticated={true} handleLogout={someMethod} />);
//    //console.log(wrapper.debug());
//    const nav = wrapper.find('div.nav-item').first();
//    expect(nav.text()).toBe('Logout');
//    expect(nav.props().onClick).toBe(someMethod);
//  });
});
