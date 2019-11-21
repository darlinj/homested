import React, {useEffect} from 'react';
import './HomeNetwork.css';
import dagreD3 from 'dagre-d3';
import * as d3 from 'd3';

const HomeNetwork = () => {
  const render = new dagreD3.render();
    var g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(function() {
        return {};
      });

  useEffect(() => {

    // Here we"re setting nodeclass, which is used by our custom drawNodes function
    // below.
    g.setNode(0, {label: 'BT network', class: 'type-TOP'});
    g.setNode(1, {label: 'BT home hub', class: 'type-S'});
    g.setNode(2, {label: '2.4GHz Wifi', class: 'type-NP'});
    g.setNode(3, {label: '5 GHz Wifi', class: 'type-DT'});
    g.setNode(4, {label: 'Ethernet', class: 'type-TK'});
    g.setNode(5, {label: 'Some Mac book', class: 'type-VP'});
    g.setNode(6, {label: 'Some PC', class: 'type-VBZ'});
    g.setNode(7, {label: 'Some phone', class: 'type-TK'});
    g.setNode(8, {label: 'Another phone', class: 'type-NP'});
    g.setNode(9, {label: 'Alexa', class: 'type-DT'});
    g.setNode(10, {label: 'Sono hub', class: 'type-TK'});
    g.setNode(11, {label: 'Wifi extender disk', class: 'type-NN'});
    g.setNode(12, {label: 'Sonos speaker', class: 'type-TK'});
    g.setNode(13, {label: 'some Android device', class: 'type-.'});
    g.setNode(14, {label: 'door bell', class: 'type-TK'});

    g.nodes().forEach(function(v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Set up edges, no special attributes.
    g.setEdge(3, 4);
    g.setEdge(2, 3);
    g.setEdge(1, 2);
    g.setEdge(6, 7);
    g.setEdge(5, 6);
    g.setEdge(9, 10);
    g.setEdge(8, 9);
    g.setEdge(11, 12);
    g.setEdge(8, 11);
    g.setEdge(5, 8);
    g.setEdge(1, 5);
    g.setEdge(13, 14);
    g.setEdge(1, 13);
    g.setEdge(0, 1);

    renderGraph();
  });

  const renderGraph = () => {
    var svg = d3.select('.home-network'),
      svgGroup = svg.select('.svgGroup');
    render(d3.select('.home-network g'), g);
    var xCenterOffset = (svg.attr('width') - g.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    svg.attr('height', g.graph().height + 40);
  }

  return (
    <div>
      <h1>graph</h1>
      <svg className="home-network" height="500" width="500"><g className="svgGroup" /> </svg>
    </div>
  );
};

export default HomeNetwork;
