const user = {
    name: "Ben Jackson",
    balance: 100,
    transactions: []
}

import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service'
import { utilService } from './util.service.js'

const STORAGE_KEY_USER = 'user_db'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    getEmptyCredentials,
    login,
    signup,
    logout,
    updateBalance
}

_createUsers()


async function login(userCred) {

    try {
        const users = await asyncStorageService.query(STORAGE_KEY_USER)
        console.log('users:', users)
        const user = users.find(user => user.name.toLowerCase() === userCred.name.toLowerCase())
        if (user) {
            return saveLocalUser(user)
        } else {
            throw new Error('User name doesn\'t exist')
        }
    } catch (err) {
        console.log('Failed to login')
        throw err
    }
}

async function signup(userCred) {
    userCred.balance = 1000
    userCred.transactions = []
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await asyncStorageService.post(STORAGE_KEY_USER, userCred)
    return await login(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function updateBalance(amount, currContact) {
    const transaction = {
        toId: contact._id,
        to: currContact.name,
        at: Date.now(),
        amount,
    }
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.balance -= amount
    user.transactions.push(transaction)

    const updateUser = await asyncStorageService.put(STORAGE_KEY_USER, user)

    if (getLoggedinUser()._id === updateUser._id) saveLocalUser(updateUser)
    return updateUser.balance
}


function saveLocalUser(user) {
    user = { _id: user._id, name: user.name, balance: user.balance, transactions: user.transactions }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// async function update({ _id, balance }) {
//     const user = await asyncStorageService.get('user', _id)
//     user.balance = balance
//     await asyncStorageService.put('user', user)

//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }


function _createUsers() {
    let users = storageService.loadFromStorage(STORAGE_KEY_USER)
    if (!users || !users.length) {
        users = []
        users.push(_createUser('Ben', 1000, []))
        users.push(_createUser('Lola', 800, []))
        storageService.saveToStorage(STORAGE_KEY_USER, users)
    }
}


function _createUser(name, balance, transactions) {
    const user = getEmptyCredentials(name, balance, transactions)
    user._id = utilService.makeId()
    return user
}


function getEmptyCredentials(name = '', balance = 100, transactions = []) {
    return { name, balance, transactions }
}