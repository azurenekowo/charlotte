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
    const errorDialog = document.getElementById('alertDialog')
    const res = await fetch(`/api/getDoujin?link=${doujinIdentifier}`, {
        headers: {
        },
        method: 'GET'
    })
    const data = await res.json()
    if(!data.success) {
        errorDialog.classList.remove('alert-secondary')
        errorDialog.classList.add('alert-danger')
        errorDialog.innerHTML = 'An error has occurred with the backend API.'
        console.log('%c[Charlotte]', 'color: #ae81ff', 'Backend API error. Detailed tracelog:\n',)
        console.log(`%c${data.data}`, 'color: #ff474c')
        return
    }
    const doujinData = data.data  
    errorDialog.classList.add('charlotte-hidden')
    
    document.querySelector('.metainf .title .main').innerHTML = doujinData.name
    document.querySelector('.metainf .title .alt').innerHTML = `${(doujinData.other_names ? doujinData.other_names.map(n => n.text).join(', ') : '')}`
    document.querySelector('.metainf .chars .taglist').innerHTML = `${doujinData.characters.map(tag => `<span class="tag"><a class="noformat" href="${tag.url.replace('=', '/')}">${tag.text}</a></span>`).join('\n')}`
    document.querySelector('.metainf .categories .taglist').innerHTML = `${doujinData.tags.map(tag => `<span class="tag"><a class="noformat" href="${tag.link.replace('the-loai-', 'category/')}">${tag.name}</a></span>`).join('\n')}`
    document.querySelector('.metainf .translation-author .authorname').innerHTML = `<a class="noformat" href="${doujinData.authors[0].url.replace('tacgia=', 'author/')}">${doujinData.authors[0].text}</a>`
    document.querySelector('.metainf .translation-author .translatorname').innerHTML = `<a class="noformat" href="${doujinData.translators[0].url.replace('g/', 'group/')}">${doujinData.translators[0].text}</a>`
    document.querySelector('.metainf .status .updateStatus').innerHTML = `${(doujinData.status.text == 'Đã hoàn thành' ? '<i class="fa-solid fa-check" style="color: #26a269;"></i>&nbsp;Completed' : '<i class="fa-solid fa-ellipsis" style="color: #fff"></i></i>&nbsp;Ongoing')}`
    document.querySelector('.metainf .status .LUStatus').innerHTML = `${dateString(doujinData.last_updated)}`
    document.querySelector('.metainf .desc p').innerHTML = `${doujinData.desc ? doujinData.desc : '<i class="muted">None provided.</i>'}`
    document.querySelector('.posterdiv .poster').src = doujinData.cover
    document.querySelector('.displayRatings .likes').innerHTML = `<i class="fa-solid fa-heart" style="color: #ed333b;"></i>&emsp;${doujinData.likes}`
    document.querySelector('.displayRatings .dislikes').innerHTML = `<i class="fa-solid fa-thumbs-down" style="color: #1c71d8;"></i>&emsp;${doujinData.dislikes}`
})