import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HealthCheck from './HealthCheck';

configure({adapter: new Adapter()});

describe('The healthcheck component', () => {
  it('Shows it instuctions when initialised', () => {
    const healthCheck = shallow(
      <HealthCheck diagnosticData={{state: 'initialized'}} />,
    );
    expect(healthCheck.text()).toContain('Search for a customer');
  });

  it('Shows it is loading when loading', () => {
    const healthCheck = shallow(
      <HealthCheck diagnosticData={{state: 'loading'}} />,
    );
    expect(healthCheck.text()).toContain('Loading...');
  });

  it('Shows the healthcheck data when loaded', () => {
    const healthCheck = shallow(
      <HealthCheck diagnosticData={{state: 'loaded', data: {Self_Test_Wireless_Contention_5GHz: "green"}}} />,
    );
    expect(healthCheck.text()).toContain('FaCheckCircle');
  });
});
