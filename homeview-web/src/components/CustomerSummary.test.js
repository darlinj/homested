import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerSummary from './CustomerSummary';

configure({adapter: new Adapter()});

describe("The overview tab", () => {
  it("shows the spinning spinner when loading", () => {
    const overview = shallow(<CustomerSummary diagnosticData={{state: "initialized"}} customerData={{state: "loading"}}/>);
    expect(overview.find(".hub-summary").length).toEqual(1);
    expect(overview.find(".hub-summary").props().className).toContain("fa-spin");
  });

  it("shows the stopped spinner when loaded", () => {
    const overview = shallow(<CustomerSummary diagnosticData={{state: "initialized"}} customerData={{state: "loaded"}}/>);
    expect(overview.find(".hub-summary").length).toEqual(1);
    expect(overview.find(".hub-summary").props().className).toEqual(" hub-summary");
  });

  it("doesn't show the spinner when initialized", () => {
    const overview = shallow(<CustomerSummary diagnosticData={{state: "initialized"}} customerData={{state: "initialized"}}/>);
    expect(overview.find(".hub-summary").length).toEqual(0);
  });

  it("shows the spinning spinner when loading the health check", () => {
    const overview = shallow(<CustomerSummary diagnosticData={{state: "loading"}} customerData={{state: "loading"}}/>);
    expect(overview.find(".health-check").length).toEqual(1);
    expect(overview.find(".health-check").props().className).toContain("fa-spin");
  });

  it("shows the spinning spinner when loading the TV data", () => {
    const overview = shallow(<CustomerSummary diagnosticData={{state: "initialized"}} customerData={{state: "loading"}}/>);
    expect(overview.find(".set-top-box").length).toEqual(1);
    expect(overview.find(".set-top-box").props().className).toContain("fa-spin");
  });
});
