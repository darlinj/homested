import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';
import {API} from 'aws-amplify';
import {act} from 'react-dom/test-utils';

jest.mock('aws-amplify');

configure({adapter: new Adapter()});

describe('The Home container', () => {
  const div = document.createElement('div');

  beforeEach(() => {
    API.get.mockResolvedValue({message: 'Some API response'});
  });

  xit('renders without crashing', () => {
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  xit('redirects to login if logged out', () => {
    const home = shallow(<Home />);
    expect(home.text()).toContain('Login');
  });

  it('calls the API if the user is logged in', async () => {
    let home = '';
    await act(async () => {
      home = mount(<Home isAuthenticated="true" />);
    });
    expect(home.text()).toContain('Test API');
    expect(home.text()).toContain('Some API response');
  });
});
