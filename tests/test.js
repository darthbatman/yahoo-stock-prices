var yahooStockPrices = require('yahoo-stock-prices');

yahooStockPrices.getHistoricalPrices(3, 2, 2016, 3, 9, 2016, 'JNJ', '1d', function(err, prices){

	console.log(prices);

});

yahooStockPrices.getCurrentPrice('AAPL', function(err, price){

	console.log(price);

});