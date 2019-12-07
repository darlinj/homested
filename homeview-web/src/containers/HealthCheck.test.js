import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HealthCheck from './HealthCheck';
import WideCard from '../components/WideCard';

configure({adapter: new Adapter()});

describe('The healthcheck container', () => {
  it('Shows it is loading when rendered', () => {
    const healthCheckPage = shallow(<HealthCheck diagnosticData={{status: 'loading'}}/>);
    expect(healthCheckPage.find(WideCard).props().body).toContain('Loading...');
  });

  it('Shows a message if the data fails to load', () => {
    const healthCheckPage = shallow(
      <HealthCheck diagnosticData={{status: "loadFail", result: 'SOME ERROR'}} />,
    );
    expect(healthCheckPage.find(WideCard).props().body).toContain('Data failed to load. Error: SOME ERROR');

  });

  it('Shows the page if the result is a success', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
    };
    const healthCheckPage = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(healthCheckPage.text()).toContain('Wireless status');
  });

  it('Shows the wifi data', () => {
    const items_to_display = {
      Self_Test_Wireless_Networks_Detected_Details: 'Some wifi network details',
      Self_Test_Wireless_Contention_Details: 'Some wifi contention details',
      Self_Test_Wireless_Networks_Detected_Details_5GHz: 'Some 5G wifi network details',
      Self_Test_Wireless_Contention_Details_5GHz: 'Some 5G wifi contention details',
    };
    Object.keys(items_to_display).forEach(item_to_disply => {
      const diagnosticData = {
        result: 'TEST_COMPLETED_CACHE',
        data: items_to_display,
      };
      const healthCheckPage = shallow(<HealthCheck diagnosticData={diagnosticData} />);
      expect(healthCheckPage.text()).toContain('Some wifi network details');
    });
  });

  it('shows the green tick icon when status is green', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
      data: {
        Self_Test_Wireless_Networks_Detected: 'green',
      },
    };
    const healthCheckPage = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(healthCheckPage.find('.green-tick').length).toEqual(1);
  });

  it('shows the red cross icon when status is red', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
      data: {
        Self_Test_Wireless_Networks_Detected: 'red',
      },
    };
    const healthCheckPage = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(healthCheckPage.find('.red-cross').length).toEqual(1);
  });

  it('shows the amber icon when status is amber', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
      data: {
        Self_Test_Wireless_Networks_Detected: 'Amber',
      },
    };
    const healthCheckPage = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(healthCheckPage.find('.amber').length).toEqual(1);
  });
});
