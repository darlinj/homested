import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import App from './App';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><App /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the welcome page by default', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(1);
  expect(wrapper.find(NotFound)).toHaveLength(0);
  expect(wrapper.contains('Homeview')).toEqual(true);
});

it('renders the 404 page if a random page is requested', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(0);
  expect(wrapper.find(NotFound)).toHaveLength(1);
});
