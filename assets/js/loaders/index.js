window.addEventListener('load', async () => {
    const res = await fetch('/api/search?query=Genshin', {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if (!data.success) {
        const errorDialog = document.getElementById('messageDialog')
        errorDialog.classList.add('alert-danger')
        errorDialog.innerHTML = 'An error has occurred with the backend API.'
        errorDialog.classList.remove('charlotte-hidden')
        console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:')
        console.log(data.data)
        return
    }
    const doujinData = data.data
    const doujinLS = _.chunk(doujinData, 5)
    console.log(doujinLS)

    const doujinContainer = document.querySelector('div.doujinListing')
    for (let i = 0; i < doujinLS.length; i++) {
        let htmlCode = `<div class="row text-center">`
        doujinLS[i].forEach(doujin => {
            console.log(doujin)
            htmlCode += 
            `<div class="col doujin">
                <div class="thumbnail">
                    <a href="/doujin/${doujin.url}">
                        <img src="${doujin.cover}" alt="Lights" style="width: 100%; height: fit-content">
                    </a>
                </div>
                <h5 class="title"><a class="noformat" href="/doujin/${doujin.url}">${doujin.name}</a></h5>
            </div>`
        })
        htmlCode += `</div>\n`
        console.log(htmlCode)
        doujinContainer.innerHTML += htmlCode
    }
})
