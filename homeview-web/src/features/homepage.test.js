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
  });


  it('Show the login page as default', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(wrapper.text()).toContain('Go Serverless v1.0');
  });

});
