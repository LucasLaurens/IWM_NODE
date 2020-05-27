const express = require('express')
const port = 8080

let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let flash = require('./middlewares/flash')
let Message = require('./models/message')

// set templating
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

// set distribute files (middleware)
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'aze',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(flash)

// Routes

// Home with template
app.get('/', (req, res) => {
    Message.all( function (messages) {
        res.render('pages/base', {
            messages: messages
        })
    })
})

// Post message in Home (mysql db)
app.post('/', (req, res) => {
    if (req.body.message === undefined || req.body.message === '') {
        req.flash('error', "Vous n'avez pas écrit de message")
        res.redirect('/')
    } else {
        console.log(req.body.message)
        try {
            Message.create(req.body.message, function () {
                req.flash('success', "Merci !")
                res.redirect('/')
            })
        } catch (e) {
            console.error(e)
        }
    }
})

// Delete a message by id
app.get('/message/:id', function (req, res) {

    const { id } = req.params

    try {
        Message.delete(id, function () {
            req.flash('deleted', "Le message a bien été supprimé !")
            res.redirect('/')
        })
    } catch (e) {
        console.error(e)
    }
})

app.listen(port)
