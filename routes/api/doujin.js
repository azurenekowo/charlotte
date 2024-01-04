const express = require('express')
const router = express.Router()
const fs = require('fs')
const config = require('../../config.json')

router.get('/', async (request, response) => {
    if(!request.query) return response.sendStatus(400)
    const doujinUrl = request.query['link']
    try {
        const res = await fetch(`${config.backend.host}/get-metadata?url=${doujinUrl}`)
        const data = await res.json()
        response.setHeader('Content-Type', 'application/json').send({ success: true, data: data })
    }
    catch (e) {
        response.setHeader('Content-Type', 'application/json').send({ success: false, data: JSON.stringify(e) })
    }
})

module.exports = router
module.exports.path = '/api/getDoujin'