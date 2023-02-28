'use strict'

export const utilService = {
    makeId,
    getRandomInt,
    getFormattedDate,
    getRandomGender
}

function makeId() {
    var pt1 = Date.now().toString(16)
    var pt2 = getRandomInt(1000, 9999).toString(16)
    var pt3 = getRandomInt(1000, 9999).toString(16)
    return `${pt3}-${pt1}-${pt2}`.toUpperCase()
}

function getRandomInt(num1, num2) {
    var max = num1 >= num2 ? num1 + 1 : num2 + 1
    var min = num1 <= num2 ? num1 : num2
    return Math.floor(Math.random() * (max - min)) + min
}

function getFormattedDate(timeStamp) {
    // const dateFormat = new Date(timeStamp * 1000)
    const dateFormat = new Date(timeStamp)
    const formattedDate =
        dateFormat.getDate() +
        '/' +
        (dateFormat.getMonth() + 1) +
        '/' +
        dateFormat.getFullYear()
    return formattedDate
}


function getRandomGender() {
    const gender = Math.floor(Math.random() * 2);
    if (gender === 0) return 'women'
    else return 'men'
}