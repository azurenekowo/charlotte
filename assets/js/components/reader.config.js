window.addEventListener('load', async () => {
    let progressbarToggled = true
    let pageFitMode = 'height'

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

    document.querySelector('#pagefitToggle').addEventListener('click', () => {
        if(pageFitMode == 'height') {
            pageFitMode = 'none'
            document.querySelector('#pagefitToggle').innerHTML = `<i class="fa-solid fa-arrows-left-right"></i> Page fit: None`
            document.querySelector('.display-page .image').classList.remove('h-100')
            document.querySelector('.display-page .image').classList.add('overflow-y-auto')
        }
        else {
            pageFitMode = 'height'
            document.querySelector('#pagefitToggle').innerHTML = `<i class="fa-solid fa-arrows-left-right"></i> Page fit: Height`
            document.querySelector('.display-page .image').classList.add('h-100')
            document.querySelector('.display-page .image').classList.remove('overflow-y-auto')
        }
    })
})