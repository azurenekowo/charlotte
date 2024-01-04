function searchDoujin() {
    const searchQuery = document.getElementById('searchbox').value
    if (searchQuery.match(/[^\p{L}\w\s\.\(\)\[\]!~]/gmui)) {
        const dialog = document.getElementById('messageDialog')
        dialog.classList.add('alert-danger')
        dialog.innerHTML = `Invalid search query. Please try a different one.`
        dialog.classList.remove('charlotte-hidden')
        return
    }
    window.location.href = `/search?q=${searchQuery}`
}

window.addEventListener('load', () => {
    document.getElementById('searchbox').addEventListener('keyup', (e) => {
        if(e.key == 'Enter') document.getElementById('searchbtn').click()
    })
})