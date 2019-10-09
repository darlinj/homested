import { defineFeature, loadFeature } from 'jest-cucumber';
import App from '../../../App';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';

const feature = loadFeature('./src/features/render_welcome_page.feature');

defineFeature(feature, test => {
  configure({adapter: new Adapter()});
  let wrapper;

  test('Show the welcome message', ({ when, then, and }) => {

    	when('I go to the root page', () => {
        wrapper = mount(
          <MemoryRouter initialEntries={[ '/' ]}>
            <App/>
          </MemoryRouter>
        );
      });

    	then('I see the login page', () => {
        expect(wrapper.find("Login").exists()).toBe(true);
    	});

    	and('I am logged out', () => {
        expect(wrapper.text()).toContain('Login');
    	});
    });
});
