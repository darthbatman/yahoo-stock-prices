const ysp = require('../yahoo-stock-prices');

describe('yahoo-stock-prices', () => {
    describe('getCurrentPrice', () => {
        it('Should return a price via callback', (done) => {
            const returnedValue = ysp.getCurrentPrice('AAPL', (err, price) => {
                console.log('Returned AAPL price is:', price);

                // It should return a number greater than 0
                expect(typeof price).toBe('number');
                expect(price).toBeGreaterThan(0);

                // This could potentially break in future (and there would be some very rich people...)
                expect(price).toBeLessThan(10000);

                // It should contain 2 decimal places.
                const priceString = price.toString();
                const decimals = priceString.split('.')[1];
                expect(decimals.length).toBe(2);

                done();
            });

            // It should not have returned a Promise if a callback was supplied.
            expect(returnedValue).toBeUndefined();
        });

        it('Should return a promise with the price', () => {
            return ysp.getCurrentPrice('AAPL').then((price) => {
                expect(typeof price).toBe('number');
                expect(price).toBeGreaterThan(0);
                expect(price).toBeLessThan(10000);
            });
        });

        it('Should return price that includes a comma', () => {
            // At the time of writing, TSLA.MX is priced at 17,513.22. This test checks what happens with the comma.
            return ysp.getCurrentPrice('TSLA.MX').then((price) => {
                console.log('TSLA.MX price', price);
                expect(typeof price).toBe('number');
                expect(price).toBeGreaterThan(1000);
                // Test will break if TSLA.MX price drops below 1,000. Switch to a different >= 1,000 stock if that happens.
                expect(price.toString().split('.')[0].length).toBeGreaterThanOrEqual(4);
                expect(price.toString().split('.')[1].length).toBe(2);
            });
        });
    });

    describe('getCurrentData', () => {
        test.each(
            [
                ['AAPL', { currency: 'USD' }],
                ['IAG.L', { currency: 'GBp' }],
                ['TSLA.MX', { currency: 'MXN' }],
                ['DTE.DE', { currency: 'EUR' }],
            ],
        )('Should return data object for %s containing currency and price', (ticker, expected) => {
            return ysp.getCurrentData(ticker).then((data) => {
                console.log(ticker, data);
                expect(data.currency).toEqual(expected.currency);
                expect(typeof data.price).toBe('number');
            });
        });
    });

    describe('getHistoricalPrices', () => {
        it('Should return an array of prices via callback', (done) => {
            const returnedValue = ysp.getHistoricalPrices(3, 2, 2016, 3, 9, 2016, 'JNJ', '1d', (err, prices) => {
                expect(Array.isArray(prices)).toBe(true);
                expect(prices.length).toBeGreaterThan(0);

                // Since we're testing historical prices we can hard code the expected result.
                expect(prices).toEqual(
                    [
                        {
                            date: 1460122200,
                            open: 109.37000274658203,
                            high: 109.63999938964844,
                            low: 108.76000213623047,
                            close: 109.0999984741211,
                            volume: 6301600,
                            adjclose: 96.02224731445312,
                        },
                        {
                            date: 1460035800,
                            open: 109,
                            high: 109.62000274658203,
                            low: 108.62999725341797,
                            close: 109.2699966430664,
                            volume: 7822900,
                            adjclose: 96.1718521118164,
                        },
                        {
                            date: 1459949400,
                            open: 108.72000122070312,
                            high: 109.5,
                            low: 107.87999725341797,
                            close: 109.41999816894531,
                            volume: 6828700,
                            adjclose: 96.30387878417969,
                        },
                        {
                            date: 1459863000,
                            open: 108.2300033569336,
                            high: 109.83999633789062,
                            low: 108.01000213623047,
                            close: 108.94999694824219,
                            volume: 7939000,
                            adjclose: 95.89022064208984,
                        },
                        {
                            date: 1459776600,
                            open: 108.81999969482422,
                            high: 109.0999984741211,
                            low: 108.26000213623047,
                            close: 108.58999633789062,
                            volume: 10668900,
                            adjclose: 95.5733642578125,
                        },
                    ],
                );

                done();
            });

            // It should not have returned a Promise if a callback was supplied.
            expect(returnedValue).toBeUndefined();
        });

        it('Should return a promise with an array of prices', () => {
            return ysp.getHistoricalPrices(0, 6, 2020, 0, 8, 2020, 'AAPL', '1d').then((prices) => {
                expect(prices).toEqual(
                    [
                        {
                            date: 1578407400,
                            open: 74.95999908447266,
                            high: 75.2249984741211,
                            low: 74.37000274658203,
                            close: 74.59750366210938,
                            volume: 108872000,
                            adjclose: 73.95879364013672,
                        },
                        {
                            date: 1578321000,
                            open: 73.44750213623047,
                            high: 74.98999786376953,
                            low: 73.1875,
                            close: 74.94999694824219,
                            volume: 118387200,
                            adjclose: 74.30826568603516,
                        },
                    ],
                );
            });
        });
    });
});
