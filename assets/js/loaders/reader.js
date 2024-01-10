const urlCreator = window.URL || window.webkitURL

let currentPage = 0
let pageCount = 0
let percentage = (currentPage / pageCount) * 100
let imagesList = []
let autoScrollEnabled = false
let autoScrollInterval = 5
let autoScrollDaemon = null

let chapterQuery

window.addEventListener('load', async () => {
    chapterQuery = window.location.pathname.replace('/read/', '')
    const doujinIdentifier = new URLSearchParams(window.location.search).get('f')
   
    let doujinData, chapterData

    try {    
        doujinData = await fetch(`/api/doujin/info?link=${doujinIdentifier}`)
        doujinData = await doujinData.json()
        if(!doujinData.success) {
            return showMessage('Backend API error: Failed to load doujin info.', 'error', doujinData.data)
        }
        doujinData = doujinData.data
	
        chapterData = await fetch(`/api/doujin/chaptersList?url=${doujinIdentifier}`)
        chapterData = await chapterData.json()
        if(!chapterData.success) {
            return showMessage('Backend API error: Failed to load chapter list.', 'error', chapterData.data)
        }
        chapterData = chapterData.data.reverse()
    }
    catch(e) {
        return showMessage('Loading doujin information failed. The API is currently unreachable.', 'error', e)
    }
    const doujinName = doujinData.name
    const currentChapter = chapterData.find(c => c.url == chapterQuery)

    const res = await fetch(`/api/chapter/imagesList?url=${chapterQuery}`)
    const data = await res.json()
    if(!data.success) {
        return showMessage('Backend API error: Failed to load chapter\'s images.', 'error', data.data)
    }
    imagesList = data.data
    pageCount = imagesList.length
    for(let i = 1; i < pageCount + 1; i++) {
        const pageListItem = document.createElement('li')
        pageListItem.innerHTML = `<button class="btn btn-sm dropdown-item">${i}</button>`
        pageListItem.addEventListener('click', async () => { await setPage(i) })
        document.querySelector('ul.page-select-list').appendChild(pageListItem)
    }
    document.querySelector('.title-display a').href = `/doujin/${doujinIdentifier}`
    document.querySelector('.title-display a').innerHTML = `${doujinName}`
    document.querySelector('.chapter-display').innerHTML = `Chapter ${chapterData.indexOf(currentChapter) + 1}: ${currentChapter.title}`
    
    document.querySelector('.navbar').classList.add('charlotte-hidden')
    document.querySelector('#messageDialog').classList.add('charlotte-hidden')

    document.querySelector('img.loadingPlaceholder').classList.remove('loadingPlaceholder')
    document.querySelector('.doujin-reader').classList.remove('d-none')
    document.title = `Reading: ${doujinName}`
    modifyMetatags(doujinData, doujinIdentifier)
    window.history.replaceState(null, '', window.location.pathname)
    
    await setPage(1)
    registerKeyNav()
    registerTouchEvt()
    registerPageControlButtons()
    configureAutoscroll()
})

function modifyMetatags(doujinData, doujinIdentifier) {
    document.querySelector('title').innerHTML = `Reading: ${doujinData.name}`
    document.querySelector('meta[name="title"]').setAttribute('content', `Reading: ${doujinData.name}`)
    document.querySelector('meta[name="description"]').setAttribute('content', (doujinData.desc ? doujinData.desc.replace(/\\r/g, '\n') : ' '))

    document.querySelector('meta[property="og:title"]').setAttribute('content', `Reading: ${doujinData.name}`)
    document.querySelector('meta[property="og:description"]').setAttribute('content', (doujinData.desc ? doujinData.desc.replace(/\\r/g, '\n') : ' '))
    document.querySelector('meta[property="og:image"]').setAttribute('content', doujinData.cover)

    document.querySelector('meta[property="twitter:title"]').setAttribute('content', `Reading: ${doujinData.name}`)
    document.querySelector('meta[property="twitter:description"]').setAttribute('content', (doujinData.desc ? doujinData.desc.replace(/\\r/g, '\n') : ' '))
    document.querySelector('meta[property="twitter:image"]').setAttribute('content', doujinData.cover)
}

