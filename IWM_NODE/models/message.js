let connection = require('./config/db')
let moment = require('moment')

class Message {

    constructor(row) {
        this.row = row
    }

    get id () {
        return this.row.id
    }

    get content () {
        return this.row.content
    }

    get created_at () {
        return moment(this.row.created_at)
    }

    /**
     * Create new message
     */
    static create (content, callback) {

        connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], (err, result) => {

            if (err) {
                console.error(err)
            }

            callback(result)
        })
    }

    /**
     * Get all messages
     */
    static all (callback) {
        connection.query('SELECT * FROM messages', (err, rows) => {

            if (err) {
                console.error(err)
            }

            callback(rows.map(row => new Message(row)))
        })
    }

     /**
     * Delete a messages
     */
    static delete (id, callback) {
        connection.query('DELETE FROM messages WHERE id = ?', [id], (err, result) => {

            if (err) {
                console.error(err)
            }

            callback(result)
        })
    }

}

module.exports = Message