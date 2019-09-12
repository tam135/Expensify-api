const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    full_name: xss(user.full_name),
    user_name: xss(user.user_name),
    date_created: new Date(user.date_created).toLocaleString('en', { timeZone: 'UTC' }),
})

usersRouter 
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
         const { password, user_name, full_name, } = req.body;

         for (const field of ["full_name", "user_name", "password"])
           if (!req.body[field])
             return res.status(400).json({
               error: { message:`Missing '${field}' in request body` }
             });

         const passwordError = UsersService.validatePassword(password);

         if (passwordError)
           return res.status(400).json({ error: passwordError });

        UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_name
        )
            .then(hasUserWithUserName => {
                if (hasUserWithUserName)
                    return res.status(400).json({ error: `Username already taken` })

            return UsersService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                      user_name,
                      password: hashedPassword,
                      full_name,
                      date_created: "now()"
                    }
                    
                    return UsersService.insertUser(
                      req.app.get("db"),
                      newUser
                    ).then(user => {
                      res
                        .status(201)
                        .location(
                          path.posix.join(req.originalUrl, `/${user.id}`)
                        )
                        .json(UsersService.serializeUser(user));
                    });
                })
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id')
    .all((req, res, next) => {
        UsersService.getById(
            req.app.get('db'),
            req.params.user_id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { full_name, user_name, password,  } = req.body
        const userToUpdate = { full_name, user_name, password }

        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'full_name', 'user_name', or 'password'`
                }
            })

        UsersService.updateUser(
            req.app.get('db'),
            req.params.user_id,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = usersRouter