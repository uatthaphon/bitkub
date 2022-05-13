import axios from 'axios';
import BaseService from './base.service';
import { transform } from './transform';

export default class CryptoService extends BaseService {
  baseUrl = `${this.bitKubUrl}/api/crypto`;

  /**
   * List all crypto addresses.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apicryptoaddresses POST /api/crypto/addresses}
   *
   * @param  {int} p - Page (optional)
   * @param  {int} lmt - Limit (optional)
   */
  async postAddresses(p, lmt) {
    try {
      const url = `${this.baseUrl}/addresses`;
      const payload = await this.preparePayload({ p, lmt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 CryptoService [postAddresses]: ${err.message}`);
    }
  }

  /**
   * Make a withdrawal to a trusted address.
   * 
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apicryptowithdraw POST /api/crypto/withdraw}
   * 
   * @param  {string} cur - Currency for withdrawal (e.g. BTC, ETH)
   * @param  {float} amt - Amount you want to withdraw
   * @param  {string} adr - Address to which you want to withdraw
   * @param  {string} mem - (Optional) Memo or destination tag to which you want to withdraw

   */
  async postWithdraw(cur, amt, adr, mem) {
    try {
      const url = `${this.baseUrl}/withdraw`;
      const payload = await this.preparePayload({ cur, amt, adr, mem });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 CryptoService [postWithdraw]: ${err.message}`);
    }
  }

  /**
   *
   * Make a withdraw to an internal address.
   * The destination address is not required to be a trusted address.
   * This API is not enabled by default,
   * Only KYB users can request this feature by contacting us via support@bitkub.com
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apicryptointernal-withdraw POST /api/crypto/internal-withdraw}
   *
   * @param  {string} cur - Currency for withdrawal (e.g. BTC, ETH)
   * @param  {float} amt - Amount you want to withdraw
   * @param  {string} adr - Address to which you want to withdraw
   * @param  {string} mem - (Optional) Memo or destination tag to which you want to withdraw
   */
  async postInternalWithdraw(cur, amt, adr, mem) {
    try {
      const url = `${this.baseUrl}/internal-withdraw`;
      const payload = await this.preparePayload({ cur, amt, adr, mem });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 CryptoService [postInternalWithdraw]: ${err.message}`);
    }
  }

  /**
   * List crypto deposit history.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apicryptodeposit-history POST /api/crypto/deposit-history}
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
      throw Error(`❌ 😥 CryptoService [postDepositHistory]: ${err.message}`);
    }
  }

  /**
   * List crypto withdrawal history.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apicryptowithdraw-history POST /api/crypto/withdraw-history}
   *
   * @param  {int} p - Page (optional)
   * @param  {int} lmt - Limit (optional)
   */
  async postWithdrawHistory(p, lmt) {
    try {
      const url = `${this.baseUrl}/deposit-history`;
      const payload = await this.preparePayload({ p, lmt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 CryptoService [postWithdrawHistory]: ${err.message}`);
    }
  }

  /**
   * Generate a new crypto address
   * (will replace existing address; previous address can still be used to received funds)
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#post-apicryptogenerate-address POST /api/crypto/generate-address}
   *
   * @param  {string} sym - Symbol (e.g. THB_BTC, THB_ETH, etc.)
   */
  async postGenerateAddress(sym) {
    try {
      const url = `${this.baseUrl}/generate-address`;
      const payload = await this.preparePayload({ p, lmt });
      const res = await axios.post(url, payload, { headers: this.headers });

      return transform(res.data);
    } catch (err) {
      throw Error(`❌ 😥 CryptoService [postGenerateAddress]: ${err.message}`);
    }
  }
}
