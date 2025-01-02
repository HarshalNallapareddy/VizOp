import { useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import SampleGraph from '../components/SampleGraph';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const [graphData, setGraphData] = useState({});

  return (
    <div className="App-container" >
      <main className="App-body d-flex">
        <LeftSidebar setGraphData={setGraphData}/>
        <div style={{ flex: 1, overflow: 'auto'}}>
          <SampleGraph graphData={graphData} />
        </div>
      </main>
    </div>
  );
}
