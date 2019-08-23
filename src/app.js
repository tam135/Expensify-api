require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const winston = require('winston')
const ExpenseService = require('./expenses/expense-service')

const app = express()
const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/api/expenses', (req, res, next) => {
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

app.get('/api/expenses/:expense_id', (req, res, next) => {
    ExpenseService.getById(
        req.app.get('db'),
        req.params.expense_id
        )
            .then(expense => {
                if(!expense) {
                    return res.status(404).json({
                        error: { message: `Expense doesn't exist`}
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

app.post('/api/expenses', jsonParser, (req, res, next) => {
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



app.get('/', (req,res) =>{
    res.send('Hello, World!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if(NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.log(error)
        response = { message: error.message, error}
    }
    res.status(500).json(response)
})
 
module.exports = app