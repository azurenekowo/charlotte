window.addEventListener('load', async () => {
    let progressbarToggled = true

    document.querySelector('#progressToggle').addEventListener('click', () => {
        progressbarToggled = !progressbarToggled
        if(progressbarToggled == false) {
            document.querySelector('.read-progress').classList.add('d-none')
            document.querySelector('#progressToggle').innerHTML = '<i class="fa-solid fa-percent"></i> Progress: Hidden'
        }
        else {
            document.querySelector('.read-progress').classList.remove('d-none')
            document.querySelector('#progressToggle').innerHTML = '<i class="fa-solid fa-percent"></i> Progress: Show'
        }
    })
})