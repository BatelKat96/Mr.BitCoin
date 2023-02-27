export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

import { utilService } from './util.service'
import { storageService } from './storage.service.js'

const RATE = 'rates'
const MARKET_PRICE_HISTORY = 'market-price-history'
const AVG_BLOCK_SIZE = 'average-block-size'

import axios from 'axios'

async function getRate(value) {
    let rate = storageService.loadFromStorage(RATE)
    if (rate) return rate
    try {
        const { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        rate = data
        console.log('rate:', rate)
        storageService.saveToStorage(RATE, rate)
        return rate
    } catch (err) {
        throw new Error('Cant get rates')
    }
}

async function getAvgBlockSize() {
    let avg = storageService.loadFromStorage(AVG_BLOCK_SIZE)
    console.log('avg:', avg)

    if (avg && avg.length > 0) return avg
    if (!avg || !avg.length) {
        try {
            const { data } = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
            avg = data
            storageService.saveToStorage(AVG_BLOCK_SIZE, avg)
            return avg
        } catch (err) {
            throw new Error('Cant get avrges')
        }
    }
}


async function getMarketPriceHistory() {
    try {
        let priceHistoryByDay = storageService.loadFromStorage(MARKET_PRICE_HISTORY)
        if (!priceHistoryByDay || priceHistoryByDay.length === 0) {
            let { data } = await axios.get(
                'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
            )
            priceHistoryByDay = data.values
            storageService.saveToStorage(MARKET_PRICE_HISTORY, priceHistoryByDay)
        }

        // get formatted days
        const timestamps = priceHistoryByDay.map((value) => value.x)
        const formattedDates = timestamps.map((timestamp) =>
            utilService.getFormattedDate(timestamp * 1000)
        )

        // get prices
        const prices = priceHistoryByDay.map((value) => value.y)

        // create object to send back to cmp
        const priceHistory = {
            labels: formattedDates,
            datasets: [{ label: 'Prices (USD)', data: prices, backgroundColor: '#ffc107' }],
        }
        return priceHistory
    } catch (err) {
        console.log('Failed to get price history')
        throw err
    }
}
