import React from 'react';
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
        color: graphData.premium || [],
        colorbar: {title: 'Premium'},
      },
      hoverinfo: 'text',
      text: (graphData.premium || []).map((p, i) => `Days from today: ${graphData.time[i]}<br>Stock Price: ${graphData.price[i].toFixed(2)}<br>Premium: ${p.toFixed(2)}`),
    }];

    const layout = {
      autosize: true,
      scene: {
        bgcolor: 'white',
        xaxis: {title: 'Days from today'},
        yaxis: {title: 'Stock Price'},
        zaxis: {title: 'Premium'},
        aspectmode: 'cube',
        aspectratio: {x: 1, y: 1, z: 1},
      }
    };

    return (
      <div className="sample-graph" style={{ width: '100%', height: '100%' }}>
        <Plot
          data={data}
          layout={layout}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }
}

export default SampleGraph;