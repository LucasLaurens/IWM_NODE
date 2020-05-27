let app = require('express')()
const datas = require('./datas.json')
const port = 8080


app.set('view engine', 'ejs')

app.get('/students', (req, res) => {
    res.json(datas)
})

app.get('/students/:lastname', (req, res) => {
    const { lastname } = req.params
    let result = datas.students.filter(student => student.lastname.toUpperCase() === lastname.toUpperCase())

    result && result !== undefined ? res.json(result) : res.sendStatus(404)

})

app.get('/home', (req, res) => {
    res.send('Bienvenue')
})

app.get('/tableau', (req, res) => {
    const arr = [1, 2, 3]
    res.send(arr)
})

app.get('/', (req, res) => {
    res.render('pages/index', {
        test: 'salut'
    })
})

app.listen(port)
