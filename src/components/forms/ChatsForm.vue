<script setup lang="ts">
import { computed, ref } from 'vue'
import Input from '../Input.vue'
import Button from '../Button.vue'

import { useChatStore } from '../../stores/chats'
import Switch from '../Switch.vue'

const chatStore = useChatStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const chatId = ref('')
const send = ref(true)

const loading = ref(false)
const error = ref<string | null>(null)

const isValid = computed(() => {
    return chatId.value.trim().length >= 1
})

const handleSubmit = async () => {
    if (!isValid.value) return

    if (!chatId.value.trim()) return

    loading.value = true
    error.value = null

    try {
        const res = await chatStore.addChat({
            chat_id: chatId.value,
            send: send.value,
        })

        if (!res) {
            return
        }

        chatId.value = ''
        send.value = true

        emit('close')
    } catch (err) {
        error.value = (err as Error).message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="w-full px-4.5 flex flex-col">
        <p
            class="uppercase text-section-header-text p-4 pb-2 text-[0.8125rem] leading-[1rem] tracking-tight"
        >
            New chat for notifications
        </p>

        <div class="w-full flex flex-col gap-3">
            <Input v-model="chatId" placeholder="Chat id" />
            <div class="w-full flex items-center justify-between">
                <p class="py-3 text-[1.0625rem] leading-[1.375rem]">
                    Send notification
                </p>
                <Switch v-model="send" />
            </div>
            <Button
                name="Add"
                :loading="loading"
                @click="handleSubmit"
                :disabled="!isValid"
            />
        </div>
    </div>
</template>
