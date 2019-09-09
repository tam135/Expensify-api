function makeExpensesArray() {
    return [
        {
            id: 1,
            amount: '12.99',
            style: 'Food',
            description: 'Starbucks before work',
<<<<<<< HEAD
            date:  new Date().toLocaleString('en', { timeZone: 'UTC' }) 
=======
            date: '2019-03-12'/* new Date().toLocaleString( 'en', { timeZone: 'UTC' } ) */
>>>>>>> d332a5f3bac9abb9a6a3dd263df909ba853189df
        },
        {
            id: 2,
            amount: '40.00',
            style: 'Transportation',
            description: 'Oil change',
<<<<<<< HEAD
            date: new Date().toLocaleString('en', { timeZone: 'UTC' }) 
=======
            date:'2019-05-05'/* new Date().toLocaleString( 'en', { timeZone: 'UTC' } ) */
>>>>>>> d332a5f3bac9abb9a6a3dd263df909ba853189df
        },
        {
            id: 3,
            amount: '200.50',
            style: 'Bills',
            description: 'Electricity Bill',
<<<<<<< HEAD
            date: new Date().toLocaleString('en', { timeZone: 'UTC' }) 
=======
            date: '2019-03-15'/* new Date().toLocaleString( 'en', { timeZone: 'UTC' } ) */
>>>>>>> d332a5f3bac9abb9a6a3dd263df909ba853189df
        },
    ]
}

module.exports = {
    makeExpensesArray,
}