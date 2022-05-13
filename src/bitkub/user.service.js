import axios from 'axios';
import BaseService from './base.service';
import { transform } from './transform';

export default class UserService extends BaseService {
  baseUrl = `${this.bitKubUrl}/api/user`;

  /**
   * Check deposit/withdraw limitations and usage.
   */
  async postLimits() {
    try {
      const url = `${this.baseUrl}/limits`;
      const payload = await this.preparePayload({});
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 UserService [postAccounts]: ${err.message}`);
    }
  }
  /**
   * Check trading credit balance.
   */
  async postTradingCredits() {
    try {
      const url = `${this.baseUrl}/trading-credits`;
      const payload = await this.preparePayload({});
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 UserService [postTradingCredits]: ${err.message}`);
    }
  }
}
