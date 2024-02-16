const express = require('express')
const router = express.Router()
const fs = require('fs')
const chalk = require('chalk')
const config = require('../../config.json')

router.post('/', async (request, response) => {
    if(!request.body || !request.body['url'] || !request.body['identifier']) return response.sendStatus(400)
    const imageURL = request.body['url']
    const identifier = request.body['identifier']
    const imageExt = imageURL.split('.').slice(-1).toString()
    const imageName = imageURL.split('/').slice(-1).toString().replace(`.${imageExt}`, '')

    // Check if cached version exist to save some requests
    const cachedImagePath = `${config.backend.cacheFolder.slice(0, -1)}/${identifier}/${imageName}.${imageExt}`
    const cachedFolderPath = `${config.backend.cacheFolder.slice(0, -1)}/${identifier}`
    if(fs.existsSync(cachedImagePath)) {        
        // console.log(chalk.bold(chalk.hex('975cf6')('[Debug] ')) + `${imageName} is ${chalk.bold(chalk.greenBright('cached'))}, serving file from ${cachedImagePath}`)
        return response.setHeader('Content-Type', `image/${imageExt}`).send(fs.readFileSync(cachedImagePath))
    }

    const requestURL = `${config.backend.host}/download-image?url=${encodeURIComponent(imageURL)}`
    try {
        const res = await fetch(requestURL)
        if(!res.ok) return response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: res })

        const data = await res.arrayBuffer()
        const image = Buffer.from(data)
        // console.log(chalk.bold(chalk.hex('975cf6')('[Debug] ')) + `${imageName} is ${chalk.bold(chalk.redBright('not cached'))}, saving to ${cachedImagePath}`)
        if(!fs.existsSync(cachedFolderPath)) fs.mkdirSync(cachedFolderPath)
        
        fs.writeFileSync(cachedImagePath, image)
        response.setHeader('Content-Type', `image/${imageExt}`).send(image)
    }
    catch (e) {
        console.log(e)
        response.status(503).setHeader('Content-Type', 'application/json').send({ success: false, data: e })
    }
})

module.exports = router
module.exports.path = '/api/chapter/getImage'
