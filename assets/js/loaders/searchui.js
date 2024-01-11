window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sQuery = urlParams.get('q')
    modifyMetatags(sQuery)
    
    if (!sQuery) {
        return showMessage('Empty search query', 'error')
    }
    document.getElementById('searchbox').value = sQuery
    const res = await fetch(`/api/search?query=${sQuery}`, {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if (!data.success) {
        return showMessage(`Search request failed. The API is currently unreachable.`, 'error', data.data)
    }
    showMessage(`Search results for ${sQuery}`, 'info')

    document.title = `Search: ${sQuery}`

    const doujinData = data.data
    const doujinLS = _.chunk(doujinData, 5)
    const doujinContainer = document.querySelector('div.doujinListing')
    for (let i = 0; i < doujinLS.length; i++) {
        let htmlCode = `<div class="row text-center">`
        doujinLS[i].forEach(doujin => {
            htmlCode +=
                `<div class="col doujin">
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

})

function modifyMetatags(q) {
    document.querySelector('title').innerHTML = `Charlotte - Search: ${q}`
    document.querySelector('meta[name="title"]').setAttribute('content', `Charlotte - Search: ${q}`)
    document.querySelector('meta[property="og:title"]').setAttribute('content', `Charlotte - Search: ${q}`)
    document.querySelector('meta[property="twitter:title"]').setAttribute('content', `Charlotte - Search: ${q}`)
}