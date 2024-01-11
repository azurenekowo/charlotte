/**
 * @description Controls the message dialog
 * 
 * @param {string} displayText InnerHTML for the message dialog
 * @param {*} type Either pass in ERROR or INFO
 * @param {any} error The actual error log in console, if there is any passed
 */

function showMessage(displayText, type, error) {
    const dialog = document.getElementById('messageDialog')
    dialogVisibility(true)
    if(type == 'error') {
        dialog.innerHTML = `<img src="/public/img/qiqi.png" class="img-fluid" style="width: 120px;">
        <h4 class="mt-1">An error has occurred!</h4>
        <div class="details mt-3 mb-3">
            <span class="text-muted error--details">${displayText}</span>
        </div>`
        console.log('%c[Charlotte]', 'color: #ae81ff', `${displayText}\nDetailed tracelog:`)
        console.log(error)
    }
    else {
        dialog.innerHTML = displayText
    }
}

/**
 * @description Control the message dialog visibility
 * @param {boolean} status false means hidden
 * 
 */
function dialogVisibility(status) {
    const dialog = document.getElementById('messageDialog')
    if(!status) {
        if(dialog.classList.contains('charlotte-hidden')) return
        dialog.innerHTML = '<code>{{dialog--content}}</code>'
        dialog.classList.add('charlotte-hidden')
    }
    else {
        if(!dialog.classList.contains('charlotte-hidden')) return
        dialog.classList.remove('charlotte-hidden')
    }
}