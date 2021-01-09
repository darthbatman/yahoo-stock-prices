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
 * @param {Function} callback
 */
module.exports.getHistoricalPrices = function (
    startMonth,
    startDay,
    startYear,
    endMonth,
    endDay,
    endYear,
    ticker,
    frequency,
    callback
) {
    const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
    const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);

    request(`${baseUrl + ticker}/history?period1=${startDate}&period2=${endDate}&interval=${frequency}&filter=history&frequency=${frequency}`, (err, res, body) => {
        if (err) {
            callback(err);
        }

        try {
            const prices = JSON.parse(body.split('HistoricalPriceStore\":{\"prices\":')[1].split(',"isPending')[0]);

            callback(null, prices);
        } catch (err) {
            callback(err);
        }
    });
};

/**
 * @param {string} ticker
 * @param {Function} callback
 */
module.exports.getCurrentPrice = function (ticker, callback) {
    request(`${baseUrl + ticker}/`, (err, res, body) => {
        if (err) {
            callback(err);
        }

        try {
            const price = parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
                .split('regularMarketPrice')[1]
                .split('fmt":"')[1]
                .split('"')[0]);

            callback(null, price);
        } catch (err) {
            callback(err);
        }
    });
};
