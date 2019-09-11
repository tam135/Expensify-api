const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  getAllUsers(knex) {
    return knex.select("*").from("expensity_users");
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("expensity_users")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from("expensity_users")
      .select("*")
      .where("id", id)
      .first();
  },

  deleteUser(knex, id) {
    return knex("expensity_users")
      .where({ id })
      .delete();
  },

  updateUser(knex, id, newUserFields) {
    return knex("expensity_users")
      .where({ id })
      .update(newUserFields);
  },
  hasUserWithUserName(db, user_name) {
     return db('expensity_users')
       .where({ user_name })
       .first()
       .then(user => !!user)
   },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password be less than 72 characters";
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
        return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
       return 'Password must contain 1 upper case, lower case, number and special character'
    }
    return null
    }
};

module.exports = UsersService