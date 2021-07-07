const fetch = require('node-fetch');
const { map } = require('lodash');

/**
 *
 *
 * @param {*} _root
 * @param {*} { currency }
 * @return {*}
 */
const rates = async (_root, { currency }) => {
  try {
    const results = await fetch(
      `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
    );
    const exchangeRates = await results.json();

    return map(exchangeRates.data.rates, (rate, currency) => ({
      currency,
      rate,
    }));
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  rates,
};
