const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', async (request, response) => {
    response.send(fs.readFileSync('pages/search.html').toString())
})

module.exports = router
module.exports.path = '/search'