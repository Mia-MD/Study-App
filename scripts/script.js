const quitButton = document.getElementById('quit-btn')

if (quitButton) {
    quitButton.addEventListener('click', () => {
        if (window.electronAPI?.quitApp) {
            window.electronAPI.quitApp()
            return
        }

        window.close()
    })
}