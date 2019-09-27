const xss = require('xss')
const path = require('path')
const express = require('express')
const ExpenseService = require('./expense-service')
const { requireAuth } = require('../middleware/basic-auth')

const expenseRouter = express.Router()
const jsonParser = express.json()

const serializeExpense = expense => ({
  id: expense.id,
  style: expense.style,
  amount: expense.amount,
  description: xss(expense.description),
  date: new Date(expense.date).toISOString().split("T")[0]
});

expenseRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ExpenseService.getAllExpenses(knexInstance)
            .then(expenses => {
                res.json(
                  expenses.map(expense => ({
                    id: expense.id,
                    amount: expense.amount,
                    style: expense.style,
                    description: xss(expense.description),
                    date: new Date(expense.date).toISOString().split("T")[0]
                  }))
                );
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {  amount, description, style, date } = req.body
        const newExpense = { amount, description, style, date }

        for (const [key, value] of Object.entries(newExpense))
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }

        ExpenseService.insertExpense(
            req.app.get('db'),
            newExpense
        )
            .then(expense => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl + `/${expense.id}`))
                  .json({
                    id: expense.id,
                    amount: expense.amount,
                    style: expense.style,
                    description: expense.description,
                    date: new Date(expense.date).toISOString().split("T")[0]
                  });
            })
            .catch(next)

    })

expenseRouter 
    .route('/:expense_id')
    .all((req, res, next) => {
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
                res.expense = expense // save the expense for the middleware
                next() 
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeExpense(res.expense))
    })
    .delete((req, res, next) => {
        ExpenseService.deleteExpense(
            req.app.get('db'),
            req.params.expense_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { date, amount, style, description } = req.body 
        const expenseToUpdate = { date, amount, style, description }
        
        const numberOfValues = Object.values(expenseToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'amount', 'style', or 'description'`
                }
            })
        }
        ExpenseService.updateExpense(
            req.app.get('db'),
            req.params.expense_id,
            expenseToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = expenseRouter