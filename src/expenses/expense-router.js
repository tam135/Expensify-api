const express = require('express')
const ExpenseService = require('./expense-service')

const expenseRouter = express.Router()
const jsonParser = express.json()

expenseRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ExpenseService.getAllExpenses(knexInstance)
            .then(expenses => {
                res.json(expenses.map(expense => ({
                    id: expense.id,
                    amount: expense.amount,
                    style: expense.style,
                    description: expense.description,
                    date: new Date(expense.date).toLocaleString()
                })))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { amount, description, style } = req.body
        const newExpense = { amount, description, style }
        ExpenseService.insertExpense(
            req.app.get('db'),
            newExpense
        )
            .then(expense => {
                res
                    .status(201)
                    .location(`/api/expenses/${expense.id}`)
                    .json({
                        id: expense.id,
                        amount: expense.amount,
                        style: expense.style,
                        description: expense.description,
                        date: new Date(expense.date).toLocaleString()
                    })
            })
            .catch(next)

    })

expenseRouter 
    .route('/:expense_id')
    .get((req, res, next) => {
        ExpenseService.getById(
            req.app.get('db'),
            req.params.expense_id
        )
            .then(expense => {
                if (!expense) {
                    return res.status(404).json({
                        error: { message: `Expense doesn't exist` }
                    })
                }
                res.json({
                    id: expense.id,
                    amount: expense.amount,
                    style: expense.style,
                    description: expense.description,
                    date: new Date(expense.date).toLocaleString()
                })
            })
            .catch(next)
    })

module.exports = expenseRouter