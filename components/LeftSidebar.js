import React, { useState, useEffect} from 'react';
import './LeftSidebar.css';

function LeftSidebar({setGraphData}) {
  const [ticker, setTicker] = useState('');
  const [optionType, setOptionType] = useState('');
  const [expiration, setExpiration] = useState('');
  const [strike, setStrike] = useState('');
  const [expirations, setExpirations] = useState([]);
  const [strikes, setStrikes] = useState([]);

  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  };

  const handleOptionTypeChange = (type) => {
    console.log(type);
    setOptionType(type);
  };

  const handleExpirationChange = (event) => {
    setExpiration(event.target.value);
    fetch('/api/get_strikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker: ticker, expiration: event.target.value }),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then((data) => {
    setStrikes(data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
  };

  const handleStrikeChange = (event) => {
    console.log(event.target.value);
    setStrike(event.target.value);
  };

  const handleLoadGraphClick = () => {
    if (ticker && optionType && expiration && strike) {
      fetch('/api/get_graph_data', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker: ticker, optionType: optionType, expiration: expiration, strike: strike }),
      })
      .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
      })
      .then((data) => {
        setGraphData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  const handleLoadChainClick = () => {
    fetch('/api/get_expirations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    //   body: JSON.stringify({ ticker: ticker }),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then((data) => {
    console.log(data);
    setExpirations(data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
  };

  useEffect(() => {
  }, [ticker, optionType, expiration, strike]);

  return (
    
    <div className="left-sidebar bg-light bg-gradient">
      <div className="ticker-container">
        <div className="ticker-label-container">
          <input type="text" id="ticker" name="ticker" placeholder="Enter ticker" onChange={handleTickerChange}/>
          <button className="submit-button badge-pill" id = "load-chain" onClick={handleLoadChainClick}>Load Chain</button>
        </div>

        <div className="side-container">
          <button data-bs-toggle="tooltip" data-bs-placement="top" title="Purchase stock at strike price by expiration date" className='call-button' onClick={() => handleOptionTypeChange('call')}>Call</button>
          <button data-toggle="tooltip" data-placement="top" title="Sell stock at strike price by expiration date" className='put-button' onClick={() => handleOptionTypeChange('put')}>Put</button>
        </div>
      </div>

      <div className="exp-strike-container">

        <div className="expiration-container">
          <label id="expiration-label" className="display-3">Expiration</label>
          <select className = "form-select" aria-label="Default select example" id="expiration-dropdown" name="expiration" onChange={handleExpirationChange}>
            {expirations.map((expiration, index) => <option key={index} value={expiration}>{expiration}</option>)}
          </select>
        </div>

        <div className="strike-container">
          <label id="strike-label" className="display-3">Strike</label>
          <select className = "form-select" aria-label="Default select example" id="strike-dropdown" name="strike" onChange={handleStrikeChange}>
            {strikes.map((strike, index) => <option key={index} value={strike}>{strike}</option>)}
          </select>
        </div>

      </div>

      <div className="load-graph-container">
        <h2><button type = "button" className="load-graph-button btn btn-light btn-outline-dark btn-lg" onClick={handleLoadGraphClick}>Load Graph</button></h2>
      </div>

    </div>
  );
}

export default LeftSidebar;