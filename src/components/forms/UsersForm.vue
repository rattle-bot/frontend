<script setup lang="ts">
import { computed, ref } from 'vue'
import Input from '../Input.vue'
import Select from '../Select.vue'
import Button from '../Button.vue'
import { useUserStore } from '../../stores/user'
import type { Role } from '../../shared/api/types/user'

const userStore = useUserStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const telegramId = ref('')
const role = ref<Role | null>(null)

const roleOptions = [
    { name: 'admin', label: 'Admin' },
    { name: 'user', label: 'User' },
]

const loading = ref(false)
const error = ref<string | null>(null)

const isValid = computed(() => {
    return telegramId.value.trim().length >= 1 && role.value !== null
})

const handleSubmit = async () => {
    if (!isValid.value) return

    if (!role.value || !telegramId.value.trim()) return

    loading.value = true
    error.value = null

    try {
        const res = await userStore.addUser({
            telegram_id: telegramId.value.trim(),
            role: role.value,
        })

        if (!res) {
            return
        }

        telegramId.value = ''
        role.value = null

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
            New user
        </p>

        <div class="w-full flex flex-col gap-3">
            <Input v-model="telegramId" placeholder="Telegram id" />
            <Select v-model="role" :options="roleOptions" placeholder="Role" />
            <Button
                name="Add"
                :loading="loading"
                @click="handleSubmit"
                :disabled="!isValid"
            />
        </div>
    </div>
</template>
