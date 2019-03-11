# yahoo-stock-prices
Node.js API to get stock prices from Yahoo finance

[![https://nodei.co/npm/yahoo-stock-prices.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/yahoo-stock-prices.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/reddit-by-date)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/darthbatman/yahoo-stock-prices)


# install

```
npm install yahoo-stock-prices
```

# example

```js
var yahooStockPrices = require('yahoo-stock-prices');

// start month, start day, start year, end month, end day, end year, ticker, frequency

// month [ 0 -> 11 ] = [ January -> December ]

yahooStockPrices.getHistoricalPrices(3, 2, 2016, 3, 9, 2016, 'JNJ', '1d', function(err, prices){

	console.log(prices);

});

yahooStockPrices.getCurrentPrice('AAPL', function(err, price){

	console.log(price);

});
```

# api

### getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback)

Type: `function`

```startMonth``` number (integer from 0 to 11)

```startDay``` number (integer from 0 to 31)

```startYear``` number (integer)

```endMonth``` number (integer from 0 to 11)

```endDay``` number (integer from 0 to 31)

```endYear``` number (integer)

```ticker``` string (stock ticker symbol)

```frequency``` string (1 day = "1d", 1 week = "1wk", 1 month = "1mo")

```callback``` function

Returns array of prices for ticker symbol within dates. 

### prices

Type: `array`

Price objects.

### priceObject.date

Type: `number`

Date of price in milliseconds since January 1, 1970.

### priceObject.open

Type: `number`

Opening price of stock on date.

### priceObject.high

Type: `number`

Highest price of stock on date.

### priceObject.low

Type: `number`

Lowest price of stock on date.

### priceObject.close

Type: `number`

Closing price of stock on date.

### priceObject.volume

Type: `number`

Volume of stock traded on date.

### priceObject.adjclose

Type: `number`

Adjusted closing price of stock on date.

# license

MIT © [Rishi Masand](https://github.com/darthbatman)