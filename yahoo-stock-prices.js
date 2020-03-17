const request = require('request');

const baseUrl = 'https://finance.yahoo.com/quote/';

module.exports.getHistoricalPrices = function (startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback) {

	const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
	const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);

	request(baseUrl + ticker + "/history?period1=" + startDate + "&period2=" + endDate + "&interval=" + frequency + "&filter=history&frequency=" + frequency, function (err, res, body) {

		if (err) { callback(err); }

		try {
			var prices = JSON.parse(body.split('HistoricalPriceStore\":{\"prices\":')[1].split(",\"isPending")[0]);

			callback(null, prices)
		} catch (err) {
			callback(err)
		}
	});
};

module.exports.getCurrentPrice = function (ticker, callback) {

	request(baseUrl + ticker + "/", function (err, res, body) {

		if (err) { callback(err); }

		try {
			var price = parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
				.split("regularMarketPrice")[1]
				.split("fmt\":\"")[1]
				.split("\"")[0]);

			callback(null, price);
		} catch (err) {
			callback(err)
		}
	});
};
