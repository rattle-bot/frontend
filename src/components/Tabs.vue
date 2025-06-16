<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import Divider from './Divider.vue'

const props = defineProps<{
    tabs: { name: string; label: string }[]
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const setActive = (name: string) => emit('update:modelValue', name)

const tabRefs = ref<HTMLSpanElement[]>([])

const barLeft = ref(0)
const barWidth = ref(0)

const hasInteracted = ref(false)

let lastIndex = -1
const updateBarPosition = () => {
    const activeIndex = props.tabs.findIndex((t) => t.name === props.modelValue)
    if (activeIndex !== lastIndex) {
        const el = tabRefs.value[activeIndex]
        if (el) {
            const rect = el.getBoundingClientRect()
            const parentRect = el.offsetParent?.getBoundingClientRect()
            barLeft.value = rect.left - (parentRect?.left ?? 0)
            barWidth.value = rect.width
            lastIndex = activeIndex
        }
    }
}

watch(
    () => props.modelValue,
    async () => {
        await nextTick()
        updateBarPosition()

        if (!hasInteracted.value) {
            hasInteracted.value = true
        }
    },
)

onMounted(() => {
    nextTick(updateBarPosition)
})
</script>

<template>
    <div class="w-full flex flex-col mt-2">
        <div class="relative w-full flex items-center gap-3 h-[2.75rem]">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                :class="[
                    'w-full h-full flex items-center justify-center text-[0.875rem] leading-[1.375rem] transition',
                    modelValue === tab.name
                        ? 'text-link font-bold'
                        : 'text-secondary-hint font-medium',
                ]"
                @click="setActive(tab.name)"
            >
                <span ref="tabRefs">
                    {{ tab.label }}
                </span>
            </button>

            <div
                class="absolute bottom-0 bg-link h-[0.1875rem] rounded-t-[0.25rem] rounded-b-[0.0625rem]"
                :class="hasInteracted && 'transition-[left,width] duration-200'"
                :style="`left: ${barLeft}px; width: ${barWidth}px`"
            ></div>
        </div>

        <Divider />
    </div>
</template>
