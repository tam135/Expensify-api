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

    describe(`POST /api/expenses`, () => {
        it(`creates an expense, responding with 201 and the new expense`, () => {
            this.retries(3)
            const newExpense = {
                amount: '99.99',
                style: 'Food',
                description: 'Groceries for the week'
            }
            return supertest(app)
                .post('/api/expenses')
                .send(newExpense)
                .expect(201)
                .expect(res => {
                    expect(res.body.amount).to.eql(newExpense.amount)
                    expect(res.body.style).to.eql(newExpense.style)
                    expect(res.body.description).to.eql(newExpense.description)
                    expect(res.headers.location).to.eql(`/api/expenses/${res.body.id}`)
                    const expected = new Date().toLocaleString('en', { timeZone: 'UTC' })
                    const actual = new Date(res.body.date).toLocaleString()
                    expect(actual).to.eql(expected)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/expenses/${postRes.body.id}`)
                        .expect(postRes.body)
                    )
        })
    })
})