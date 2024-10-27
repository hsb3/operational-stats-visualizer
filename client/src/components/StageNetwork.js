import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function StageNetwork({ stages }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!stages || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Prepare data
    const nodes = stages.map(stage => ({
      id: stage.name,
      name: stage.name,
    }));

    const links = stages.flatMap(stage =>
      stage.children.map(childName => ({
        source: stage.name,
        target: childName,
      }))
    );

    // Set up SVG
    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f4f4f4');

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999')
      .style('stroke', 'none');

    // Add links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', 'url(#arrowhead)');

    // Add nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', d => d3.schemeCategory10[nodes.indexOf(d) % 10]);

    // Add labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.name)
      .attr('font-size', 12)
      .attr('dx', 12)
      .attr('dy', 4);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    // Add drag behavior
    node.call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [stages]);

  return (
    <div className="stage-network">
      <h2>Project Stage Network</h2>
      <svg ref={svgRef}></svg>
      <div className="legend" style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
        <h3>Legend</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><span style={{ color: d3.schemeCategory10[0] }}>●</span> Vision Scoping</li>
          <li><span style={{ color: d3.schemeCategory10[1] }}>●</span> Release Planning</li>
          <li><span style={{ color: d3.schemeCategory10[2] }}>●</span> Development</li>
          <li><span style={{ color: d3.schemeCategory10[3] }}>●</span> Testing</li>
        </ul>
      </div>
    </div>
  );
}

export default StageNetwork;
