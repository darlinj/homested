import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HealthCheck from './HealthCheck';

configure({adapter: new Adapter()});

describe('The healthcheck container', () => {
  it('Shows it is loading when rendered', () => {
    const home = shallow(<HealthCheck diagnosticData={{result: 'Loading...'}}/>);
    expect(home.text()).toContain('Loading...');
  });

  it('Shows a message if the data fails to load', () => {
    const home = shallow(
      <HealthCheck diagnosticData={{result: 'SOME ERROR'}} />,
    );
    expect(home.text()).toContain('Data failed to load. Error: SOME ERROR');
  });

  it('Shows the page if the result is a success', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
    };
    const home = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(home.text()).toContain('Wireless status');
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
      const home = shallow(<HealthCheck diagnosticData={diagnosticData} />);
      expect(home.text()).toContain('Some wifi network details');
    });
  });

  it('shows the green tick icon when status is green', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
      data: {
        Self_Test_Wireless_Networks_Detected: 'green',
      },
    };
    const home = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(home.find('.green-tick').length).toEqual(1);
  });

  it('shows the red cross icon when status is red', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
      data: {
        Self_Test_Wireless_Networks_Detected: 'red',
      },
    };
    const home = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(home.find('.red-cross').length).toEqual(1);
  });

  it('shows the amber icon when status is amber', () => {
    const diagnosticData = {
      result: 'TEST_COMPLETED_CACHE',
      data: {
        Self_Test_Wireless_Networks_Detected: 'Amber',
      },
    };
    const home = shallow(<HealthCheck diagnosticData={diagnosticData} />);
    expect(home.find('.amber').length).toEqual(1);
  });
});
