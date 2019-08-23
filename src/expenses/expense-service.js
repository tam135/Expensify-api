const ExpenseService = {
    getAllExpenses(knex) {
        return knex.select('*').from('expense_logs')
    },
    insertExpense(knex, newExpense) {
        return knex
            .insert(newExpense)
            .into('expense_logs')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('expense_logs').select('*').where('id', id).first()
    },
    deleteExpense(knex, id) {
        return knex('expense_logs')
            .where({ id })
            .delete()
    },
    updateExpense(knex, id, newExpenseFields) {
        return knex('expense_logs')
            .where({ id })
            .update(newExpenseFields)
    },
}

module.exports = ExpenseService