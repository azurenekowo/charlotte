const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const express = require('express')

const server = express()
const config = require('./config.json')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use('/public', express.static(path.join(__dirname, 'assets')))

fs.readdirSync('routes').filter(f => f.endsWith('.js')).forEach(file => {
    const route = require(`./routes/${file}`)
    server.use(route.path, route)
    console.log(chalk.hex('#ffe793')('[UI] ') + 'Render ' + chalk.grey(route.path))
})
fs.readdirSync('routes/api').filter(f => f.endsWith('.js')).forEach(file => {
    const route = require(`./routes/api/${file}`)
    server.use(route.path, route)
    console.log(chalk.hex('#7FFFD4')('[API] ') + 'Registered ' + chalk.grey(route.path))
})

server.listen(config.http.port, async () => {
    console.log(chalk.greenBright('\n    ✔') + ' Listening ➜  ' + chalk.grey(`http://127.0.0.1${config.http.port == 80 ? '' : `:${config.http.port}`}`))
})