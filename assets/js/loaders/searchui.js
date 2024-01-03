window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sQuery = urlParams.get('q')
    document.getElementById('searchbox').value = sQuery
    const res = await fetch(`/api/search?query=${sQuery}`, {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if(!data.success) {
        const errorDialog = document.getElementById('messageDialog')
        errorDialog.classList.add('alert-danger')
        errorDialog.innerHTML = 'An error has occurred with the backend API.'
        errorDialog.classList.remove('charlotte-hidden')
        console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:\n',)
        console.log(`%c${data.data}`, 'color: #ff474c')
        return
    }
    const dialog = document.getElementById('messageDialog')
    dialog.classList.add('alert-ifno')
    dialog.innerHTML = `Search results for <code>${sQuery}</code>`
    dialog.classList.remove('charlotte-hidden')

    const doujinData = data.data
    const doujinContainer = document.querySelector('div.doujinContainer')
    for (let i = 0; i < doujinData.length; i++) {
        doujinContainer.innerHTML += `
        <div class="doujin">
            <img class="posterImage" onclick="window.location.href='/doujin/${doujinData[i].url}'" src="${doujinData[i].cover.url}" alt="">
            <a class="title" href="/doujin/${doujinData[i].url}">${doujinData[i].name}</a>
        </div>`
    }
})