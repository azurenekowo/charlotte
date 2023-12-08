const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:doujinUrl', async (request, response) => {
    response.send(fs.readFileSync('pages/indexdoujin.html').toString())
})

module.exports = router
module.exports.path = '/doujin'