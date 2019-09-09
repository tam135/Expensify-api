function makeExpensesArray() {
    return [
        {
            id: 1,
            amount: '12.99',
            style: 'Food',
            description: 'Starbucks before work',
            date: new Date().toLocaleString(/* 'en', { timeZone: 'UTC' } */)
        },
        {
            id: 2,
            amount: '40.00',
            style: 'Transportation',
            description: 'Oil change',
            date: new Date().toLocaleString(/* 'en', { timeZone: 'UTC' } */)
        },
        {
            id: 3,
            amount: '200.50',
            style: 'Bills',
            description: 'Electricity Bill',
            date: new Date().toLocaleString(/* 'en', { timeZone: 'UTC' } */)
        },
    ]
}

module.exports = {
    makeExpensesArray,
}