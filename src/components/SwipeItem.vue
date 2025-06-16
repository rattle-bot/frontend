<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { openedSwipeId } from '../shared/utils/swipe'

const props = defineProps<{
    id: number
    onDelete: (id: number) => void
}>()

const startX = ref(0)
const translateX = ref(0)
const isDragging = ref(false)
const maxTranslate = -80

const close = () => (translateX.value = 0)

watch(openedSwipeId, (newId) => {
    if (newId !== props.id) {
        close()
    }
})

const startDrag = (x: number) => {
    startX.value = x
    isDragging.value = true
}

const moveDrag = (x: number) => {
    if (!isDragging.value) return

    openedSwipeId.value = props.id

    const deltaX = x - startX.value
    startX.value = x

    let next = translateX.value + deltaX

    if (next > 0) next = 0

    translateX.value = next
}

const endDrag = () => {
    isDragging.value = false

    if (translateX.value < maxTranslate / 2) {
        translateX.value = maxTranslate // Keep opened
    } else {
        close()
    }
}

// Touch events
const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX)
const onTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX)
const onTouchEnd = () => endDrag()

// Mouse events
const onMouseDown = (e: MouseEvent) => startDrag(e.clientX)
const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX)
const onMouseUp = () => endDrag()

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
})

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
    <div class="relative w-full overflow-hidden select-none">
        <div
            class="absolute z-[1] bg-red-600 flex justify-end items-center top-px bottom-px"
            :class="translateX < 0 ? 'left-0 right-0' : 'left-px right-px'"
        >
            <button
                class="text-white text-xl w-20 h-full flex flex-col items-center justify-center gap-1"
                @click="props.onDelete(props.id)"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.8695 2.05608C11.9125 2.05612 11.9559 2.05617 11.9999 2.05617C12.0439 2.05617 12.0873 2.05612 12.1303 2.05608C12.7528 2.05539 13.2704 2.05482 13.7156 2.20237C14.5369 2.47453 15.1943 3.10449 15.4825 3.92202C15.5823 4.20497 15.6181 4.51697 15.6308 4.86101H19.7146C20.2117 4.86101 20.6146 5.26395 20.6146 5.76101C20.6146 6.25806 20.2117 6.66101 19.7146 6.66101H4.28519C3.78814 6.66101 3.38519 6.25806 3.38519 5.76101C3.38519 5.26395 3.78814 4.86101 4.28519 4.86101H8.36896C8.38166 4.51697 8.41754 4.20497 8.5173 3.92202C8.80552 3.10449 9.46291 2.47453 10.2842 2.20237C10.7294 2.05482 11.247 2.05539 11.8695 2.05608ZM10.1713 4.86101H13.8285C13.8206 4.66359 13.8069 4.58285 13.7849 4.52052C13.6871 4.24313 13.4575 4.01308 13.1494 3.91099C13.0188 3.86771 12.8245 3.85617 11.9999 3.85617C11.1753 3.85617 10.981 3.86771 10.8504 3.91099C10.5423 4.01308 10.3127 4.24313 10.2149 4.52052C10.1929 4.58285 10.1792 4.66359 10.1713 4.86101ZM5.62115 7.67266C6.11444 7.6116 6.56383 7.962 6.62488 8.45529L7.56166 16.0238C7.68835 17.0474 7.77547 17.7404 7.90125 18.2641C8.02209 18.7671 8.15776 19.0159 8.32235 19.1905C8.41527 19.289 8.51897 19.3783 8.63193 19.4567C8.83619 19.5984 9.11726 19.7023 9.65633 19.7597C10.213 19.8189 10.9384 19.8201 11.9999 19.8201C13.0614 19.8201 13.7868 19.8189 14.3435 19.7597C14.8825 19.7023 15.1636 19.5984 15.3679 19.4567C15.4808 19.3783 15.5845 19.289 15.6774 19.1905C15.842 19.0159 15.9777 18.7671 16.0985 18.2641C16.2243 17.7404 16.3114 17.0474 16.4381 16.0238L17.3749 8.45529C17.436 7.962 17.8854 7.6116 18.3787 7.67266C18.8719 7.73371 19.2223 8.1831 19.1613 8.67639L18.2182 16.296C18.0994 17.2556 18.0011 18.0502 17.8488 18.6844C17.6888 19.3505 17.4491 19.9354 16.987 20.4254C16.8078 20.6154 16.609 20.7863 16.3941 20.9354C15.8432 21.3178 15.2257 21.4759 14.534 21.5496C13.8708 21.6202 13.0492 21.6201 12.0491 21.6201H11.9507C10.9506 21.6201 10.129 21.6202 9.4658 21.5496C8.7741 21.4759 8.1566 21.3178 7.60569 20.9354C7.39075 20.7863 7.192 20.6154 7.01283 20.4254C6.55074 19.9354 6.31101 19.3505 6.15103 18.6844C5.99869 18.0502 5.90036 17.2556 5.78162 16.296L4.83852 8.67639C4.77746 8.1831 5.12786 7.73371 5.62115 7.67266Z"
                        fill="white"
                    />
                </svg>
                <span class="text-[0.75rem] text-white font-medium"
                    >Delete</span
                >
            </button>
        </div>

        <div
            class="relative z-[2] bg-bg touch-pan-x"
            :style="{
                transform: `translateX(${translateX}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
            }"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @mousedown="onMouseDown"
        >
            <slot />
        </div>
    </div>
</template>
