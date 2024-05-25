import { useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import SampleGraph from '../components/SampleGraph';
import '../styles/index.css';

export default function Home() {
  const [graphData, setGraphData] = useState({});

  return (
    <div className="App-container" >
      <header className='App-header' >
        <h1 data-bs-toggle="tooltip" data-bs-placement="top" title="Visualize stock options with VizOp" className = "display-6" style={{ color: 'navy' }}>Viz<span style={{ color: 'orange' }}>Op</span></h1>
      </header>

      <main className='App-body'>
        <LeftSidebar setGraphData={setGraphData}/>
        <SampleGraph graphData={graphData} />
        <RightSidebar /> 
      </main>
    </div>
  );
}
