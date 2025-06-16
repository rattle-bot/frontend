import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import WebApp from '@twa-dev/sdk'
import { getHashCheckDataString } from './shared/utils/telegram'
import { postAuthTelegram } from './shared/api/user/auth'
import { getAuthToken, setAuthToken } from './shared/utils/cookies'
import { useUserStore } from './stores/user'
import { useLogStore } from './stores/log'
import { useContainerStore } from './stores/container'
import { useChatStore } from './stores/chats'
import Preloader from './components/Preloader.vue'

const preloaderApp = createApp(Preloader)
preloaderApp.mount('#app')

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

const userStore = useUserStore()
const logStore = useLogStore()
const containerStore = useContainerStore()
const chatStore = useChatStore()

const receiveUser = async () => {
    if (!userStore) return

    await userStore.setUser()
}

const tmaWork = async () => {
    const { hash, checkDataString } = getHashCheckDataString(WebApp.initData)

    const result = await postAuthTelegram({
        hash,
        check_data_string: checkDataString,
    })

    if (!result) {
        return
    }

    setAuthToken(result)

    await receiveUser()
}

const initApp = async () => {
    try {
        if (WebApp.initData) {
            WebApp.setHeaderColor('#EFEFF4')
            WebApp.setBackgroundColor('#EFEFF4')
            WebApp.setBottomBarColor('#EFEFF4')
        }

        const { access_token } = getAuthToken()

        if (access_token) {
            await receiveUser()
        } else if (WebApp.initData) {
            await tmaWork()
        }

        await Promise.all([
            logStore.fetchLogs(),
            containerStore.fetchContainers(),
            chatStore.fetchChats(),
            userStore.fetchUsers(),
        ])

        app.mount('#app')
    } catch (error) {
        console.error(error)
        setTimeout(initApp, 5000)
    }
}

initApp()
