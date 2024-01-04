window.addEventListener('load', async () => {
    const dialog = document.getElementById('messageDialog')
    dialog.innerHTML = 'Loading, please wait for a moment...'
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    const res = await fetch('/api/status', {
        headers: {
        },
        method: 'GET'
    })
    const data = await res.json()
    const status = data.data

    dialog.classList.remove('alert-dark')
    dialog.classList.remove('text-center')
    dialog.classList.add('alert-success')
    dialog.innerHTML = `Server is up!<br><br>
    <p class="align-self-start text-left">
    Uptime: <code>${convertSeconds(status.uptime)}</code><br>
    Machine: <code>${status.server.machine} / ${status.server.user}</code><br>
    Instance ID: <code>${status.instance.id}</code>
    </p>`
    return
})

function convertSeconds(seconds) {
    const days = Math.floor(seconds / 86400)
    let remainder = seconds % 86400
    const hours = Math.floor(remainder / 3600)
    remainder %= 3600
    const minutes = Math.floor(remainder / 60)
    const remainingSeconds = Math.round(remainder % 60)

    let timeString = ''
    if (days > 0) {
        timeString += `${days} day${days > 1 ? 's' : ''}, `
    }
    if (hours > 0) {
        timeString += `${hours} hour${hours > 1 ? 's' : ''}, `
    }
    if (minutes > 0) {
        timeString += `${minutes} minute${minutes > 1 ? 's' : ''}, `
    }
    timeString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`

    return timeString
}