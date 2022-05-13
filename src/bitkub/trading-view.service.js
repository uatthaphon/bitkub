import axios from 'axios';
import BaseService from './base.service';

export default class TradingViewService extends BaseService {
  baseUrl = `${this.bitKubUrl}/tradingview`;

  /**
   * Get historical data for TradingView chart.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-tradingviewhistory GET /tradingview/history}.
   *
   * @param  {string} symbol - The symbol (e.g. BTC_THB)
   * @param  {string} resolution - Chart resolution (1, 5, 15, 60, 240, 1D)
   * @param  {int} from - Timestamp of the starting time (e.g. 1633424427)
   * @param  {int} to - Timestamp of the ending time (e.g. 1633427427)
   */
  async getHistory(symbol, resolution, from, to) {
    try {
      const query = this.prepareQuery({ symbol, resolution, from, to });
      const url = `${this.baseUrl}/history${query}`;
      const res = await axios.get(url);

      return res.data;
    } catch (err) {
      throw Error(`❌ 😥 TradingViewService [getHistory]: ${err.message}`);
    }
  }
}
