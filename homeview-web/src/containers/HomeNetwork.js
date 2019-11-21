import React, {useEffect} from 'react';
import './HomeNetwork.css';
import dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
import {FaCheckCircle, FaMinusCircle, FaTimesCircle} from 'react-icons/fa';

const HomeNetwork = () => {
  const render = new dagreD3.render();
  var g = new dagreD3.graphlib.Graph()
    .setGraph({rankdir:"LR"})
    .setDefaultEdgeLabel(function() {
      return {};
    });

  const addNode = (graph, id, label, icon) => {
  var html = "<div class=device>";
      html += '<i class="fa fa-' + icon + '" style="font-size:25px;color:grey;" ></i>';
      html += "<span class=device-label>"+ label + "</span>";
      html += "</div>";
      graph.setNode(id, {
        labelType: "html",
        label: html,
        rx: 5,
        ry: 5,
        padding: 0,
        class: 'type-TOP'
      });
  }
  useEffect(() => {
    addNode(g, 0, 'BT network', "globe");
    addNode(g, 1, 'BT home hub', "globe");
    addNode(g, 2, '2.4GHz Wifi', "wifi");
    addNode(g, 5, '5 GHz Wifi', "wifi");
    addNode(g, 13, 'Ethernet', "plug");
    addNode(g, 3, 'Some Mac book', "laptop");
    addNode(g, 6, 'Some PC', "laptop");
    addNode(g, 7, 'Some phone', "mobile");
    addNode(g, 8, 'Another phone', "mobile");
    addNode(g, 9, 'Alexa', "microphone");
    addNode(g, 10, 'Sono hub', "music");
    addNode(g, 11, 'Wifi extender disk', "wifi");
    addNode(g, 12, 'Sonos speaker', "music");
    addNode(g, 4, 'some Android device', "mobile");
    addNode(g, 14, 'door bell', "bell");

    g.nodes().forEach(function(v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Set up edges, no special attributes.
    g.setEdge(3, 4, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(2, 3, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(1, 2, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(6, 7, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(5, 6, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(9, 10,{arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(8, 9, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(11, 12, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(8, 11, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(5, 8, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(1, 5, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(13, 14, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(1, 13, {arrowhead: 'noArrow', curve: d3.curveBasis});
    g.setEdge(0, 1, {arrowhead: 'noArrow', curve: d3.curveBasis});

    renderGraph();
  });

  const renderGraph = () => {
    var svg = d3.select('.home-network'),
      svgGroup = svg.select('.svgGroup');
    render.arrows().noArrow = function normal(parent, id, edge, type) {
    };

    render(d3.select('.home-network g'), g);
    var xCenterOffset = (svg.attr('width') - g.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    svg.attr('height', g.graph().height + 40);
  };

  return (
    <div>
      <svg className="home-network" height="100%" width="100%">
        <g className="svgGroup" />{' '}
      </svg>
    </div>
  );
};

export default HomeNetwork;
