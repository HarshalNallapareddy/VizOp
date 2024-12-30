import React, { useState, useEffect} from 'react';
import styles from './LeftSidebar.module.css';

function LeftSidebar({setGraphData}) {
  const [ticker, setTicker] = useState('');
  const [optionType, setOptionType] = useState('');
  const [expiration, setExpiration] = useState('');
  const [strike, setStrike] = useState('');
  const [expirations, setExpirations] = useState([]);
  const [strikes, setStrikes] = useState([]);

  const NEXT_PUBLIC_BACKEND_API_BASE_URL = 'https://vizop-backend-ndoiwo4fia-uc.a.run.app';

  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  };

  const handleOptionTypeChange = (type) => {
    console.log(type);
    setOptionType(type);
  };

  const handleExpirationChange = (event) => {
    setExpiration(event.target.value);
    fetch(`${NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/get_strikes`, {
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
    console.log(`${NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/get_strikes`);
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
      fetch(`${NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/get_graph_data`, {
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
    console.log(`${NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/get_expirations`);
    fetch(`${NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/get_expirations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker: ticker }),
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
    <div className={`container ${styles['left-sidebar']}`}>
      <h1 data-bs-toggle="tooltip" data-bs-placement="top" title="Visualize stock options with VizOp" className={`display-6 text-center ${styles['centered-title']}`} style={{ color: 'lightblue' }}>
        Viz<span style={{ color: 'orange' }}>Op</span>
      </h1>

      <div className="row">
        <div className="col-md-6">
          <div className={`input-group mb-3 ${styles['ticker-container']}`}>
            <input type="text" className="form-control" id={styles['ticker']} name="ticker" placeholder="Enter ticker" onChange={handleTickerChange}/>
            <button className={`btn btn-primary ${styles['submit-button']}`} id={styles['load-chain']} onClick={handleLoadChainClick}>Load Chain</button>
          </div>
        </div>

        <div className="col-md-6">
          <div className={`btn-group ${styles['side-container']}`} role="group">
            <button type="button" className="btn btn-outline-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Purchase stock at strike price by expiration date" onClick={() => handleOptionTypeChange('call')}>Call</button>
            <button type="button" className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Sell stock at strike price by expiration date" onClick={() => handleOptionTypeChange('put')}>Put</button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className={styles['expiration-container']}>
            <label id={styles['expiration-label']} className="form-label">Expiration</label>
            <select className="form-select" aria-label="Default select example" id={styles['expiration-dropdown']} name="expiration" onChange={handleExpirationChange}>
              {expirations.map((expiration, index) => <option key={index} value={expiration}>{expiration}</option>)}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className={styles['strike-container']}>
            <label id={styles['strike-label']} className="form-label">Strike</label>
            <select className="form-select" aria-label="Default select example" id={styles['strike-dropdown']} name="strike" onChange={handleStrikeChange}>
              {strikes.map((strike, index) => <option key={index} value={strike}>{strike}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button type="button" className={`btn btn-info ${styles['load-graph-button']}`} onClick={handleLoadGraphClick}>Load Graph</button>
      </div>
    </div>
  );
}

export default LeftSidebar;