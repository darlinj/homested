import {defineFeature, loadFeature} from 'jest-cucumber';
import App from '../../../App';
import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

const feature = loadFeature('./src/features/login.feature');

jest.mock('aws-amplify');

defineFeature(feature, test => {
  let wrapper;

  beforeEach(() => {});

  afterEach(() => {
    Auth.currentSession.mockClear();
  });

  const whenGoToTheRootPage = when => {
    when('I go to the root page', () => {
      mockLoggedOutSession();
      act(() => {
        wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );
      });
    });
  };

  const WhenGoToTheRootPageLoggedIn = when => {
    when('I go to the root page', async () => {
      mockLoggedInSession();
      await act(async () => {
        wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );
      });
    });
  };

  const mockLoggedOutSession = () => {
    Auth.currentSession.mockRejectedValue('error');
  };

  const mockLoggedInSession = () => {
    Auth.currentSession.mockResolvedValue('success');
  };

  test('Show the login page as default', ({when, then, and}) => {
    whenGoToTheRootPage(when);

    then('I see the login page', () => {
      expect(wrapper.find('Login').exists()).toBe(true);
    });

    and('I am logged out', () => {
      expect(wrapper.text()).toContain('Login');
    });
  });

  test('Logging in successfully', ({when, and, then}) => {
    whenGoToTheRootPage(when);

    and('I log in with valid credentials', async () => {
      await act(async () => {
        const email = wrapper.find('input[type="email"]');
        email.simulate('change', {target: {value: 'validuser@bt.com'}});
        const password = wrapper.find('input[type="password"]');
        password.simulate('change', {target: {value: 'password'}});
        wrapper.find('form').simulate('submit');
      });
    });

    then('I see that I am logged in', () => {
      expect(wrapper.text()).toContain('Logout');
    });
  });

  test('Show log out when I am logged in', ({when, then}) => {
    WhenGoToTheRootPageLoggedIn(when);

    then('I should see the logout link', () => {
      expect(wrapper.text()).toContain('Logout');
    });
  });
});
