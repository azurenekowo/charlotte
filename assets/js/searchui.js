window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sQuery = urlParams.get('q')
    const res = await fetch(`/api/search?query=${sQuery}`, {
        headers: {
        },
        method: 'POST'
    })
    const data = await res.json()
    if(!data.success) {
        const errorDialog = document.getElementById('alertDialog')
        errorDialog.classList.add('alert-danger')
        errorDialog.innerHTML = 'An error occured with the backend API.'
        errorDialog.classList.remove('charlotte-hidden')
        return
    }
    const dialog = document.getElementById('alertDialog')
    dialog.classList.add('alert-secondary')
    dialog.innerHTML = `Search results for <code>${sQuery}</code>`
    dialog.classList.remove('charlotte-hidden')

    const doujinData = data.data
    const doujinContainer = document.querySelector('div.doujinContainer')
    for (let i = 0; i < doujinData.length; i++) {
        doujinContainer.innerHTML += `
        <div class="doujin">
            <img class="posterImage" src="${doujinData[i].cover}" alt="">
            <a class="title" href="/read/">${doujinData[i].title}</a>
        </div>`
    }
})