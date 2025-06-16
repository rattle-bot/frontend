<script setup lang="ts">
import { storeToRefs } from 'pinia'
import About from '../components/About.vue'
import AddNew from '../components/AddNew.vue'
import SwipeItem from '../components/SwipeItem.vue'
import Divider from '../components/Divider.vue'
import { useChatStore } from '../stores/chats'
import Switch from '../components/Switch.vue'
import type { Chat } from '../shared/api/types/chat'

const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)

const deleteChat = async (id: number) => {
    await chatStore.deleteChat(id)
}

const handleToggleSend = async (chat: Chat, newValue: boolean) => {
    if (chatStore.updatingMap[chat.ID]) return

    const previous = chat.send
    chat.send = newValue

    const updated = await chatStore.updateChat(chat.ID, { send: newValue })

    if (!updated) {
        chat.send = previous
    }
}
</script>

<template>
    <AddNew name="chats" />

    <div class="px-[1.125rem]">
        <div class="flex flex-col items-end bg-bg rounded-xl overflow-hidden">
            <template v-for="(chat, index) in chats" :key="chat.ID">
                <SwipeItem :id="chat.ID" :onDelete="deleteChat">
                    <div class="w-full flex items-center px-4 gap-4">
                        <div
                            class="overflow-hidden flex-1 flex flex-col py-3 gap-0.5"
                        >
                            <p
                                class="text-[1.0625rem] leading-[1.375rem] text-text tracking-tight truncate"
                            >
                                {{ chat.chat_id }}
                            </p>
                        </div>

                        <Switch
                            v-model="chat.send"
                            @update:modelValue="
                                (value) => handleToggleSend(chat, value)
                            "
                        />
                    </div>
                </SwipeItem>

                <Divider
                    v-if="index < chats.length - 1"
                    class="w-[calc(100%-5rem)]"
                />
            </template>
        </div>
    </div>

    <About />
</template>
