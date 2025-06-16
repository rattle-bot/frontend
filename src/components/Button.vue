<script setup lang="ts">
const props = defineProps<{
    name: string
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
    if (!props.loading && !props.disabled) emit('click', e)
}
</script>

<template>
    <button
        :type="type || 'button'"
        :disabled="loading || disabled"
        @click="handleClick"
        class="w-full rounded-xl px-3 py-3 text-[1.0625rem] leading-[1.5rem] text-button-text font-semibold flex items-center justify-center"
        :class="disabled ? 'bg-link/35' : 'bg-link'"
    >
        <svg
            v-if="loading"
            class="animate-spin"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                opacity="0.5"
                x="11.0005"
                y="14.9999"
                width="2"
                height="7"
                rx="1"
                fill="white"
            />
            <rect
                opacity="0.25"
                x="13.4146"
                y="14.8284"
                width="2"
                height="7"
                rx="1"
                transform="rotate(-45 13.4146 14.8284)"
                fill="white"
            />
            <rect
                x="2.00049"
                y="12.9999"
                width="2"
                height="7"
                rx="1"
                transform="rotate(-90 2.00049 12.9999)"
                fill="white"
            />
            <rect
                opacity="0.75"
                x="5.63672"
                y="19.7781"
                width="2"
                height="7"
                rx="1"
                transform="rotate(-135 5.63672 19.7781)"
                fill="white"
            />
        </svg>
        <span v-else>{{ name }}</span>
    </button>
</template>
