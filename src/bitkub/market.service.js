import axios from 'axios';
import BaseService from './base.service';
import { transform } from './transform';

export default class MarketService extends BaseService {
  baseUrl = `${this.bitKubUrl}/api/market`;

  /**
   * List all available symbols.
   * 
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarketsymbols GET /api/market/symbols}.
   */
  async getSymbols() {
    try {
      const url = `${this.baseUrl}/symbols`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getSymbols]: ${err.message}`);
    }
  }

  /**
   * Get ticker information.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarketticker GET /api/market/ticker}.
   *
   * @param  {string} - sym The symbol (optional)
   */
  async getTicker(sym) {
    try {
      const query = this.prepareQuery({ sym });
      const url = `${this.baseUrl}/ticker${query}`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getTicker]: ${err.message}`);
    }
  }

  /**
   * List recent trades.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarkettrades GET /api/market/trades}.
   *
   * @param  {string} - sym The symbol
   * @param  {int} - lmt No. of limit to query recent trades
   */
  async getTrades(sym, lmt) {
    try {
      const query = this.prepareQuery({ sym, lmt });
      const url = `${this.baseUrl}/trades${query}`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getTrades]: ${err.message}`);
    }
  }

  /**
   * List open buy orders.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarketbids GET /api/market/bids}.
   *
   * @param  {string} - sym The symbol
   * @param  {int} - lmt No. of limit to query open buy orders
   */
  async getBids(sym, lmt) {
    try {
      const query = this.prepareQuery({ sym, lmt });
      const url = `${this.baseUrl}/bids${query}`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getBids]: ${err.message}`);
    }
  }

  /**
   * List open sell orders.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarketasks GET /api/market/asks}.
   *
   * @param  {string} - sym The symbol
   * @param  {int} - lmt No. of limit to query open sell orders
   */
  async getAsks(sym, lmt) {
    try {
      const query = this.prepareQuery({ sym, lmt });
      const url = `${this.baseUrl}/asks${query}`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getAsks]: ${err.message}`);
    }
  }

  /**
   * List all open orders.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarketbooks GET /api/market/books}.
   *
   * @param  {string} sym - The symbol
   * @param  {int} lmt - No. of limit to query open orders
   */
  async getBooks(sym, lmt) {
    try {
      const query = this.prepareQuery({ sym, lmt });
      const url = `${this.baseUrl}/books${query}`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getBooks]: ${err.message}`);
    }
  }

  /**
   * Get depth information.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apimarketdepth GET /api/market/depth}.
   *
   * @param  {string} - sym The symbol
   * @param  {int} - lmt Depth size
   */
  async getDepth(sym, lmt) {
    try {
      const query = this.prepareQuery({ sym, lmt });
      const url = `${this.baseUrl}/depth${query}`;
      const res = await axios.get(url);

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [getDepth]: ${err.message}`);
    }
  }

  /**
   * Get user available balances (for both available and reserved balances please use BITKUB URL: POST /api/market/balances).
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketwallet POST /api/market/wallet}
   */
  async postWallet() {
    try {
      const url = `${this.baseUrl}/wallet`;
      const payload = await this.preparePayload({});
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postWallet]: ${err.message}`);
    }
  }
  /**
   * Get balances info: this includes both available and reserved balances.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketbalances POST /api/market/balances}
   */
  async postBalances() {
    try {
      const url = `${this.baseUrl}/balances`;
      const payload = await this.preparePayload({});
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postWallet]: ${err.message}`);
    }
  }

  /**
   * Create a buy order.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketplace-bid POST /api/market/place-bid}
   *
   * @param  {string} sym - The symbol
   * @param  {float} amt - Amount you want to spend with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {float} rat - Rate you want for the order with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {string} typ - Order type: limit or market (for market order, please specify rat as 0)
   * @param  {string} client_id - your id for reference ( not required )
   */
  async postPlaceBid(sym, amt, rat, typ, client_id) {
    try {
      const url = `${this.baseUrl}/place-bid`;
      const payload = await this.preparePayload({
        sym,
        amt,
        rat,
        typ,
        client_id,
      });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postPlaceBid]: ${err.message}`);
    }
  }

  /**
   * Test creating a buy order (no balance is deducted).
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketplace-bidtest POST /api/market/place-bid/test}
   *
   * @param  {string} sym - The symbol
   * @param  {float} amt - Amount you want to spend with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {float} rat - Rate you want for the order with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {string} typ - Order type: limit or market (for market order, please specify rat as 0)
   * @param  {string} client_id - your id for reference ( not required )
   */
  async postPlaceBidTest(sym, amt, rat, typ, client_id) {
    try {
      const url = `${this.baseUrl}/place-bid/test`;
      const payload = await this.preparePayload({
        sym,
        amt,
        rat,
        typ,
        client_id,
      });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postPlaceBidTest]: ${err.message}`);
    }
  }

  /**
   * Create a sell order.
   * 
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketplace-ask POST /api/market/place-ask}
   * 
   * @param  {string} sym - The symbol
   * @param  {float} amt - Amount you want to sell with no trailing zero (e.g 0.10000000 is invalid, 0.1 is ok)
   * @param  {float} rat - Rate you want for the order with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {string} typ - Order type: limit or market (for market order, please specify rat as 0)
   * @param  {string} client_id - your id for reference ( not required )

   */
  async postPlaceAsk(sym, amt, rat, typ, client_id) {
    try {
      const url = `${this.baseUrl}/place-ask`;
      const payload = await this.preparePayload({
        sym,
        amt,
        rat,
        typ,
        client_id,
      });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postPlaceAsk]: ${err.message}`);
    }
  }

  /**
   * Test creating a sell order (no balance is deducted).
   * 
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketplace-asktest POST /api/market/place-ask/test}
   * 
   * @param  {string} sym - The symbol
   * @param  {float} amt - Amount you want to sell with no trailing zero (e.g 0.10000000 is invalid, 0.1 is ok)
   * @param  {float} rat - Rate you want for the order with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {string} typ - Order type: limit or market
   * @param  {string} client_id - your id for reference ( not required )

   */
  async postPlaceAskTest(sym, amt, rat, typ, client_id) {
    try {
      const url = `${this.baseUrl}/place-ask/test`;
      const payload = await this.preparePayload({
        sym,
        amt,
        rat,
        typ,
        client_id,
      });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postPlaceAskTest}]: ${err.message}`);
    }
  }

  /**
   * Create a sell order by specifying the fiat amount you want to receive 
   * (selling amount of cryptocurrency is automatically calculated). 
   * If order type is market, currrent highest bid will be used as rate.
   * 
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketplace-ask-by-fiat POST /api/market/place-ask-by-fiat}

   * @param  {string} sym - The symbol
   * @param  {float} amt - Fiat amount you want to receive with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {float} rat -  Rate you want for the order with no trailing zero (e.g 1000.00 is invalid, 1000 is ok)
   * @param  {string} typ - Order type: limit or market
   */
  async postPlaceAskByFiat(sym, amt, rat, typ) {
    try {
      const url = `${this.baseUrl}/place-ask-by-fiat`;
      const payload = await this.preparePayload({ sym, amt, rat, typ });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postPlaceAskByFiat]: ${err.message}`);
    }
  }

  /**
   * Cancel an open order.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketcancel-order POST /api/market/cancel-order}
   *
   * @param  {string} sym - The symbol
   * @param  {int} id - Order id you wish to cancel
   * @param  {string} sd - Order side: buy or sell
   * @param  {string} hash - Cancel an order with order hash (optional). You don't need to specify sym, id, and sd when you specify order hash.
   */
  async postCancelOrder(sym, id, sd, hash) {
    try {
      const url = `${this.baseUrl}/cancel-order`;
      const payload = await this.preparePayload({ sym, id, sd, hash });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postCancelOrder]: ${err.message}`);
    }
  }

  /**
   * List all open orders of the given symbol.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketmy-open-orders POST /api/market/my-open-orders}
   *
   * @param  {string} sym - The symbol
   */
  async postMyOpenOrders(sym) {
    try {
      const url = `${this.baseUrl}/my-open-orders`;
      const payload = await this.preparePayload({ sym });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postMyOpenOrders]: ${err.message}`);
    }
  }

  /**
   * List all orders that have already matched.
   * 
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketmy-order-history POST /api/market/my-order-history}
   * 
   * @param  {string} sym - The symbol
   * @param  {int} p - Page (optional)
   * @param  {int} lmt - Limit (optional)
   * @param  {int} start - Start timestamp (optional)
   * @param  {int} end - End timestamp (optional)

   */
  async postMyOrderHistory(sym, p, lmt, start, end) {
    try {
      const url = `${this.baseUrl}/my-order-history`;
      const payload = await this.preparePayload({ sym, p, lmt, start, end });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postMyOrderHistory]: ${err.message}`);
    }
  }

  /**
   * Get information regarding the specified order.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketorder-info POST /api/market/order-info}
   *
   * @param  {string} sym - The symbol
   * @param  {int} id - Order id
   * @param  {string} sd - Order side: buy or sell
   * @param  {string} hash - Lookup an order with order hash (optional). You don't need to specify sym, id, and sd when you specify order hash.
   */
  async postOrderInfo(sym, id, sd, hash) {
    try {
      const url = `${this.baseUrl}/order-info`;
      const payload = await this.preparePayload({ sym, id, sd, hash });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postOrderInfo]: ${err.message}`);
    }
  }

  /**
   * Get the token for websocket authentication.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apimarketwstoken POST /api/market/wstoken}
   */
  async postWsToken() {
    try {
      const url = `${this.baseUrl}/wstoken`;
      const payload = await this.preparePayload({});
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 MarketService [postWsToken]: ${err.message}`);
    }
  }
}
