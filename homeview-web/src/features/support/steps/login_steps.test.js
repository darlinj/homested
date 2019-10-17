import {defineFeature, loadFeature} from 'jest-cucumber';
import App from '../../../App';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

const feature = loadFeature('./src/features/login.feature');

defineFeature(feature, test => {
  configure({adapter: new Adapter()});
  let wrapper;

  const whenGoToTheRootPage = when => {
    when('I go to the root page', () => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
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

    and('I log in with valid credentials', () => {
      wrapper
        .find('#email123')
        .simulate('change', {target: {value: 'validuser@bt.com'}});
      wrapper.ref('password').simulate('change', {target: {value: 'password'}});
      wrapper.find('form').simulate('submit');
    });

    then('I see that I am logged in', () => {});
  });
});
