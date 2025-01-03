# import numpy as np
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .helpers import options_algo, get_options_chain
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/api/test')
def hello():
    return {"message": "Hello World!!!"}

@app.post('/api/get_expirations')
async def get_expirations(request: Request):
    data = await request.json()
    ticker = data['ticker']
    return get_options_chain.get_expirations(ticker)

@app.post('/api/get_strikes')
async def get_strikes(request: Request):
    data = await request.json()
    ticker = data['ticker']
    expiration = data['expiration']
    return get_options_chain.get_strikes(ticker, expiration)

@app.post('/api/get_graph_data')
async def get_data(request: Request):
    data = await request.json()
    ticker = data['ticker']
    expiration = data['expiration']
    option_type = data['optionType']
    strike = data['strike']
    option_symbol = get_options_chain.get_OCC(ticker, expiration, option_type, strike)
    option_data = get_options_chain.get_option_data(option_symbol)
    print(option_data)
    time_array, price_array, premium_array = options_algo.generate_data(
                            option_data['ask'][0], option_data['delta'][0], 
                            option_data['gamma'][0], option_data['theta'][0], 
                            expiration, option_data['underlyingPrice'][0])
    
    return {'time': time_array, 'price': price_array, 'premium': premium_array}