const request = require('request');

const baseUrl = 'https://finance.yahoo.com/quote/';

/**
 * @param {number} startMonth
 * @param {number} startDay
 * @param {number} startYear
 * @param {number} endMonth
 * @param {number} endDay
 * @param {number} endYear
 * @param {string} ticker
 * @param {('1d','1wk','1mo')} frequency
 * @param {Function} [callback]
 *
 * @return {Promise<{date: number, open: number, high:number, low:number, close:number, volume:number, adjclose:number}[]>|undefined} Returns a promise if no callback was supplied.
 */
const getHistoricalPrices = function (
    startMonth,
    startDay,
    startYear,
    endMonth,
    endDay,
    endYear,
    ticker,
    frequency,
    callback,
) {
    const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
    const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);

    const promise = new Promise((resolve, reject) => {
        request(`${baseUrl + ticker}/history?period1=${startDate}&period2=${endDate}&interval=${frequency}&filter=history&frequency=${frequency}`, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                const prices = JSON.parse(body.split('HistoricalPriceStore\":{\"prices\":')[1].split(',"isPending')[0]);

                resolve(prices);
            } catch (err) {
                reject(err);
            }
        });
    });

    // If a callback function was supplied return the result to the callback.
    // Otherwise return a promise.
    if (typeof callback === 'function') {
        promise
            .then((price) => callback(null, price))
            .catch((err) => callback(err));
    } else {
        return promise;
    }
};

/**
 * @param {string} ticker
 *
 * @return {Promise<{price: number, currency: string}>}
 */
const getCurrentData = function (ticker) {
    return new Promise((resolve, reject) => {
        request(`${baseUrl + ticker}/`, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                let price = body.split(`"${ticker}":{"sourceInterval"`)[1]
                    .split('regularMarketPrice')[1]
                    .split('fmt":"')[1]
                    .split('"')[0];

                price = parseFloat(price.replace(',', ''));

                const currencyMatch = body.match(/Currency in ([A-Za-z]{3})/);
                let currency = null;
                if (currencyMatch) {
                    currency = currencyMatch[1];
                }

                resolve({
                    currency,
                    price,
                });
            } catch (err) {
                reject(err);
            }
        });
    });
};

/**
 * @param {string} ticker
 * @param {Function} [callback]
 *
 * @return {Promise<number>|undefined} Returns a promise if no callback was supplied.
 */
const getCurrentPrice = function (ticker, callback) {
    if (callback) {
        getCurrentData(ticker)
            .then((data) => callback(null, data.price))
            .catch((err) => callback(err));
    } else {
        return getCurrentData(ticker)
            .then((data) => data.price);
    }
};

module.exports = {
    getHistoricalPrices,
    getCurrentData,
    getCurrentPrice,
};
