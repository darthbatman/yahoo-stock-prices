const axios = require('axios');
const cheerio = require('cheerio');
const instance = axios.create({
	baseURL: 'https://finance.yahoo.com/quote/',
	timeout: 1000
})

module.exports.getHistoricalPrices = function (startMonth, startDay, startYear, endMonth, endDay, endYear, ticker, frequency, callback) {
	const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
	const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);
	instance.get(`${ticker}/history?period1=${startDate}&period2=${endDate}&interval=${frequency}&filter=history&frequency=${frequency}`)
		.then(res => {
			try {
				const prices = JSON.parse(res.data.split('HistoricalPriceStore\":{\"prices\":')[1].split(",\"isPending")[0]);
				callback(null, prices)
			}
			catch(err) {
				callback(err)
			}
		})
		.catch(err => {
			callback(err)
		})
};

module.exports.getCurrentPrice = async function (ticker, callback) {
	instance.get(`${ticker}/`)
	.then(res => {
		try {
			const $ = cheerio.load(res.data);
			const price = $("#quote-header-info > div.My\\(6px\\).Pos\\(r\\).smartphone_Mt\\(6px\\) > div.D\\(ib\\).Va\\(m\\).Maw\\(65\\%\\).Ov\\(h\\) > div > span.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)").text();
			callback(null, parseFloat(price.replace(',', '')));
		}
		catch(err) {
			callback(err);
		}
	})
};
