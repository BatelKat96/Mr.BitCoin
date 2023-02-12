export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,

}

import { utilService } from './util.service'

const RATE = 'rates'
const MARKET_PRICE_HISTORY = 'market-price-history'
const AVG_BLOCK_SIZE = 'average-block-size'

import { storageService } from '@/services/storage.service.js'
import axios from 'axios'

async function getRate() {
    let rate = storageService.load(RATE)
    if (!rate) {
        const { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        rate = data
        console.log('rate:', rate)
        storageService.save(RATE, rate)
    }
    return rate
}

async function getAvgBlockSize() {
    let avg = storageService.load(AVG_BLOCK_SIZE)
    if (!avg || !avg.length) {
        const { data } = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
        avg = data
        console.log('avg:', avg)
        storageService.save(AVG_BLOCK_SIZE, avg)
    }
    return avg
}


async function getMarketPriceHistory() {
    try {
        const priceHistoryByDay = storageService.load(MARKET_PRICE_HISTORY)
        if (!priceHistoryByDay || priceHistoryByDay.length === 0) {
            let { data } = await axios.get(
                'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
            )
            storageService.save(MARKET_PRICE_HISTORY, data.values)
            return data.values
        }

        // get formatted days
        const timestamps = priceHistoryByDay.map((value) => value.x)
        const formattedDates = timestamps.map((timestamp) =>
            utilService.getFormattedDate(timestamp)
        )

        // get prices
        const prices = priceHistoryByDay.map((value) => value.y)

        // create object to send back to cmp
        const priceHistory = {
            labels: formattedDates,
            datasets: [{ label: 'Prices', data: prices, backgroundColor: '#ffc107' }],
        }
        return priceHistory
    } catch (err) {
        console.log('Failed to get price history')
        throw err
    }
}
