<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Input from '../Input.vue'
import Select from '../Select.vue'
import Button from '../Button.vue'
import {
    useContainerStore,
    useRunningContainerStore,
} from '../../stores/container'
import type { ContainerType } from '../../shared/api/types/container'
import type { ModeValue } from '../../shared/api/types/mode'

const containerStore = useContainerStore()
const runningContainerStore = useRunningContainerStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const mode = ref<ModeValue>('blacklist')
const value = ref('')
const exclusionType = ref<ContainerType | null>(null)

const exclusionOptions = [
    { name: 'name', label: 'Name' },
    { name: 'image', label: 'Image' },
    { name: 'id', label: 'Id' },
    { name: 'label', label: 'Label key' },
]

const modeOptions = [
    { name: 'blacklist', label: 'Blacklist' },
    { name: 'whitelist', label: 'Whitelist' },
]

const selectedRunningContainerId = ref<string | null>(null)

watch(selectedRunningContainerId, (short_id) => {
    const found = runningContainerStore.containers.find(
        (c) => c.short_id === short_id,
    )

    if (found) {
        exclusionType.value = 'id'
        value.value = found.short_id
    }
})

const runningContainerOptions = computed(() =>
    runningContainerStore.containers.map((c) => ({
        name: c.short_id,
        label: `${c.short_id} (${c.name} : ${c.image})`,
    })),
)

const loading = ref(false)
const error = ref<string | null>(null)

const isValid = computed(() => {
    return value.value.trim().length >= 1 && exclusionType.value !== null
})

const handleSubmit = async () => {
    if (!isValid.value) return

    if (!exclusionType.value || !value.value.trim()) return

    loading.value = true
    error.value = null

    try {
        const res = await containerStore.addContainer({
            type: exclusionType.value,
            value: value.value.trim(),
            mode: mode.value,
        })

        if (!res) {
            return
        }

        value.value = ''
        exclusionType.value = null
        mode.value = 'blacklist'

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
            New container rule
        </p>

        <div class="w-full flex flex-col gap-3">
            <Select
                v-model="mode"
                :options="modeOptions"
                placeholder="Filtering mode"
            />
            <Select
                v-model="selectedRunningContainerId"
                :options="runningContainerOptions"
                placeholder="Container"
            />
            <p
                class="text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter text-center"
            >
                OR
            </p>
            <Select
                v-model="exclusionType"
                :options="exclusionOptions"
                placeholder="Exclusion type"
            />
            <Input v-model="value" placeholder="Value" />
            <Button
                name="Add"
                :loading="loading"
                @click="handleSubmit"
                :disabled="!isValid"
            />
        </div>
    </div>
</template>
