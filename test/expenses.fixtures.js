function makeExpensesArray() {
    return [
      {
        id: 1,
        amount: "12.99",
        style: "Food",
        description: "Starbucks before work",
        date: new Date().toDateString()
      },
      {
        id: 2,
        amount: "40.00",
        style: "Transportation",
        description: "Oil change",
        date: new Date().toDateString()
      },
      {
        id: 3,
        amount: "200.50",
        style: "Bills",
        description: "Electricity Bill",
        date: new Date().toDateString()
      }
    ];
}

module.exports = {
    makeExpensesArray,
}