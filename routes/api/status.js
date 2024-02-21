const express = require('express')
const router = express.Router()
const fs = require('fs')
const os = require('os')
const process = require('process')
const config = require('../../config.json')
const { exec } = require('child_process')

router.get('/', async (request, response) => {
    response.setHeader('Content-Type', 'application/json').send({ 
        success: true, 
        data: {
            uptime: Math.round(process.uptime()),
            server: {
                machine: `${os.version} (${process.platform}_${process.arch}) ${os.release()}`,
                user: `${os.userInfo().username}@${os.hostname()}`,
                uptime: Math.round(os.uptime())
            },
            instance: {
                id: null,
                build: fs.readFileSync('COMMIT_ID.txt').toString()
            }
        }
    })
})

module.exports = router
module.exports.path = '/api/status'