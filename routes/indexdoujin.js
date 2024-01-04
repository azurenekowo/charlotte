const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:doujinUrl', async (request, response) => {
    response.send(fs.readFileSync('pages/doujin.bs.html').toString())
})

router.get('/', async (request, response) => {
    response.status(301).redirect('/')
})

module.exports = router
module.exports.path = '/doujin'