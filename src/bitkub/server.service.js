import axios from 'axios';
import { BITKUB_URL } from '../../config';

export default class ServerService {
  baseUrl = BITKUB_URL;

  constructor() {}

  /**
   * Get endpoint status.
   * When status is not ok,
   * it is highly recommended to wait until the status changes back to ok.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apistatus GET /api/status}.
   */
  async getStatus() {
    try {
      const url = `${this.baseUrl}/api/status`;
      const res = await axios.get(url);

      return res.data;
    } catch (err) {
      throw Error(`❌ 😥 ServerService [getStatus]: ${err.message}`);
    }
  }

  /**
   * Get server timestamp.
   *
   * {@link https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md#get-apiservertime GET /api/servertime}.
   */
  async getServerTime() {
    try {
      const url = `${this.baseUrl}/api/servertime`;
      const res = await axios.get(url);

      return res.data;
    } catch (err) {
      throw Error(`❌ 😥 ServerService [getServerTime]: ${err.message}`);
    }
  }
}
