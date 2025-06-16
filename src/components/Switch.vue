<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
    <button
        class="relative w-[3.1875rem] h-[1.9375rem] rounded-full transition focus:outline-none"
        :class="modelValue ? 'bg-link' : 'bg-secondary-bg'"
        @click="toggle"
    >
        <div
            class="absolute top-0.5 left-0.5 w-[1.6875rem] h-[1.6875rem] rounded-full bg-white transition"
            :style="{
                transform: modelValue ? 'translateX(20px)' : 'translateX(0px)',
                boxShadow:
                    '0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)',
            }"
        ></div>
    </button>
</template>
