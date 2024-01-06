const express = require('express')
const router = express.Router()
const fs = require('fs')
const config = require('../../config.json')

router.post('/', async (request, response) => {
    if(!request.body || !request.body['url']) return response.sendStatus(400)
    const imageURL = request.body['url']
    const imageExt = imageURL.split('.').slice(-1).toString()
    
    const requestURL = `${config.backend.host}/download-image?url=${encodeURIComponent(imageURL)}`
    try {
        const res = await fetch(requestURL)
        const data = await res.arrayBuffer()
        const image = Buffer.from(data)
        response.setHeader('Content-Type', `image/${imageExt}`).send(image)
    }
    catch (e) {
        console.log(e.data)
        response.setHeader('Content-Type', 'application/json').send({ success: false, data: JSON.stringify(e) })
    }
})

module.exports = router
module.exports.path = '/api/chapter/image'
