function makeExpensesArray() {
    return [
        {
            id: 1,
            amount: '12.99',
            style: 'Food',
            description: 'Starbucks before work',
            date: new Date('2029-01-22T16:28:32.615Z').toLocaleString()
        },
        {
            id: 2,
            amount: '40.00',
            style: 'Transportation',
            description: 'Oil change',
            date: new Date('2100-05-22T16:28:32.615Z').toLocaleString()
        },
        {
            id: 3,
            amount: '200.50',
            style: 'Bills',
            description: 'Electricity Bill',
            date: new Date('1919-12-22T16:28:32.615Z').toLocaleString()
        },
    ]
}

module.exports = {
    makeExpensesArray,
}