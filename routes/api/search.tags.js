const express = require('express')
const router = express.Router()
const _ = require('lodash')
const fs = require('fs')
const config = require('../../config.json')

router.post('/', async (request, response) => {
    if(!request.query) return response.sendStatus(400)
    const searchQuery = request.query['query']
    try {
        const res = await fetch(`${config.backend.host}/tag/the-loai-${searchQuery}.html`)
        // if(!res.ok) return response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })

        const data = await res.json()
        const results = data.docs
        const doujinData = _.uniqWith([...new Set(results.flat())], _.isEqual)

        if(!doujinData.at(-1).url) {
            doujinData.pop()
        }
        response.setHeader('Content-Type', 'application/json').send({ success: true, data: doujinData })
    }
    catch (e) {
        response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })
    }
})

module.exports = router
module.exports.path = '/api/search-tag'