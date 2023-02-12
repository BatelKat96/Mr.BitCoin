export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

const RATE = 'rates'
const MARKET_PRICE_HISTORY = 'market-price-history'
const AVG_BLOCK_SIZE = 'average-block-size'

import { storageService } from '@/services/storage.service.js'
import axios from 'axios'

async function getRate() {
    let rate = storageService.load(RATE)
    if (!rate) {
        rate = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        console.log('rate:', rate.data)

        storageService.save(RATE, rate)
    }
    return rate.data
}

async function getMarketPriceHistory() {
    let history = storageService.load(MARKET_PRICE_HISTORY)
    if (!history) {
        history = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        console.log('history:', history)
        storageService.save(MARKET_PRICE_HISTORY, history)
    }
    return history
}

async function getAvgBlockSize() {
    let avg = storageService.load(AVG_BLOCK_SIZE)
    if (!avg) {
        avg = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
        console.log('avg:', avg)
        storageService.save(AVG_BLOCK_SIZE, avg)
    }
    return avg
}