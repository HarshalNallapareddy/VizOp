import React, { useState, useEffect } from 'react';
import styles from './LeftSidebar.module.css';

function LeftSidebar({ setGraphData }) {
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
  };

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

  useEffect(() => {}, [ticker, optionType, expiration, strike]);

  return (
    <div className={`container ${styles['left-sidebar']}`}>
      <h1 className={`display-6 text-center ${styles['centered-title']}`} style={{ color: 'lightblue' }}>
        Viz<span style={{ color: 'orange' }}>Op</span>
      </h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id={styles['ticker']}
          name="ticker"
          placeholder="Enter ticker"
          onChange={handleTickerChange}
        />
        <button className={`btn btn-primary mt-2 ${styles['submit-button']}`} onClick={handleLoadChainClick}>
          Load Chain
        </button>
      </div>

      <div className="btn-group mb-3" role="group">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => handleOptionTypeChange('call')}
        >
          Call
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => handleOptionTypeChange('put')}
        >
          Put
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Expiration</label>
        <select className="form-select" onChange={handleExpirationChange}>
          {expirations.map((expiration, index) => (
            <option key={index} value={expiration}>
              {expiration}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Strike</label>
        <select className="form-select" onChange={handleStrikeChange}>
          {strikes.map((strike, index) => (
            <option key={index} value={strike}>
              {strike}
            </option>
          ))}
        </select>
      </div>

      <button className={`btn btn-info ${styles['load-graph-button']}`} onClick={handleLoadGraphClick}>
        Load Graph
      </button>
    </div>
  );
}

export default LeftSidebar;