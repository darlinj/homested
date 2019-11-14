import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import App from '../App';
import {Auth, API} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

jest.mock('aws-amplify');

describe('Login', () => {
  beforeEach(() => {
    Auth.currentSession.mockResolvedValue('success');
    API.get.mockResolvedValue({message: 'Go Serverless v1.0'});
  });

  afterEach(() => {
    Auth.currentSession.mockClear();
    API.get.mockClear();
  });

  it('calls the API when I enter a search term', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    wrapper.update();
    await act(async () => {
      const searchTerm = wrapper.find('input[type="text"]');
      searchTerm.simulate('change', {
        target: {value: 'customer1234', id: 'search-term'},
      });
    });
    await act(async () => {
      wrapper.find('form.search-form').simulate('submit');
    });
    expect(wrapper.text()).toContain('Go Serverless v1.0customer1234');
  });
});
