const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:doujinID', async (request, response) => {
    response.send(fs.readFileSync('pages/reader.html').toString())
})

module.exports = router
module.exports.path = '/read'