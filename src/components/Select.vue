<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Divider from './Divider.vue'

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
        <button
            type="button"
            class="w-full bg-bg text-[1.0625rem] leading-[1.375rem] px-4 py-[0.8125rem] truncate rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-link transition flex items-center justify-between"
            :class="!selectedLabel ? 'text-secondary-hint' : 'text-text'"
            @click="toggle"
        >
            <span v-if="selectedLabel" class="truncate">{{
                selectedLabel
            }}</span>
            <span v-else class="text-gray-400">{{ placeholder }}</span>

            <svg
                :class="!selectedLabel && 'opacity-35'"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.37404 2.35329C9.72299 2.01554 10.277 2.01554 10.6259 2.35329L15.1259 6.70884C15.4831 7.05453 15.4924 7.62431 15.1467 7.98146C14.801 8.33862 14.2312 8.34791 13.874 8.00222L9.99998 4.25251L6.12591 8.00222C5.76875 8.34791 5.19898 8.33862 4.85329 7.98146C4.50759 7.62431 4.51689 7.05453 4.87404 6.70884L9.37404 2.35329ZM4.85329 12.0185C5.19898 11.6613 5.76875 11.652 6.12591 11.9977L9.99998 15.7474L13.874 11.9977C14.2312 11.652 14.801 11.6613 15.1467 12.0185C15.4924 12.3756 15.4831 12.9454 15.1259 13.2911L10.6259 17.6467C10.277 17.9844 9.72299 17.9844 9.37404 17.6467L4.87404 13.2911C4.51689 12.9454 4.50759 12.3756 4.85329 12.0185Z"
                    fill="#A2ACB0"
                />
            </svg>
        </button>

        <!-- Dropdown -->
        <Transition name="fade-slide" appear>
            <div
                v-if="open"
                class="max-w-[calc(100%-0.75rem)] absolute z-10 mt-2 mr-3 right-0 min-w-[12rem] bg-bg rounded-[1.25rem] flex flex-col items-end"
                style="
                    box-shadow:
                        0px 0px 2px 1px rgba(0, 0, 0, 0.05),
                        0px 32px 64px rgba(0, 0, 0, 0.05);
                "
            >
                <template v-for="(option, index) in options" :key="option.name">
                    <button
                        @click="select(option)"
                        class="w-full text-left px-4 py-[0.8125rem] text-[1.0625rem] leading-[1.375rem] break-all"
                    >
                        {{ option.label }}
                    </button>
                    <Divider
                        v-if="index < options.length - 1"
                        class="w-[calc(100%-1rem)]"
                    />
                </template>
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
