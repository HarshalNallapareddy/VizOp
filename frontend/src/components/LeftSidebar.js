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
    
    <div className={styles['left-sidebar']}>

      <h1 data-bs-toggle="tooltip" data-bs-placement="top" title="Visualize stock options with VizOp" className ={`display-6' ${styles['centered-title']}`} style={{ color: 'lightblue' }}>
        Viz<span style={{ color: 'orange' }}>Op</span>
      </h1>

      <div className={styles['ticker-container']}>
        <div className={styles['ticker-label-container']}>
          <input type="text" id={styles['ticker']} name="ticker" placeholder="Enter ticker" onChange={handleTickerChange}/>
          <button className={styles['submit-button']} id ={styles['load-chain']} onClick={handleLoadChainClick}>Load Chain</button>
        </div>

        <div className={styles['side-container']}>
          <button data-bs-toggle="tooltip" data-bs-placement="top" title="Purchase stock at strike price by expiration date" className={styles['call-button']} onClick={() => handleOptionTypeChange('call')}>Call</button>
          <button data-toggle="tooltip" data-placement="top" title="Sell stock at strike price by expiration date" className={styles['put-button']} onClick={() => handleOptionTypeChange('put')}>Put</button>
        </div>
      </div>

      <div className={styles['exp-strike-container']}>

        <div className={styles['expiration-container']}>
          <label id={styles['expiration-label']} className="display-3">Expiration</label>
          <select className = "form-select" aria-label="Default select example" id={styles['expiration-dropdown']} name="expiration" onChange={handleExpirationChange}>
            {expirations.map((expiration, index) => <option key={index} value={expiration}>{expiration}</option>)}
          </select>
        </div>

        <div className={styles['strike-container']}>
          <label id={styles['strike-label']} className="display-3">Strike</label>
          <select className = "form-select" aria-label="Default select example" id={styles['strike-dropdown']} name="strike" onChange={handleStrikeChange}>
            {strikes.map((strike, index) => <option key={index} value={strike}>{strike}</option>)}
          </select>
        </div>

      </div>

      <div className={styles['load-graph-container']}>
        <h2><button type = "button" className={styles['load-graph-button']} onClick={handleLoadGraphClick}>Load Graph</button></h2>
      </div>

    </div>
  );
}

export default LeftSidebar;