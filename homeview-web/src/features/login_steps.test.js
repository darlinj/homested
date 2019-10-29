import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import App from '../App';
import {Auth} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

jest.mock('aws-amplify');

describe("Login", () => {
  let wrapper;

  beforeEach(() => {});

  afterEach(() => {
    Auth.currentSession.mockClear();
  });
  const mockLoggedOutSession = () => {
    Auth.currentSession.mockRejectedValue('error');
  };

  const mockLoggedInSession = () => {
    Auth.currentSession.mockResolvedValue('success');
  };

  it('Show the login page as default', async() => {
      mockLoggedOutSession();
      await act(async () => {
        wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );
      });
      expect(wrapper.find('Login').exists()).toBe(true);
      expect(wrapper.text()).toContain('Login');
  });

  it('Logging in successfully', async () => {
      mockLoggedOutSession();
      await act(async () => {
        wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );
      });
      await act(async () => {
        const email = wrapper.find('input[type="email"]');
        email.simulate('change', {target: {value: 'validuser@bt.com'}});
        const password = wrapper.find('input[type="password"]');
        password.simulate('change', {target: {value: 'password'}});
        wrapper.find('form').simulate('submit');
      });
      expect(wrapper.text()).toContain('Logout');
  });

  it('Show log out when I am logged in', async () => {
      mockLoggedInSession();
      await act(async () => {
        wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );
      });
      expect(wrapper.text()).toContain('Logout');
  });
});
