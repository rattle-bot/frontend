<script setup lang="ts">
import { ref, onMounted } from 'vue'

const safeAreaTop = ref(0)

onMounted(() => {
    const root = document.documentElement
    const raw = getComputedStyle(root).getPropertyValue(
        '--tg-safe-area-inset-top',
    )
    const rawC = getComputedStyle(root).getPropertyValue(
        '--tg-content-safe-area-inset-top',
    )
    safeAreaTop.value =
        (parseInt(raw || '0') || 0) + (parseInt(rawC || '0') || 0)
})
</script>

<template>
    <div
        v-if="safeAreaTop > 20"
        class="flex items-center justify-center gap-1 absolute left-0 right-0"
        style="
            height: var(--tg-content-safe-area-inset-top);
            top: calc(var(--tg-safe-area-inset-top));
        "
    >
        <img src="/ico/favicon-96x96.png" alt="" class="w-5 h-5" />
        <p class="text-[0.875rem] leading-[1.25rem] text-text font-semibold">
            Rattle
        </p>
    </div>
</template>
