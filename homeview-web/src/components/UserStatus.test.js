import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserStatus from './UserStatus';

configure({ adapter: new Adapter() })

describe('The user status container', () => {
  it('shows the login link by default', () => {
    const wrapper = mount(<UserStatus />);
    const nav = wrapper.find('a.nav-link').first();
    expect(nav.text()).toBe('Login');
  });

  it('shows the logout link when logged out', () => {
    const someMethod = () => {};
    const wrapper = mount(<UserStatus isAuthenticated={true} handleLogout={someMethod} />);
    //console.log(wrapper.debug());
    const nav = wrapper.find('div.nav-item').first();
    expect(nav.text()).toBe('Logout');
    expect(nav.props().onClick).toBe(someMethod);
  });
});
