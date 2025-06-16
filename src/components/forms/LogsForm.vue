<script setup lang="ts">
import { computed, ref } from 'vue'
import Input from '../Input.vue'
import Select from '../Select.vue'
import Button from '../Button.vue'
import type { EventType, MatchType } from '../../shared/api/types/log'
import { createLog } from '../../shared/api/log'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const pattern = ref('')
const matchType = ref<MatchType | null>(null)
const eventType = ref<EventType | null>(null)

const eventOptions = [
    { name: 'error', label: 'Error' },
    { name: 'info', label: 'Info' },
    { name: 'warning', label: 'Warning' },
    { name: 'success', label: 'Success' },
]

const matchOptions = [
    { name: 'include', label: 'Include' },
    { name: 'exclude', label: 'Exclude' },
]

const loading = ref(false)
const error = ref<string | null>(null)

const isValid = computed(() => {
    return (
        pattern.value.trim().length >= 1 &&
        matchType.value !== null &&
        eventType.value !== null
    )
})

const handleSubmit = async () => {
    if (!isValid.value) return

    if (!matchType.value || !eventType.value || !pattern.value.trim()) return

    loading.value = true
    error.value = null

    try {
        const res = await createLog({
            pattern: pattern.value.trim(),
            match_type: matchType.value,
            event_type: eventType.value,
        })

        if (!res) {
            return
        }

        pattern.value = ''
        matchType.value = null
        eventType.value = null

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
        <p class="uppercase text-section-header-text p-4 pb-2 text-[0.8125rem] leading-[1rem] tracking-tight">
            New logs pattern
        </p>

        <div class="w-full flex flex-col gap-3">
            <Input v-model="pattern" placeholder="Regex pattern (Golang)" />
            <Select v-model="matchType" :options="matchOptions" placeholder="Match type" />
            <Select v-model="eventType" :options="eventOptions" placeholder="Event type" />
            <Button name="Add" :loading="loading" @click="handleSubmit" :disabled="!isValid" />
        </div>
    </div>
</template>
