var express = require('express')
var chalk = require("chalk")
var app = express()

// Get Config File
var { system } = require('./config/path')
var { port, name, env, url } = require('./config/app')

// List Route
var users = require(`./${system.router}/users`)
var tasks = require(`./${system.router}/tasks`)

// Read Form Request
app.use(express.json())

// Read Encode Form Request
app.use(express.urlencoded({ extended: true }))

// Main Web Route
app.get('/', (permintaan, respon) => {
    if (env == 'local') {
        console.log(chalk.yellow.bold(`[${name}] Response: Halo Dunia!`));
    }

    respon.send('Halo Dunia!')
})

app.use('/api', users)
app.use('/api', tasks)

// Listen Web
app.listen(port, () => {
    console.log('--------------------------------------')
    
    if (env == 'local') {
        console.log(chalk.red.bold(`[${name}] Warning you running this server in ${env} mode`));
    }

    console.log(chalk.green.bold(`[${name}] ${name} listening on port ${port}`))
    console.log(chalk.green.bold(`[${name}] server serve at ${url}`))
})