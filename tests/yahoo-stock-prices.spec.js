const ysp = require('../yahoo-stock-prices');

describe('yahoo-stock-prices', () => {
    describe('getCurrentPrice', () => {
        it('Should return a price', (done) => {
            ysp.getCurrentPrice('AAPL', (err, price) => {
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
        });
    });

    describe('getHistoricalPrices', () => {
        it('Should return an array of prices', (done) => {
            ysp.getHistoricalPrices(3, 2, 2016, 3, 9, 2016, 'JNJ', '1d', (err, prices) => {
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
        });
    });
});
