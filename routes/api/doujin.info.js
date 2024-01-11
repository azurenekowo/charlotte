const express = require('express')
const router = express.Router()
const fs = require('fs')
const config = require('../../config.json')

router.get('/', async (request, response) => {
    if(!request.query) return response.sendStatus(400)
    const doujinUrl = request.query['link']
    try {
        const res = await fetch(`${config.backend.host}/get-metadata?url=${doujinUrl}`)
        if(!res.ok) return response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })

        const data = await res.json()
        response.setHeader('Content-Type', 'application/json').send({ success: true, data: data })
    }
    catch (e) {
        response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })
    }
})

module.exports = router
module.exports.path = '/api/doujin/info'