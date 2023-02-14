const user = {
    name: "Puki Ben David",
    balance: 100,
    transactions: []
}

export const userService = {
    getLoggedinUser,
}

function getLoggedinUser() {
    return user
}