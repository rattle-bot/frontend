<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
    modelValue: string | null
    options: { label: string; name: string }[]
    placeholder?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const toggle = () => (open.value = !open.value)
const select = (option: { label: string; name: string }) => {
    emit('update:modelValue', option.name)
    open.value = false
}

const containerRef = ref(null)
onClickOutside(containerRef, () => (open.value = false))

const selectedLabel = computed(() => {
    const found = props.options.find((o) => o.name === props.modelValue)
    return found?.label || ''
})
</script>
<template>
    <div class="relative w-full" ref="containerRef">
        <!-- Trigger -->
        <button type="button"
            class="w-full bg-bg text-[1.0625rem] leading-[1.375rem] px-4 py-[0.8125rem] truncate rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-link transition"
            :class="!selectedLabel ? 'text-secondary-hint' : 'text-text'" @click="toggle">
            <span v-if="selectedLabel">{{ selectedLabel }}</span>
            <span v-else class="text-gray-400">{{ placeholder }}</span>
        </button>

        <!-- Dropdown -->
        <Transition name="fade-slide" appear>
            <div v-if="open" class="absolute z-10 mt-2 mr-3 right-0 min-w-[12rem] bg-bg rounded-[1.25rem] flex flex-col"
                style="
                    box-shadow:
                        0px 0px 2px 1px rgba(0, 0, 0, 0.05),
                        0px 32px 64px rgba(0, 0, 0, 0.05);
                ">
                <button v-for="option in options" :key="option.name" @click="select(option)"
                    class="text-left px-4 py-[0.8125rem] text-[1.0625rem] leading-[1.375rem]">
                    {{ option.label }}
                </button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(1.25rem);
}

.fade-slide-enter-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.fade-slide-leave-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(1.25rem);
}
</style>
