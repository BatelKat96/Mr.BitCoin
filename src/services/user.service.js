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
    logout
}

_createUsers()


async function login(userCred) {
    console.log('userCred:', userCred)

    try {
        const users = await asyncStorageService.query(STORAGE_KEY_USER)
        console.log('users:', users)

        const user = users.find(user => user.name.toLowerCase() === userCred.name.toLowerCase())
        console.log('user:', user)

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

async function changeBalance(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.balance + by || by
    await update(user)
    return user.balance
}


function saveLocalUser(user) {
    user = { _id: user._id, name: user.name, balance: user.balance }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


async function update({ _id, balance }) {
    const user = await asyncStorageService.get('user', _id)
    user.balance = balance
    await asyncStorageService.put('user', user)

    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}


function _createUsers() {
    let users = storageService.loadFromStorage(STORAGE_KEY_USER)
    if (!users || !users.length) {
        users = []
        users.push(_createUser('Ben', 1000, []))
        users.push(_createUser('Lola', 800, []))

        console.log('usersfftt:', users)
        storageService.saveToStorage(STORAGE_KEY_USER, users)
    }
}


function _createUser(name, balance, transactions) {
    console.log('name:', name)

    const user = getEmptyCredentials(name, balance, transactions)
    user._id = utilService.makeId()
    return user
}


function getEmptyCredentials(name = '', balance = 100, transactions = []) {
    return { name, balance, transactions }
}