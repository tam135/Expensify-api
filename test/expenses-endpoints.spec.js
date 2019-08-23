const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeExpensesArray } = require('./expenses.fixtures')

describe('Expenses Endpoints', function() {
    let db 

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('expense_logs').truncate())
    
    afterEach('cleanup', () => db('expense_logs').truncate())
    
    describe(`GET /api/expenses`, () => {
        context(`Give no expenses`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/expenses')
                    .expect(200, [])
            })
        })

        context('Given there are expenses in the database', () => {
            const testExpenses = makeExpensesArray()

            beforeEach('insert expenses', () => {
                return db
                    .into('expense_logs')
                    .insert(testExpenses)
            })

            it('GET /api/expenses responds with 200 and all of the expenses', () => {
                return supertest(app)
                    .get('/api/expenses')
                    .expect(200, testExpenses)
            })
        })
    })

    describe(`GET /api/expenses/:expense_id`, () => {
        context(`Given no expenses`, () => {
            it(`responds with 404`, () => {
                const expenseId = 123456 
                return supertest(app)
                    .get(`/api/expenses/${expenseId}`)
                    .expect(404, { error: { message: `Expense doesn't exist` } })
            })
        })
        context('Given there are expenses in the database', () => {
            const testExpenses = makeExpensesArray()

            beforeEach('insert expenses', () => {
                return db
                    .into('expense_logs')
                    .insert(testExpenses)
            })

            it('GET /api/expenses/:expense_id responds with 200 and the specified expense', () => {
                const expenseId = 2
                const expectedExpense = testExpenses[expenseId - 1]
                return supertest(app)
                    .get(`/api/expenses/${expenseId}`)
                    .expect(200, expectedExpense)
            })
        })
    })
})