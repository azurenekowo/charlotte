const express = require('express')
const router = express.Router()
const config = require('../../config.json')

router.get('/', async (request, response) => {
    if(!request.query.url) return response.sendStatus(400)
    const imageURL = request.query.url
    const imageExt = imageURL.split('.').slice(-1).toString()

    const requestURL = `${config.backend.host}/download-image?url=${encodeURIComponent(imageURL)}`
    try {
        const res = await fetch(requestURL)
        if(!res.ok) return response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: res })
        const data = await res.arrayBuffer()
        const image = Buffer.from(data)
        response.setHeader('Content-Type', `image/${imageExt}`)
            .setHeader('Cache-Control', 'max-age=31536000, must-revalidate')
            .send(image)
    }
    catch (e) {
        console.log(e)
        response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })
    }
})

module.exports = router
module.exports.path = '/api/chapter/getImage'
