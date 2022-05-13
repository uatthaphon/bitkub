import path from 'path';
import { fileURLToPath } from 'url';
import { config as loadEnv } from 'dotenv';

const dirname = path.dirname(fileURLToPath(import.meta.url));

loadEnv({ path: path.resolve(dirname, './.env') });

export const BITKUB_URL = process.env.BITKUB_URL || '';
export const BITKUB_API_KEY = process.env.BITKUB_API_KEY || '';
export const BITKUB_API_SECRET = process.env.BITKUB_API_SECRET || '';
