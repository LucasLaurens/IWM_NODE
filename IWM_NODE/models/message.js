let mongoose = require('./config/db')
let moment = require('moment')


let messageSchema = new mongoose.Schema({
    content: String,
    created_at: Date
});

let MessageModel = mongoose.model('messages', messageSchema);

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

        const new_message = new MessageModel({
            message: content,
            created_at: new Date()
        });

        new_message.save()
            .then(data => {
                callback(data)
            }).catch(err => {
                console.error(err)
            })
    }

    /**
     * Get all messages
     */
    static all (callback) {
        MessageModel.find()
            .then(messages => {
                callback(messages.map(msg => new Message(msg)))
            }).catch(err => {
                console.error(err)
            });
    }

     /**
     * Delete a messages
     */
    static delete (id, callback) {
        MessageModel.findOneAndDelete(id)
            .then(data => {
                callback(data)
            }).catch(err => {
                console.error(err)
            });
    }
}

module.exports = Message