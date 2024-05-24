from flask import Flask, request, jsonify
from api.private import get_options_chain, options_algo

app = Flask(__name__)

@app.route('/api/get_expirations', methods=['POST'])
def get_expirations():
    # data = request.json
    # ticker = data['ticker']
    return get_options_chain.get_expirations('AAPL')

@app.route('/api/get_strikes', methods=['POST'])
def get_strikes():
    data = request.json
    print(data)
    ticker = data['ticker']
    expiration = data['expiration']
    return get_options_chain.get_strikes(ticker, expiration)

@app.route('/api/get_graph_data', methods=['POST'])
def get_data():
    data = request.json
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
    
    return jsonify({'time': time_array, 'price': price_array, 'premium': premium_array})

if __name__ == '__main__':
    app.run(debug=True)