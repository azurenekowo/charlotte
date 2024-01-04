const express = require('express')
const router = express.Router()
const fs = require('fs')
const os = require('os')
const process = require('process')
const config = require('../../config.json')

router.get('/', async (request, response) => {
    response.setHeader('Content-Type', 'application/json').send({ 
        success: true, 
        data: {
            uptime: Math.round(process.uptime()),
            server: {
                machine: `${os.version} (${process.platform}) ${os.release()} ${process.arch}`,
                user: `${os.userInfo().username}@${os.hostname()}`,
                uptime: Math.round(os.uptime())
            },
            instance: {
                id: null
            }
        }
    })
})

module.exports = router
module.exports.path = '/api/status'