// https://stackoverflow.com/a/175787
function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sQuery = urlParams.get('q')
    let sPage = urlParams.get('page')
    modifyMetatags(sQuery)
    
    if (!sQuery) {
        return showMessage('Empty search query', 'error')
    }

    if (sPage && isNumeric(sPage)) {
        sPage = parseInt(sPage)
    } else {
        sPage = 1
    }

    document.getElementById('searchbox').value = sQuery
    let requestURL = `/api/search?query=${sQuery}&page=${sPage}`
    if(sQuery.startsWith('tag:')) {
        requestURL = `/api/search-tag?query=${sQuery.replace('tag:', '')}&page=${sPage}`
    }
    
    const res = await fetch(requestURL, {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if (!data.success) {
        return showMessage(`Search request failed. The API is currently unreachable.`, 'error', data.data)
    }
    showMessage(`Search results for ${sQuery.startsWith('tag:') ? `<span class="badge text-bg-secondary fw-normal tag"><a class="noformat" href="${window.location.href}">${sQuery.replace('tag:', '')}</a></span>` : '"' + sQuery + '"'}, page ${sPage}/${data.maxpage}`, 'info')

    document.title = `Search: ${sQuery}`

    if(data.data.length == 0) return showMessage(`No results found for "${sQuery}"... Maybe try again?`, 'error', null)
    const doujinData = chunkSearchResults(data.data)
    loadSearchResults(doujinData[0])
})

function modifyMetatags(q) {
    document.querySelector('title').innerHTML = `Charlotte - Search: ${q}`
    document.querySelector('meta[name="title"]').setAttribute('content', `Charlotte - Search: ${q}`)
    document.querySelector('meta[property="og:title"]').setAttribute('content', `Charlotte - Search: ${q}`)
    document.querySelector('meta[property="twitter:title"]').setAttribute('content', `Charlotte - Search: ${q}`)
}

function loadSearchResults(doujinData) {
    const doujinLS = _.chunk(doujinData, 5)
    console.log(doujinLS)
    const doujinContainer = document.querySelector('div.doujinListing')
    doujinContainer.innerHTML = ''
    for (let i = 0; i < doujinLS.length; i++) {
        let htmlCode = `<div class="row text-center">`
        doujinLS[i].forEach(doujin => {
            htmlCode += `<div class="col doujin">
                <div class="thumbnail">
                    <a href="/doujin/${doujin.url}">
                        <img src="${doujin.cover}" alt="thumbnail" style="width: 100%; height: fit-content">
                    </a>
                </div>
                <h5 class="title"><a class="noformat" href="/doujin/${doujin.url}">${doujin.name}</a></h5>
            </div>`
        })
        htmlCode += `</div>\n`
        doujinContainer.innerHTML += htmlCode
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function chunkSearchResults(doujinData) {
    const chunked =  _.chunk(doujinData, 15)
    if(chunked.length > 1) setupPagination(chunked)

    return chunked
}

function setupPagination(doujinData) {
    const pageNav = document.querySelector('#pageNav')
    // pageNav.insertAdjacentHTML('beforeend', '<li class="page-item disabled nav-prev"><a class="page-link">Previous</a></li>')
    for(let i = 1; i < doujinData.length + 1; i++) {
        const pageElement = document.createElement('li')
        pageElement.classList.add('page-item')
        pageElement.innerHTML = `<a class="page-link">${i}</a>`
        pageElement.onclick = () => {
            const pageElementList = Array.from(document.querySelectorAll('#pageNav li'))
            pageElementList.forEach(item => item.classList.remove('active'))
            pageElement.classList.add('active')
            handlePageChange(i - 1, doujinData)
        }
        if(i == 1) pageElement.classList.add('active')
        pageNav.appendChild(pageElement)
    }
    pageNav.classList.remove('d-none')
    // pageNav.insertAdjacentHTML('beforeend', '<li class="page-item nav-next"><a class="page-link">Next</a></li>')
}

function handlePageChange(index, doujinData) {
    loadSearchResults(doujinData[index])
}