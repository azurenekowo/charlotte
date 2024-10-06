window.addEventListener('load', async () => {
    const doujinIdentifier = window.location.pathname.replace('/doujin/', '')
    const res = await fetch(`/api/doujin/info?link=${doujinIdentifier}`, {
        headers: {
        },
        method: 'GET'
    })
    const data = await res.json()
    if(!data.success) {
        return showMessage('Backend API error: Loading doujin information failed.', 'error', data.data)
    }
    dialogVisibility(false)
    document.querySelector('div.doujin-info').classList.remove('charlotte-hidden')

    const doujinData = data.data
    document.querySelector('.btn-extlink').addEventListener('click', () => {
        window.location.href = `${doujinData.from}`
    })
    setInfoPlaceholders(doujinData.details)
    modifyMetatags(doujinData.details, doujinIdentifier)

    await getChapters(doujinIdentifier, doujinIdentifier)
})

async function getChapters(doujinURL, id) {
    try {
        const res = await fetch(`/api/doujin/chaptersList?url=${doujinURL}`)
        const data = await res.json()

        const chapterData = data.data
        chapterData.reverse()

        const chapterSelector = document.querySelector('.chaptersList')
        
        for(let i = 1; i < chapterData.length + 1; i++) {
            const chapterListItem = document.createElement('li')
            const chapterName = `${chapterData[i -1].title}`
            chapterListItem.innerHTML = `<button class="btn btn-sm dropdown-item chapterItem">${chapterName}</button>`
            chapterListItem.addEventListener('click', async () => { 
                setReaderURL(chapterData[i - 1].url, id)
                Array.from(document.querySelectorAll('button.chapterItem')).forEach(item => item.classList.remove('active'))
                chapterListItem.classList.add('active')
                document.querySelector('button.chapter-display').innerHTML = chapterName
            })
            chapterSelector.appendChild(chapterListItem)
        }
        Array.from(document.querySelectorAll('button.chapterItem'))[0].click()
    }
    catch(e) {
        return showMessage('Backend API error: Loading doujin chapters failed.', 'error', e)
    }
}

function setReaderURL(url, refurl) {
    document.querySelector('.btn-readnow').addEventListener('click', () => {
        window.location.href = `/read/${url}`
    })
}

function setInfoPlaceholders(doujinData) {
    // Titles
    try {
        const doujinTitle = doujinData.name.includes('-') ? mainTitleHandler(doujinData.name) : doujinData.name
        document.title = doujinTitle
        document.querySelector('#title-main').innerHTML = doujinTitle
        document.querySelector('.bc-mainTitle').innerHTML = doujinTitle
        doujinData.other_names != null ? document.querySelector('#title-alt').innerHTML = doujinData.other_names.join(', ') : document.querySelector('#title-alt').classList.add('charlotte-hidden')
        // Cover art
        document.querySelector('img.display-coverart').src = doujinData.cover
        // Characters Tag
        document.querySelector('.characters').innerHTML += `${doujinData.characters ? doujinData.characters.map(tag => `<span class="badge text-bg-secondary fw-normal tag">${tag}</span>`).join('\n') : `<span class="badge text-bg-info fw-normal tag">None (Original Character)</span>`}`
        // Categories Tag
        document.querySelector('.categories').innerHTML += `${doujinData.tags.map(tag => `<span class="badge text-bg-secondary fw-normal tag"><a class="noformat" href="${tag.link.replace('the-loai-', '/search?q=tag:')}">${tag.name}</a></span>`).join('\n')}`
        if(doujinData.doujinshi) document.querySelector('.categories').innerHTML += `\n<span class="badge text-bg-info fw-normal tag">${doujinData.doujinshi}</span>`
        // Translation Info
        if(doujinData.translators) document.querySelector('#display-transGroup').innerHTML = `Translator: <a class="noformat" href="${doujinData.translators[0].url.replace('g/', '/translators-group/')}">${doujinData.translators[0].text}</a>`
        else {
            document.querySelector('#display-transGroup').classList.add('d-none')
            document.querySelector('#seperatorTranslatorInf').classList.add('d-none')
        } 
        document.querySelector('#display-uploader').innerHTML = `Uploader: ${doujinData.uploader}`
        // Author
        document.querySelector('#display-author').innerHTML = `${doujinData.authors.join(', ')}`
        // Status + LU
        document.querySelector('#display-status').innerHTML = `${doujinData.status == 'Đã hoàn thành' ? '<i class="fa-solid fa-check" style="color: #198754;"></i>&nbsp;Completed' : '<i class="fa-solid fa-spinner"></i></i>&nbsp;Work In Progress'}`
        document.querySelector('#display-LUStatus').innerHTML = `${dateString(doujinData.last_updated)}`
        // Description
        document.querySelector('#display-desc').innerHTML = `${doujinData.desc ? doujinData.desc : '<i>None provided.</i>'}`
        // Likes / Dislikes
        document.querySelector('#display-likes').innerHTML = `${doujinData.likes}`
        document.querySelector('#display-dislikes').innerHTML = `${doujinData.dislikes}`
    }
    catch(e) {
        return showMessage('Parsing error: Failed to load this page due to unexpected value.', 'error', e)
    }
}

function modifyMetatags(doujinData) {
    document.querySelector('title').innerHTML = doujinData.name
    document.querySelector('meta[name="title"]').setAttribute('content', doujinData.name)
    document.querySelector('meta[name="description"]').setAttribute('content', (doujinData.desc ? doujinData.desc.replace(/\\r/g, '\n') : ' '))

    document.querySelector('meta[property="og:title"]').setAttribute('content', doujinData.name)
    document.querySelector('meta[property="og:description"]').setAttribute('content', (doujinData.desc ? doujinData.desc.replace(/\\r/g, '\n') : ' '))
    document.querySelector('meta[property="og:image"]').setAttribute('content', doujinData.cover)

    document.querySelector('meta[property="twitter:title"]').setAttribute('content', doujinData.name)
    document.querySelector('meta[property="twitter:description"]').setAttribute('content', (doujinData.desc ? doujinData.desc.replace(/\\r/g, '\n') : ' '))
    document.querySelector('meta[property="twitter:image"]').setAttribute('content', doujinData.cover)
}

function mainTitleHandler(string) {
    const index = string.lastIndexOf(' - ')
    if(index != -1) return string.substring(0, index)
    else return string
}

function dateString(unixTS){
    const a = new Date(unixTS * 1000)
    const year = a.getFullYear()
    const month = ('0' + (a.getMonth() + 1)).slice(-2)
    const date = ('0' + (a.getDate())).slice(-2)
    const hour = ('0' + a.getHours()).slice(-2)
    const min = ('0' + a.getMinutes()).slice(-2)
    const time = `${date}/${month}/${year} ${hour}:${min}`
    return time
}
