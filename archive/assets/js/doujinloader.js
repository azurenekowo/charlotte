window.addEventListener('load', async () => {
    const doujinIdentifier = window.location.pathname.replace('/doujin/', '')
    const res = await fetch(`/api/getDoujin?link=${doujinIdentifier}`, {
        headers: {
        },
        method: 'GET'
    })
    const data = await res.json()
    if(!data.success) {
        return showError()
    }
    const doujinData = data.data  
})

function showError() {
    const errorDialog = document.getElementById('alertDialog')
    errorDialog.classList.add('alert-danger')
    errorDialog.innerHTML = 'An error occured with the backend API.'
    errorDialog.classList.remove('charlotte-hidden')
}