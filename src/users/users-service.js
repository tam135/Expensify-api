const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('expensify_users')
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('expensify_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .from('expensify_users')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteUser(knex, id) {
        return knex('expensify_users')
            .where({ id })
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('expensify_users')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersService