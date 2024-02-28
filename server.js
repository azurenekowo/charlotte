const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const express = require('express')
const { exec } = require('child_process')

const server = express()
const config = require('./config.json')

console.log(chalk.hex('e77681')('\n    ~ ') + chalk.bold(chalk.hex('975cf6')('Charlotte 🌙\n')))
console.log(chalk.bold(chalk.hex('8be3c9')('[Info] ')) + 'Started initalizing...\n')
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use('/public', express.static(path.join(__dirname, 'assets')))

exec('git log --pretty=tformat:"%h" -n1 .', (e, stdout, stderr) => {
    fs.writeFileSync('COMMIT_ID.txt', stdout, 'utf-8')
})

if(fs.existsSync(config.backend.cacheFolder) && fs.readdirSync(config.backend.cacheFolder).length > 0) {
    console.log(chalk.bold(chalk.hex('#8caaee')('[Cache] ')) + 'Cleaning up cached doujins...')
    fs.readdirSync(config.backend.cacheFolder).filter(f => f != '.gitkeep').forEach(f => {
        fs.rmSync(`${config.backend.cacheFolder.slice(0, -1)}/${f}`, { recursive: true })
    })
}

fs.readdirSync('routes').filter(f => f.endsWith('.js')).forEach(file => {
    const route = require(`./routes/${file}`)
    server.use(route.path, route)
    console.log(chalk.bold(chalk.hex('#ffe793')('[Pages] ') + 'Routed ') + chalk.grey(route.path))
})
fs.readdirSync('routes/api').filter(f => f.endsWith('.js')).forEach(file => {
    const route = require(`./routes/api/${file}`)
    server.use(route.path, route)
    console.log(chalk.bold(chalk.hex('#7FFFD4')('[API] ') + 'Registered ') + chalk.grey(route.path))
})

server.listen(config.http.port, async () => {
    console.log(chalk.bold(chalk.greenBright('\n   ✔ Server is up!')) + '\n     Listening ➜ ' + chalk.grey(`http://127.0.0.1${config.http.port == 80 ? '' : `:${config.http.port}`}`))
    console.log(' ')
})