import { BITKUB_API_KEY, BITKUB_API_SECRET, BITKUB_URL } from '../../config';
import { transformQuery } from '../utils/query';
import { signPayload } from '../utils/sign';
import ServerService from './server.service';

export default class BaseService {
  bitKubUrl = BITKUB_URL;
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-BTK-APIKEY': BITKUB_API_KEY,
  };

  constructor() {
    this.serverService = new ServerService();
  }

  prepareQuery(params) {
    const query = transformQuery(params);

    return query;
  }

  async preparePayload(data = {}) {
    const serverTimeStamp = await this.serverService.getServerTime();
    const payload = { ...data, ...{ ts: serverTimeStamp } };

    return signPayload(payload, BITKUB_API_SECRET);
  }
}
