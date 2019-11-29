import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import App from '../App';
import {Auth, API} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

jest.mock('aws-amplify');
jest.mock('react-gauge-chart' , () => ()=> <div id="gauge">mockGauge</div>);
jest.mock('../containers/HomeNetwork' , () => ()=> <div id="home-network">home-network</div>);

describe('Login', () => {
  beforeEach(() => {
    Auth.currentSession.mockResolvedValue('success');
    API.get.mockResolvedValue({message: {"result":"EXECUTE_SUCCESS","data":{"MODE":"DSL","customerType":"ConsumerBB","deviceTypeAlias":"Home Hub 6.0B","modelName":"BT Hub 6B","firstContactTime":"Fri Jan 18 15:27:24 GMT 2019","lastContactTime":"Wed Aug 21 15:17:44 BST 2019"}}});
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
    expect(API.get.mock.calls.length).toEqual(2);
    expect(API.get.mock.calls[0][0]).toEqual("homeviewAPI");
    expect(API.get.mock.calls[0][1]).toEqual("/find-customer?searchTerm=customer1234");
    expect(API.get.mock.calls[1][0]).toEqual("homeviewAPI");
    expect(API.get.mock.calls[1][1]).toEqual("/get-diagnostics?searchTerm=customer1234");
  });
});
