const express = require('express')
const app = express()

const datas = require('./datas.json')
const tennisplayers = require('./tennisplayers.json')

const port = 8080

// set templating
app.set('view engine', 'ejs')

// set distribute files
app.use('/assets', express.static('public'))

// Home with template
app.get('/', (req, res) => {
    res.render('pages/base', {
        test: 'salut'
    })
})

// Json tennis players
app.get('/players', (req, res) => {
    res.json(tennisplayers)
})

// Json tennis players with last name param in url
app.get('/players/find/:lastname', (req, res) => {
    const { lastname } = req.params
    let result = tennisplayers.players.filter(player => player.lastname.toUpperCase() === lastname.toUpperCase())

    result && result !== undefined ? res.json(result) : res.sendStatus(404)
})

// Json tennis players with id param in url
app.get('/players/:id', (req, res) => {
    const { id } = req.params
    let result = tennisplayers.players.filter(player => player.id == id)

    result && result !== undefined ? res.json(result) : res.sendStatus(404)
})

// Json students
app.get('/students', (req, res) => {
    res.json(datas)
})

// Json students
app.get('/students/:lastname', (req, res) => {
    const { lastname } = req.params
    let result = datas.students.filter(student => student.lastname.toUpperCase() === lastname.toUpperCase())

    result && result !== undefined ? res.json(result) : res.sendStatus(404)

})

// Json test
app.get('/home', (req, res) => {
    res.send('Bienvenue')
})

// Json test
app.get('/tableau', (req, res) => {
    const arr = [1, 2, 3]
    res.send(arr)
})


app.listen(port)
