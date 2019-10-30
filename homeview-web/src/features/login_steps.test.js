import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import App from '../App';
import {Auth} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

jest.mock('aws-amplify');

describe('Login', () => {
  beforeEach(() => {
    Auth.signIn.mockResolvedValue('success');
  });

  afterEach(() => {
    Auth.currentSession.mockClear();
    Auth.signIn.mockClear();
  });

  const mockLoggedOutSession = () => {
    Auth.currentSession.mockRejectedValue('error');
  };

  const mockLoggedInSession = () => {
    Auth.currentSession.mockResolvedValue('success');
  };

  it('Show the login page as default', async () => {
    let wrapper;
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
    let wrapper;
    mockLoggedOutSession();
    await act(async () => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(wrapper.text()).toContain('Login');
    await act(async () => {
      const email = wrapper.find('input[type="email"]');
      email.simulate('change', {
        target: {value: 'validuser@bt.com', id: 'email'},
      });
      const password = wrapper.find('input[type="password"]');
      await password.simulate('change', {
        target: {value: 'password', id: 'password'},
      });
      wrapper.find('form').simulate('submit');
    });
    expect(Auth.signIn.mock.calls[0][0]).toBe('validuser@bt.com');
    expect(Auth.signIn.mock.calls[0][1]).toBe('password');
    expect(wrapper.text()).toContain('Logout');
  });

  it('Logging in failure', async () => {
    let wrapper;
    mockLoggedOutSession();
    Auth.signIn.mockImplementation(() => {
      throw new Error('User not found');
    });
    await act(async () => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(wrapper.text()).toContain('Login');
    await act(async () => {
      const email = wrapper.find('input[type="email"]');
      email.simulate('change', {
        target: {value: 'baduser@bt.com', id: 'email'},
      });
      const password = wrapper.find('input[type="password"]');
      await password.simulate('change', {
        target: {value: 'rubbish', id: 'password'},
      });
      wrapper.find('form').simulate('submit');
    });
    expect(Auth.signIn.mock.calls[0][0]).toBe('baduser@bt.com');
    expect(Auth.signIn.mock.calls[0][1]).toBe('rubbish');
    expect(wrapper.text()).toContain('Login failed');
  });

  it('Show log out when I am logged in', async () => {
    let wrapper;
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
