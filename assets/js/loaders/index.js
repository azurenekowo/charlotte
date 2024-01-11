window.addEventListener('load', async () => {
    const res = await fetch('/api/homepage', {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if (!data.success) {
        return showMessage('The API is currently unreachable.', 'error', data.data)
    }
    const doujinData = data.data
    const trending = doujinData.trending.slice(0, 5)
    const recent = doujinData.recent

    const doujinLSRecent = _.chunk(recent, 5)

    const doujinContainerTrending = document.querySelector('div#--trending') 
    let htmlCodeRecent = `<div class="row text-center">`
    trending.forEach(doujin => {
        htmlCodeRecent += `<div class="col doujin">
            <div class="thumbnail">
                <a href="/doujin/${doujin.url}">
                    <img src="${doujin.cover}" alt="thumbnail" style="width: 100%; height: fit-content">
                </a>
            </div>
            <h5 class="title"><a class="noformat" href="/doujin/${doujin.url}">${doujin.name}</a></h5>
        </div>`
    })
    htmlCodeRecent += `</div>\n`
    doujinContainerTrending.innerHTML += htmlCodeRecent

    const doujinContainerRecent = document.querySelector('div#--recent')
    for (let i = 0; i < doujinLSRecent.length; i++) {
        let htmlCode = `<div class="row text-center">`
        doujinLSRecent[i].forEach(doujin => {
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
        doujinContainerRecent.innerHTML += htmlCode
    }

    doujinContainerTrending.classList.remove('d-none')
    doujinContainerRecent.classList.remove('d-none')
})
