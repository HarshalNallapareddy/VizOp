import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

class SampleGraph extends React.Component {
  render() {

    const { graphData } = this.props;

    const data = [{
      x: graphData.time || [1],
      y: graphData.price || [1],
      z: graphData.premium || [1],
      type: 'scatter3d',
      mode: 'markers',
      marker: {
        size: 5,
        color: graphData.premium || [], // Use the premium array for marker color
        colorbar: {title: 'Premium'},
      },
      hoverinfo: 'text', // Set the hoverinfo to 'text'
      text: (graphData.premium || []).map((p, i) => `Days from today: ${graphData.time[i]}<br>Stock Price: ${graphData.price[i].toFixed(2)}<br>Premium: ${p.toFixed(2)}`), // Set the text that appears when you hover over a marker
    }];

    const layout = {
      autosize: true,
      scene: {
        bgcolor: 'white',
        xaxis: {title: 'Days from today'}, // Add title to x-axis
        yaxis: {title: 'Stock Price'}, // Add title to y-axis
        zaxis: {title: 'Premium'}, // Add title to z-axis
        aspectmode: 'cube', // Set the aspect mode to 'cube'
        aspectratio: {x: 1, y: 1, z: 1}, // Set the aspect ratio to 1:1:1
      }
      
    };

    return (
      <div className="sample-graph" id="words">
        <Plot
          data={data}
          layout={layout}
          style={{ width: '100%', height: '100%'}}
        />
      </div>
    );
  }
}

export default SampleGraph;