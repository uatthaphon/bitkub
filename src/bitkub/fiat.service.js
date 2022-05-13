import axios from 'axios';
import BaseService from './base.service';
import { transform } from './transform';

export default class FiatService extends BaseService {
  baseUrl = `${this.bitKubUrl}/api/fiat`;

  /**
   * List all approved bank accounts.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apifiataccounts POST /api/fiat/accounts}
   *
   * @param  {int} p - Page (optional)
   * @param  {int} lmt - Limit (optional)
   */
  async postAccounts(p, lmt) {
    try {
      const url = `${this.baseUrl}/accounts`;
      const payload = await this.preparePayload({ p, lmt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 FiatService [postAccounts]: ${err.message}`);
    }
  }

  /**
   * Make a withdrawal to an approved bank account.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apifiataccounts POST /api/fiat/accounts}
   *
   * @param  {string} id - Bank account id
   * @param  {float} amt - Amount you want to withdraw
   */
  async postWithdraw(id, amt) {
    try {
      const url = `${this.baseUrl}/withdraw`;
      const payload = await this.preparePayload({ id, amt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 FiatService [postWithdraw]: ${err.message}`);
    }
  }

  /**
   * List fiat deposit history.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apifiatdeposit-history POST /api/fiat/deposit-history}
   *
   * @param  {int} p - Page (optional)
   * @param  {int} lmt - Limit (optional)
   */
  async postDepositHistory(p, lmt) {
    try {
      const url = `${this.baseUrl}/deposit-history`;
      const payload = await this.preparePayload({ p, lmt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 FiatService [postDepositHistory]: ${err.message}`);
    }
  }
  /**
   * List fiat withdrawal history.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apifiatwithdraw-history POST /api/fiat/withdraw-history}
   *
   * @param  {int} p - Page (optional)
   * @param  {int} lmt - Limit (optional)
   */
  async postWithdrawHistory(p, lmt) {
    try {
      const url = `${this.baseUrl}/withdraw-history`;
      const payload = await this.preparePayload({ p, lmt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 FiatService [postWithdrawHistory]: ${err.message}`);
    }
  }
}
