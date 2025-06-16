<script setup lang="ts">
defineProps<{
    modelValue: string
    placeholder?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
    <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue"
        class="w-full bg-bg text-[1.0625rem] leading-[1.375rem] text-text placeholder-secondary-hint px-4 py-[0.8125rem] rounded-xl focus:outline-none focus:ring-2 focus:ring-link transition"
    />
</template>
