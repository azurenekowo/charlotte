const urlCreator = window.URL || window.webkitURL

let currentPage = 0
let pageCount = 0
let percentage = (currentPage / pageCount) * 100
let imagesList = []

window.addEventListener('load', async () => {
    const chapterQuery = window.location.pathname.replace('/read/', '')
   
    const res = await fetch(`/api/chapter/imagesList?url=${chapterQuery}`)
    const data = await res.json()
    if(!data.success) {
        const dialog = document.getElementById('messageDialog')
        dialog.classList.add('alert-danger')
        dialog.innerHTML = 'An error has occurred with the backend API.'
        console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:\n',)
        console.log(data.data)
        return
    }
    imagesList = data.data
    pageCount = imagesList.length
    for(let i = 1; i < pageCount + 1; i++) {
        const pageListItem = document.createElement('li')
        pageListItem.innerHTML = `<button class="btn btn-sm dropdown-item">${i}</button>`
        pageListItem.addEventListener('click', async () => { await setPage(i) })
        document.querySelector('ul.page-select-list').appendChild(pageListItem)
    }

    document.querySelector('.navbar').classList.add('charlotte-hidden')
    document.querySelector('#messageDialog').classList.add('charlotte-hidden')

    document.querySelector('.doujin-reader').classList.remove('d-none')
    await setPage(1)
    registerKeyNav()
})

async function setPage(pageNumber) {
    currentPage = pageNumber
    percentage = (currentPage / pageCount) * 100

    const response = await fetch('/api/chapter/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: imagesList[pageNumber - 1] })
    })
    const data = await response.blob()
    document.querySelector('.display-page img').src = urlCreator.createObjectURL(data)

    document.querySelector('.pageSelect').innerHTML = `<i class="fa-regular fa-file"></i> Page: ${currentPage}/${pageCount}`
    document.querySelectorAll('.page-select-list li button')
    const pageSelectorList = Array.from(document.querySelectorAll('.page-select-list li button'))
    pageSelectorList.forEach(item => item.classList.remove('active'))
    pageSelectorList[currentPage - 1].classList.add('active')
    document.querySelector('.read-progress').setAttribute('aria-valuenow', percentage)
    document.querySelector('.read-progress .bar').style.width = `${percentage}%`
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

