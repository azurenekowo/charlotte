const express = require('express')
const router = express.Router()
const _ = require('lodash')
const fs = require('fs')
const config = require('../../config.json')

// https://stackoverflow.com/a/175787
function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

router.post('/', async (request, response) => {
    if(!request.query) return response.sendStatus(400)
    const searchQuery = request.query['query']
    let sPage = request.query['page']

    try {
        if (sPage && isNumeric(sPage)) {
            sPage = parseInt(sPage)
        } else {
            sPage = 1
        }
        const res = await fetch(`${config.backend.host}/tag/the-loai-${searchQuery}.html?page=${sPage}`) // a quirk of the tag endpoint
        // if(!res.ok) return response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })

        const responseJson = await res.json()
        const doujins = responseJson.docs
        response.setHeader('Content-Type', 'application/json').send({ success: true, data: doujins, maxpage: responseJson.maxpage })
    }
    catch (e) {
        response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })
    }
})

module.exports = router
module.exports.path = '/api/search-tag'