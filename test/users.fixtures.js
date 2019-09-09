function makeUsersArray() {
    return [
        {
            id: 1,
            date_created: '2019-02-14',/* new Date('2029-01-22T16:28:32.615Z').toLocaleString('en', { timeZone: 'UTC' }), */
            fullname: 'Samwell Tarly',
            username: 'starly123@gmail.com',
            password: 'secret'
        },
        {
            id: 2,
            date_created: '2019-03-19',/* new Date('2100-05-22T16:28:32.615Z').toLocaleString('en', { timeZone: 'UTC' }), */
            fullname: 'Jon Snow',
            username: 'bigjon',
            password: 'secret'
        }
    ]
}

module.exports = {
    makeUsersArray
}