import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

configure({adapter: new Adapter()});

describe('The Home container', () => {
  const div = document.createElement('div');

  it('renders without crashing', () => {
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('redirects to login if logged out', () => {
    const home = shallow(<Home />);
    expect(home.text()).toContain('Login');
  });

});
