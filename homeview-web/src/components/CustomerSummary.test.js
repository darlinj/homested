import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerSummary from './CustomerSummary';

configure({adapter: new Adapter()});

describe("The overview tab", () => {
  it("shows the spinner when loading", () => {
    const overview = shallow(<CustomerSummary customerData={{loading: true}}/>);
    expect(overview.find(".hub-summary").length).toEqual(1);
  });
});
