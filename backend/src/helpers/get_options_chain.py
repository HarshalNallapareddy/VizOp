import requests, yfinance as yf
import pandas as pd
import datetime
from dotenv import load_dotenv
import os

load_dotenv()

headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {os.environ["MARKET_DATA_API_KEY"]}',
} 

def get_strikes(ticker, expiration):
    url = "https://api.marketdata.app/v1/options/strikes/{ticker}?expiration={expiration}".format(ticker=ticker, expiration=expiration)
    response = requests.request("GET", url, headers=headers)
    if response.status_code in range(200, 300):
        data = response.json()
        if data.get("s") == "ok":    # Check if the response is valid based on the 's' field in JSON
            return data[expiration]
        else:
            print("Invalid response.")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

def get_expirations(ticker):
    url = "https://api.marketdata.app/v1/options/expirations/{ticker}/".format(ticker=ticker)
    response = requests.request("GET", url, headers=headers)
    if response.status_code in range(200, 300):
        data = response.json()
        if data.get("s") == "ok":    # Check if the response is valid based on the 's' field in JSON
            return data['expirations']
        else:
            print("Invalid response.")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

def get_OCC(ticker, exp_date, option_type, strike):
    url = "https://api.marketdata.app/v1/options/lookup/"
    formatted_date = str(datetime.datetime.strptime(exp_date, "%Y-%m-%d").strftime("%m/%d/%Y"))
    url += "{ticker}%20{exp_date}%20{strike}%20{option_type}".format(ticker=ticker, exp_date=formatted_date, option_type=option_type.capitalize(), strike=strike) 
    response = requests.request("GET", url, headers=headers)
    if response.status_code in range(200, 300):
        data = response.json()
        if data.get("s") == "ok":    # Check if the response is valid based on the 's' field in JSON
            return data['optionSymbol']
        else:
            print("Invalid response.")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

def get_option_data(option_symbol):
    url = "https://api.marketdata.app/v1/options/quotes/{option_symbol}/".format(option_symbol=option_symbol)
    response = requests.request("GET", url, headers=headers)
    if response.status_code in range(200, 300):
        data = response.json()
        if data.get("s") == "ok":    # Check if the response is valid based on the 's' field in JSON
            return data
        else:
            print("Invalid response.")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

print(get_strikes("SPY", '2024-09-13'))