window.addEventListener('load', async () => {
    let progressbarToggled = true
    let pageFitMode = 'height'

    document.querySelector('#progressToggle').addEventListener('click', () => {
        progressbarToggled = !progressbarToggled
        let readProgress = document.querySelector('.read-progress')
        let progressToggle = document.querySelector('#progressToggle')
        let boil = '<i class="fa-solid fa-percent"></i> Progress: '
        if(progressbarToggled) {
            readProgress.classList.remove('d-none')
            progressToggle.innerHTML = `${boil}Shown`
        }
        else {
            readProgress.classList.add('d-none')
            progressToggle.innerHTML = `${boil}Hidden`
        }
    })

    document.querySelector('#pagefitToggle').addEventListener('click', () => {
        let pageFitToggle = document.querySelector('#pagefitToggle')
        let displayImage =  document.querySelector('.display-page .image')
        let boil = '<i class="fa-solid fa-arrows-left-right"></i> Image fit: '
        
        if(pageFitMode == 'height') {
            pageFitMode = 'none'
            pageFitToggle.innerHTML = `${boil}None`
            displayImage.classList.remove('h-100')
            displayImage.classList.add('overflow-y-auto')
        }
        else {
            pageFitMode = 'height'
            pageFitToggle.innerHTML = `${boil}Height`
            displayImage.classList.add('h-100')
            displayImage.classList.remove('overflow-y-auto')
        }
    })
})
