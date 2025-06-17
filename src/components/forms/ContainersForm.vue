<script setup lang="ts">
import { computed, ref } from 'vue'
import Input from '../Input.vue'
import Select from '../Select.vue'
import Button from '../Button.vue'
import { useContainerStore } from '../../stores/container'
import type { ContainerType } from '../../shared/api/types/container'

const containerStore = useContainerStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const value = ref('')
const exclusionType = ref<ContainerType | null>(null)

const exclusionOptions = [
    { name: 'name', label: 'Name' },
    { name: 'image', label: 'Image' },
    { name: 'id', label: 'Id' },
    { name: 'label', label: 'Label key' },
]

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
        })

        if (!res) {
            return
        }

        value.value = ''
        exclusionType.value = null

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
            New container exclusion
        </p>

        <div class="w-full flex flex-col gap-3">
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
