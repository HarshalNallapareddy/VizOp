import requests, yfinance as yf
from api.private import format_date
import pandas as pd
import datetime

# url = "https://api.marketdata.app/v1/options/chain/AAPL/"

# response = requests.request("GET", url)

# print(response.text)

def get_strikes(ticker, expiration):
    url = "https://api.marketdata.app/v1/options/strikes/AAPL?expiration={expiration}".format(expiration=expiration)
    response = requests.request("GET", url)
    if response.status_code in range(200, 300):
        data = response.json()
        if data.get("s") == "ok":    # Check if the response is valid based on the 's' field in JSON
            print("here is the data")
            print(data[expiration])
            return data[expiration]
        else:
            print("Invalid response.")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

def get_expirations(ticker):
    url = "https://api.marketdata.app/v1/options/expirations/AAPL/"
    response = requests.request("GET", url)
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
    response = requests.request("GET", url)
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
    response = requests.request("GET", url)
    if response.status_code in range(200, 300):
        data = response.json()
        if data.get("s") == "ok":    # Check if the response is valid based on the 's' field in JSON
            return data
        else:
            print("Invalid response.")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)
