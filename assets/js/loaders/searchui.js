window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sQuery = urlParams.get('q')

    if (!sQuery) {
        const dialog = document.getElementById('messageDialog')
        dialog.classList.remove('alert-dark')
        dialog.classList.add('alert-danger')
        dialog.innerHTML = `Empty search query.`
        dialog.classList.remove('charlotte-hidden')
        return
    }
    document.getElementById('searchbox').value = sQuery
    const res = await fetch(`/api/search?query=${sQuery}`, {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if (!data.success) {
        const dialog = document.getElementById('messageDialog')
        dialog.classList.add('alert-danger')
        dialog.innerHTML = 'An error has occurred with the backend API.'
        dialog.classList.remove('charlotte-hidden')
        console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:\n',)
        console.log(data.data)
        return
    }
    const dialog = document.getElementById('messageDialog')
    dialog.classList.add('alert-ifno')
    dialog.innerHTML = `Search results for <code>${sQuery}</code>`

    document.title = `Search: ${sQuery}`

    const doujinData = data.data
    const doujinLS = _.chunk(doujinData, 5)
    const doujinContainer = document.querySelector('div.doujinListing')
    for (let i = 0; i < doujinLS.length; i++) {
        let htmlCode = `<div class="row text-center">`
        doujinLS[i].forEach(doujin => {
            htmlCode +=
                `<div class="doujin">
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