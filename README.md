# VizOp

## Features

VizOp is an interactive options tool that visualizes the price of an options contract with changes in price and time. It provides users with real-time data and intuitive graphical representations of options contracts, helping traders and investors better understand market dynamics and make informed decisions.

## Frontend

The VizOp frontend is built using Next.js, providing a responsive and interactive user interface. It features real-time data visualization, intuitive controls for adjusting options parameters, and dynamic charts that update instantly. The frontend communicates with the backend API to fetch market data and perform complex calculations, presenting the results in an easily digestible format for users.

## Backend

The VizOp backend is powered by Python, utilizing FastAPI for efficient API development. It handles real-time market data processing, options pricing calculations, and data management. The backend integrates with the MarketData API for real-time financial data, implements mathematical models for options pricing, and serves as the computational engine for the frontend.

## Live Project

You can view the live version of this project [here](https://vizop-frontend-ndoiwo4fia-uc.a.run.app/).

## Future Improvements

I have several exciting improvements planned for this project:

- Implement the Black-Scholes method for more accurate contract pricing
- Enhance the user interface for better user experience
- Add more advanced analytics and reporting features

For inspiration on implementing advanced option pricing models, I'm looking at [this repository](https://github.com/krivi95/option-pricing-models/tree/master/option_pricing) which includes various pricing models.
