import pandas as pd
import numpy as np
import scipy.stats

# Strategy #1
# Use modify current premium based on current greeks
def calc_chg_prem_delta(option_spot, delta, gamma, new_spot):
    prem_chg = (new_spot - option_spot) * delta + 0.5 * gamma * ((abs(new_spot - option_spot)) ** 3 / (new_spot - option_spot))
    return prem_chg

def calc_chg_prem_theta(date, theta, new_date):
    # calculate change in date if date object
    time_chg = (new_date - date).total_seconds() / 86400
    prem_chg = -1*(time_chg * abs(theta)) # negative because time decay
    return prem_chg

# Test
def generate_data(premium, delta, gamma, theta, exp_date, spot):
    print(premium, delta, gamma, theta, exp_date, spot)
    x = []
    y = []
    z = []
    today = pd.Timestamp.now()
    exp_date = pd.Timestamp(exp_date)
    time_chg = (exp_date - today).days
    print(time_chg)
    for dt in np.arange(0, time_chg, 1): #change the skip depending on how dense the graph should be wrt time
        for new_spot in np.arange(spot - spot * 0.1, spot + spot * 0.1, 0.5): #change the skip depending on how dense the graph should be wrt spot price
            x.append(float(dt))
            y.append(float(new_spot))
            z.append(float(premium + calc_chg_prem_delta(spot, delta, gamma, new_spot) + calc_chg_prem_theta(today, theta, today + pd.Timedelta(days=dt))))
    print(x)
    print(y)
    print(z)


    # import matplotlib.pyplot as plt
    # from mpl_toolkits.mplot3d import Axes3D

    # fig = plt.figure()
    # ax = fig.add_subplot(111, projection='3d')
    # ax.scatter(x, y, z, c=z, cmap='viridis')

    # ax.set_xlabel('Time')
    # ax.set_ylabel('Price')
    # ax.set_zlabel('New Premium')

    # plt.show()

    return x, y, z

test1 = 0
if test1:
    opt_prem = 3.5
    opt_strike = 50
    opt_spot = 50
    delta = 0.6
    gamma = 0.25
    new_spot = 51
    exp_date = pd.Timestamp('2024-01-11')
    theta = 0.25

    t, s, p = generate_data(opt_prem, delta, gamma, theta, exp_date, opt_spot)
    print(t)
    print(s)
    print(p)    

    # # print(opt_prem)
    # # print("premium after increase in $1 spot:\n" + str(opt_prem + calc_chg_prem_delta(opt_spot, delta, gamma, new_spot)))
    # # print("premium after 1 day:\n" + str(opt_prem + calc_chg_prem_theta(date, theta, new_date)))
    # # print("new premium after 1 day, +$1 change:\n" + str(opt_prem + calc_chg_prem_delta(opt_spot, delta, gamma, new_spot) + calc_chg_prem_theta(date, theta, new_date)))
    # import matplotlib.pyplot as plt
    # from mpl_toolkits.mplot3d import Axes3D

    # x = []
    # y = []
    # z = []
    # for time in np.arange(1, 6, 0.25):
    #     for new_spot in np.arange(47, 53.1, 0.1):
    #         x.append(time)
    #         y.append(new_spot)
    #         z.append(opt_prem + calc_chg_prem_delta(opt_spot, delta, gamma, new_spot) + calc_chg_prem_theta(date, theta, date + pd.Timedelta(days=time)))

    # fig = plt.figure()
    # ax = fig.add_subplot(111, projection='3d')
    # ax.scatter(x, y, z, c=z, cmap='viridis')

    # ax.set_xlabel('Time')
    # ax.set_ylabel('Price')
    # ax.set_zlabel('New Premium')
    # # Draw plane representing original price of options contract

    # plt.show()

# Strategy #2
#  Using Black-Scholes to derive greek distributions and price premium
def calc_prem_bs(spot, strike, vol, risk_free, time):
    d1 = (np.log(spot / strike) + (risk_free + 0.5 * vol ** 2) * time) / (vol * np.sqrt(time))
    d2 = d1 - vol * np.sqrt(time)
    prem = spot * scipy.stats.norm.cdf(d1) - strike * np.exp(-risk_free * time) * scipy.stats.norm.cdf(d2)
    return prem

def calc_delta_bs(spot, strike, vol, risk_free, time):
    d1 = (np.log(spot / strike) + (risk_free + 0.5 * vol ** 2) * time) / (vol * np.sqrt(time))
    delta = scipy.stats.norm.cdf(d1)
    return delta

def calc_gamma_bs(spot, strike, vol, risk_free, time):
    d1 = (np.log(spot / strike) + (risk_free + 0.5 * vol ** 2) * time) / (vol * np.sqrt(time))
    gamma = (1 / (spot * vol * np.sqrt(time))) * (1 / np.sqrt(2 * np.pi)) * np.exp(-0.5 * d1 ** 2)
    return gamma

def calc_theta_bs(spot, strike, vol, risk_free, time):
    d1 = (np.log(spot / strike) + (risk_free + 0.5 * vol ** 2) * time) / (vol * np.sqrt(time))
    d2 = d1 - vol * np.sqrt(time)
    theta = -1 * (spot * scipy.stats.norm.pdf(d1) * vol) / (2 * np.sqrt(time)) - risk_free * strike * np.exp(-risk_free * time) * scipy.stats.norm.cdf(d2)
    return theta

test2 = False
if test2:
    spot = 50
    strike = 50
    vol = 0.2
    risk_free = 0.05
    time = 7.0 / 365.0
    print("premium from BS:\n" + str(calc_prem_bs(spot, strike, vol, risk_free, time)))
    print("delta from BS:\n" + str(calc_delta_bs(spot, strike, vol, risk_free, time)))
    print("gamma from BS:\n" + str(calc_gamma_bs(spot, strike, vol, risk_free, time)))
    print("theta from BS:\n" + str(calc_theta_bs(spot, strike, vol, risk_free, time)))