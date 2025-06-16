<script setup lang="ts">
import { ref } from 'vue'
import Tabs from './components/Tabs.vue'
import LogsView from './views/LogsView.vue'
import ContainersView from './views/ContainersView.vue'
import ChatsView from './views/ChatsView.vue'
import UsersView from './views/UsersView.vue'

const currentTab = ref('logs')
const tabList = [
    { name: 'logs', label: 'Logs' },
    { name: 'containers', label: 'Containers' },
    { name: 'chats', label: 'Chats' },
    { name: 'users', label: 'Users' },
]
</script>

<template>
    <div class="app-container flex-grow flex flex-col w-full h-full relative">
        <Tabs v-model="currentTab" :tabs="tabList" />

        <div class="flex-grow w-full flex flex-col gap-5">
            <LogsView v-if="currentTab === 'logs'" />
            <ContainersView v-else-if="currentTab === 'containers'" />
            <ChatsView v-else-if="currentTab === 'chats'" />
            <UsersView v-else-if="currentTab === 'users'" />
        </div>
    </div>
</template>
