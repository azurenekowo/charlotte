window.addEventListener('load', async () => {
    const res = await fetch('/api/search?query=Genshin', {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if (!data.success) {
        return showMessage('Search request failed. The API is currently unreachable.', 'error', data.data)
    }
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
