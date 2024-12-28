import { useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import SampleGraph from '../components/SampleGraph';

export default function Home() {
  const [graphData, setGraphData] = useState({});

  return (
    <div className="App-container" >
      <main className='App-body'>
        <LeftSidebar setGraphData={setGraphData}/>
        <div style={{ flex: 1, overflow: 'auto'}}>
          <SampleGraph graphData={graphData} />
        </div>
      </main>
    </div>
  );
}
