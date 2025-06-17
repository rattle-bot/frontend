import WebApp from '@twa-dev/sdk'

export const handleCopy = async (text: any) => {
    if (!text) return

    try {
        try {
            await navigator.clipboard.writeText(text)
        } catch (err) {
            try {
                const textarea = document.createElement('textarea')
                textarea.value = text
                textarea.style.position = 'fixed'
                textarea.style.opacity = '0'
                document.body.appendChild(textarea)
                textarea.focus()
                textarea.select()

                document.execCommand('copy')
                document.body.removeChild(textarea)
            } catch (error) {
                console.error('Copy fallback failed:', error)
            }
        }

        if (WebApp.initData) {
            WebApp.openTelegramLink(
                `https://t.me/share/url?url=${encodeURIComponent(text)}`,
            )
            return true
        }

        if (navigator.share) {
            await navigator.share({ url: text })
        } else {
            window.prompt('Copy to clipboard: Ctrl+C, Enter', text)
        }

        return true
    } catch (error) {
        console.error('Share error:', error)
        return false
    }
}
