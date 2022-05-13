import ServerService from './src/bitkub/server.service.js';
import MarketService from './src/bitkub/market.service.js';

console.log('===== Example Calling Non-secure endpoints =====')

const serverService = new ServerService();
const status = await serverService.getStatus();
const serverTime = await serverService.getServerTime();

console.log('   ===== Server Service ==========')
console.log('       status: ', status);
console.log('       serverTime: ', serverTime);
console.log('   ====== End Server Service =====')

const marketService = new MarketService();
const sym = 'THB_BTC';
const lmt = 10;

const symbols = await marketService.getSymbols();
const ticker = await marketService.getTicker(sym);
const trades = await marketService.getTrades(sym, lmt);
const bids = await marketService.getBids(sym, lmt);
const asks = await marketService.getAsks(sym, lmt);
const books = await marketService.getBooks(sym, lmt);
const depth = await marketService.getDepth(sym, lmt);

console.log('   ===== Market Service ==========')
console.log('       symbols: ', symbols);
console.log('       ticker: ', ticker);
console.log('       trades: ', trades);
console.log('       bids: ', bids);
console.log('       asks: ', asks);
console.log('       books: ', books);
console.log('       depth: ', depth);
console.log('   ====== End Market Service =====')


console.log('===== Done! The Example Calling Non-secure endpoints =====')
