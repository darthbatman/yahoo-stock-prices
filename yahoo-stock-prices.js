var request = require('request');

module.exports.getHistoricalPrices = function(startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback){

	var startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0)/1000);

	var endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0)/1000);

	request("https://finance.yahoo.com/quote/" + ticker + "/history?period1=" + startDate + "&period2=" + endDate + "&interval=" + frequency + "&filter=history&frequency=" + frequency, function(err, res, body){

		if (err) {
		  callback(err);
		}
		try {
		  var prices = JSON.parse(body.split('HistoricalPriceStore\":{\"prices\":')[1].split(",\"isPending")[0]);
		  callback(null, prices)
		} catch (ex) {
		  return callback(ex);
		}

		

	});

};

module.exports.getCurrentPrice = function(ticker, callback){

	request("https://finance.yahoo.com/quote/" + ticker + "/", function(err, res, body){

		if (err) {
		  callback(err);
		}
		try {
		  var price = parseFloat(body.split("currentPrice")[1].split("fmt\":\"")[1].split("\"")[0]);
		  return callback(null, price);
		} catch (ex) {
		  return callback(ex);
		}

	});

};
