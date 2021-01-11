# yahoo-stock-prices
Node.js API to scrape stock prices from Yahoo Finance.

[![NPM](https://nodei.co/npm/yahoo-stock-prices.png?mini=true)](https://npmjs.org/package/yahoo-stock-prices)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/darthbatman/yahoo-stock-prices)


# Installation

```
npm install yahoo-stock-prices
```

# Usage

## getCurrentData

Returns a promise which resolves with the current price of a stock, along with the currency of that stock.

### Example

```js
const data = await yahooStockPrices.getCurrentData('AAPL');
console.log(data); // { currency: 'USD', price: 132.05 }
```

## getCurrentPrice

Returns a promise which resolves with only the current price, as a number.

### Example

```js
const price = await yahooStockPrices.getCurrentPrice('AAPL');
console.log(price); // 132.05
```

For backward compatibility with earlier versions you can also provide a callback as the second parameter, in which case no promise will be returned.

```js
yahooStockPrices.getCurrentPrice('AAPL', (err, price) => {
    console.log(price); // 132.05
});
```

## getHistoricalPrices

Returns a promise that resolves with an array of prices for ticker symbol within dates.

### Parameters

`startMonth` number (integer from 0 to 11)

`startDay` number (integer from 0 to 31)

`startYear` number (integer - 4 digit year)

`endMonth` number (integer from 0 to 11)

`endDay` number (integer from 0 to 31)

`endYear` number (integer)

`ticker` string (stock ticker symbol)

`frequency` string (1 day = "1d", 1 week = "1wk", 1 month = "1mo")

`callback` function (Optional - if a callback function is provided no promise will be returned)

### Return Value

Each array item contains:

#### date

Type: `number`

Timestamp in seconds since January 1, 1970 of the start of trading on the day this data is for.

#### open

Type: `number`

Opening price of stock on date.

#### high

Type: `number`

Highest price of stock on date.

#### low

Type: `number`

Lowest price of stock on date.

#### close

Type: `number`

Closing price of stock on date adjusted for splits.

#### volume

Type: `number`

Volume of stock traded on date.

#### adjclose

Type: `number`

Adjusted close price adjusted for both dividends and splits.

### Example

```js
const prices = await yahooStockPrices.getHistoricalPrices(0, 6, 2020, 0, 8, 2020, 'AAPL', '1d');
console.log(prices);
// [
//     {
//         date: 1578407400,
//         open: 74.95999908447266,
//         high: 75.2249984741211,
//         low: 74.37000274658203,
//         close: 74.59750366210938,
//         volume: 108872000,
//         adjclose: 73.95879364013672
//     },
//     {
//         date: 1578321000,
//         open: 73.44750213623047,
//         high: 74.98999786376953,
//         low: 73.1875,
//         close: 74.94999694824219,
//         volume: 118387200,
//         adjclose: 74.30826568603516
//     },
// ]
```

# License

MIT © [Rishi Masand](https://github.com/darthbatman)