async function setPage(pageNumber) {
    currentPage = pageNumber
    percentage = (currentPage / pageCount) * 100

    const response = await fetch('/api/chapter/getImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: imagesList[pageNumber - 1], chapter: chapterQuery })
    })
    const data = await response.blob()
    document.querySelector('.display-page img').src = urlCreator.createObjectURL(data)

    document.querySelector('.pageSelect').innerHTML = `<i class="fa-regular fa-file"></i> Page: ${currentPage}/${pageCount}`
    document.querySelector('.pageSelectInput').innerHTML = `${currentPage}/${pageCount}`
    document.querySelectorAll('.page-select-list li button')
    const pageSelectorList = Array.from(document.querySelectorAll('.page-select-list li button'))
    pageSelectorList.forEach(item => item.classList.remove('active'))
    pageSelectorList[currentPage - 1].classList.add('active')
    document.querySelector('.read-progress').setAttribute('aria-valuenow', percentage)
    document.querySelector('.read-progress .bar').style.width = `${percentage}%`

    if(currentPage == 1) document.querySelector('.pageControl .prev').setAttribute('disabled', '')
    else if(currentPage == pageCount) document.querySelector('.pageControl .next').setAttribute('disabled', '')
    else {
        document.querySelector('.pageControl .prev').removeAttribute('disabled')
        document.querySelector('.pageControl .next').removeAttribute('disabled')
    }
}

function registerKeyNav() {
    window.addEventListener('keyup', async e => {
        if(e.key == 'ArrowLeft') {
            if(currentPage == 1) return
            else return await setPage(currentPage - 1)
        }
        else if(e.key == 'ArrowRight') {
            if(currentPage == pageCount) return
            else return await setPage(currentPage + 1)
        }
    })
}

function registerTouchEvt() {
    const displayImagePage = document.querySelector('.display-page .image img')
    // console.log(displayImagePage)
    const touchHandler = new Hammer(displayImagePage)
    touchHandler.on('tap', (e) => {
        // alert(JSON.stringify(e, null, 4))
        const deltaX = e.center.x
        const deltaPerc = Math.round((deltaX / displayImagePage.width) * 100)
        if(deltaPerc > 50) {
            setPage(currentPage + 1)
            // alert(`Tap evt fired - Scroll RIGHT\nX ${deltaX} (${deltaPerc}% imageWidth)`)
        }
        else if(deltaPerc < 50) {
            setPage(currentPage - 1)
            // alert(`Tap evt fired - Scroll LEFT\nX ${deltaX} (${deltaPerc}% imageWidth)`)
        }
    })
}

function registerPageControlButtons() {
    document.querySelector('.pageControl .prev').addEventListener('click', async () => {
        if(currentPage == 1) return
        else return await setPage(currentPage - 1)
    })
    document.querySelector('.pageControl .next').addEventListener('click', async () => {
        if(currentPage == pageCount) return
        else return await setPage(currentPage + 1)
    })

    document.querySelector('.pageControl .pageSelectInput').addEventListener('click', async () => {
        const pageNum = prompt(`Enter a page number (1-${pageCount})...`)
        if(!pageNum || isNaN(pageNum) || pageNum < 0 || pageNum > pageCount) return alert('Not a valid page number, please try again.')
        await setPage(parseInt(pageNum))
    })
}

function configureAutoscroll() {
    document.querySelector('.toggleAutoscroll').addEventListener('click', () => {
        autoScrollEnabled = !autoScrollEnabled
        if(autoScrollEnabled == true) {
            document.querySelector('.toggleAutoscroll').innerHTML = '<i class="fa-solid fa-bars-staggered"></i> Autoscroll: Enabled'
            document.querySelector('.asInterval-input').classList.remove('d-none')
            autoScrollInterval = document.querySelector('.asInterval-input').value
            // Note: The delay modification exists due to the image loading lag.
            // For now, it loops faster than the user's value for 2 seconds.
            if(autoScrollInterval > 3) autoScrollInterval = autoScrollInterval - 2

            autoScrollDaemon = setInterval(async () => {
                if(currentPage == pageCount) return disableAutoscroll()
                await setPage(currentPage + 1)
            }, autoScrollInterval * 1000)
        }
        else {
            return disableAutoscroll()
        }
    })
    document.querySelector('.asInterval-input').addEventListener('input', () => {
        if(document.querySelector('.asInterval-input').value == null) return
        autoScrollInterval = document.querySelector('.asInterval-input').value
    })
}

function disableAutoscroll() {
    document.querySelector('.toggleAutoscroll').innerHTML = '<i class="fa-solid fa-bars-staggered"></i> Autoscroll: Disabled'
    document.querySelector('.asInterval-input').classList.add('d-none')
     
    if(autoScrollDaemon != null) {
        clearInterval(autoScrollDaemon)
        autoScrollDaemon = null
    }
    return
}

function showError(e, reason) {
    const dialog = document.getElementById('messageDialog')
    dialog.classList.remove('alert-dark')
    dialog.classList.add('alert-danger')
    dialog.innerHTML = `An error has occurred${reason}.`
    console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:\n',)
    console.log(e)
}