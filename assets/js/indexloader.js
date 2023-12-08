window.addEventListener('load', async () => {
    const res = await fetch('/api/search?query=Genshin', {
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
    }
    const doujinData = data.data

    const doujinContainer = document.querySelector('div.doujinContainer')
    for (let i = 0; i < doujinData.length; i++) {
        doujinContainer.innerHTML += `
        <div class="doujin">
            <img class="posterImage" src="${doujinData[i].cover}" alt="" onclick="window.location.href = '/doujin${doujinData[i].url}'">
            <a class="title" href="/doujin${doujinData[i].url}">${doujinData[i].title}</a>
        </div>`
    }
})