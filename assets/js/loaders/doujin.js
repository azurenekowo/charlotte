function dateString(unixTS){
    const a = new Date(unixTS * 1000)
    const year = a.getFullYear()
    const month = a.getMonth()
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const sec = a.getSeconds()
    const time = `${date}/${month}/${year} ${hour}:${min}`
    return time
}

window.addEventListener('load', async () => {
    const doujinIdentifier = window.location.pathname.replace('/doujin/', '')
    console.log(doujinIdentifier)
    const dialog = document.getElementById('messageDialog')
    const res = await fetch(`/api/getDoujin?link=${doujinIdentifier}`, {
        headers: {
        },
        method: 'GET'
    })
    const data = await res.json()
    if(!data.success) {
        dialog.classList.remove('alert-dark')
        dialog.classList.add('alert-danger')
        dialog.innerHTML = 'An error has occurred with the backend API.'
        console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:\n',)
        console.log(data.data)
        return
    }
    dialog.classList.add('charlotte-hidden')
    document.querySelector('div.doujin-info').classList.remove('charlotte-hidden')

    const doujinData = data.data  
    // Titles
    document.querySelector('#title-main').innerHTML = mainTitleHandler(doujinData.name)
    document.querySelector('.bc-mainTitle').innerHTML = mainTitleHandler(doujinData.name)
    doujinData.other_names != null ? document.querySelector('#title-alt').innerHTML = doujinData.other_names.join(', ') : document.querySelector('#title-alt').classList.add('charlotte-hidden')
    // Cover art
    document.querySelector('img.display-coverart').src = doujinData.cover
    // Characters Tag
    document.querySelector('.characters').innerHTML += `${doujinData.characters.map(tag => `<span class="badge text-bg-secondary fw-normal tag">${tag}</span>`).join('\n')}`
    // Categories Tag
    document.querySelector('.categories').innerHTML += `${doujinData.tags.map(tag => `<span class="badge text-bg-secondary fw-normal tag"><a class="noformat" href="${tag.link.replace('the-loai-', '/category/')}">${tag.name}</a></span>`).join('\n')}`
    if(doujinData.doujinshi) document.querySelector('.categories').innerHTML += `\n<span class="badge text-bg-info fw-normal tag">${doujinData.doujinshi}</span>`
    // Translation Info
    document.querySelector('#display-transGroup').innerHTML = `Translator: <a class="noformat" href="${doujinData.translators[0].url.replace('g/', '/translators-group/')}">${doujinData.translators[0].text}</a>`
    document.querySelector('#display-uploader').innerHTML = `Uploader: ${doujinData.uploader}`
    // Author
    document.querySelector('#display-author').innerHTML = `${doujinData.authors.join(', ')}`
    // Status + LU
    document.querySelector('#display-status').innerHTML = `${doujinData.status == 'Đã hoàn thành' ? '<i class="fa-solid fa-check" style="color: #198754;"></i>&nbsp;Completed' : '<i class="fa-solid fa-chart-line"></i>&nbsp;Work In Progress'}`
    document.querySelector('#display-LUStatus').innerHTML = `${dateString(doujinData.last_updated)}`
    // Description
    console.log(doujinData.desc)
    document.querySelector('#display-desc').innerHTML = `${doujinData.desc}`
    // Likes / Dislikes
    document.querySelector('#display-likes').innerHTML = `${doujinData.likes}`
    document.querySelector('#display-dislikes').innerHTML = `${doujinData.dislikes}`
    // Read button
    document.querySelector('.btn-readnow').addEventListener('click', () => {
        window.location = `/read/${doujinIdentifier}`
    })

})

function mainTitleHandler(string) {
    const index = string.lastIndexOf(' - ')
    if(index != -1) return string.substring(0, index)
    else return string
}

function dateString(unixTS){
    const a = new Date(unixTS * 1000)
    const year = a.getFullYear()
    const month = ('0' + (a.getMonth() + 1)).slice(-2)
    const date = ('0' + (a.getDate())).slice(-2)
    const hour = ('0' + a.getHours()).slice(-2)
    const min = ('0' + a.getMinutes()).slice(-2)
    const time = `${date}/${month}/${year} ${hour}:${min}`
    return time
}
