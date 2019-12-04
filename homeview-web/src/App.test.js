import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Home from './containers/Home';
import NavBar from './components/NavBar';
import NotFound from './containers/NotFound';
import App from './App';
import {Auth, API} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

jest.mock('aws-amplify');

configure({adapter: new Adapter()});

describe('App component', () => {
  beforeEach(() => {
    Auth.currentSession.mockResolvedValue('false');
    API.get.mockResolvedValue({
      message: {
        result: 'EXECUTE_SUCCESS',
        data: {
          customerType: 'ConsumerBB',
        },
      },
    });
  });

  afterEach(() => {
    Auth.currentSession.mockClear();
  });

  it('renders the welcome page by default', async () => {
    let wrapper = '';
    await act(async() => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
    expect(wrapper.contains('Homeview')).toEqual(true);
  });

  it('renders the 404 page if a random page is requested', async () => {
    let wrapper = '';
    await act(async() => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/rubbish']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('sets the logged in state to false by default', async() => {
    let wrapper = '';
    await act(async() => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    expect(wrapper.find(Home).props().isAuthenticated).toEqual(false);
  });

  it('set the authenticated state to true if the user is logged in', async () => {
    let wrapper = '';
    await act(async () => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );
    });
    wrapper.update();
    expect(wrapper.find(NavBar).props().isAuthenticated).toEqual(true);
  });
});
