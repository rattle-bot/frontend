<script setup lang="ts">
import { computed, ref } from 'vue'
import { useModeStore } from '../stores/mode'
import Button from './Button.vue'
import type { ModeValue } from '../shared/api/types/mode'

const modeStore = useModeStore()

const currentMode = computed(() => modeStore.mode?.value)
const isLoading = ref(false)

const handleSetMode = async (newMode: ModeValue) => {
    if (currentMode.value === newMode || modeStore.isLoading) return // Already active — no need to re-send

    isLoading.value = true
    await modeStore.updateMode(newMode)
    isLoading.value = false
}
</script>

<template>
    <div class="w-full flex flex-col px-4.5">
        <p
            class="uppercase text-section-header-text px-4 pb-2 text-[0.8125rem] leading-[1rem] tracking-tight"
        >
            Filtering mode
        </p>
        <div class="w-full flex items-start gap-3">
            <div class="w-full flex flex-col gap-2.5">
                <Button
                    name="Blacklist"
                    :mode="currentMode === 'blacklist' ? 'filled' : 'gray'"
                    :loading="currentMode === 'whitelist' && isLoading"
                    @click="() => handleSetMode('blacklist')"
                />
                <p
                    class="text-[0.9375rem] leading-[1.25rem] font-regular text-subtitle-text tracking-tighter text-left"
                >
                    Monitor all except specified
                </p>
            </div>
            <div class="w-full flex flex-col gap-2.5">
                <Button
                    name="Whitelist"
                    :mode="currentMode === 'whitelist' ? 'filled' : 'gray'"
                    :loading="currentMode === 'blacklist' && isLoading"
                    @click="() => handleSetMode('whitelist')"
                />
                <p
                    class="text-[0.9375rem] leading-[1.25rem] font-regular text-subtitle-text tracking-tighter text-right"
                >
                    Monitor only specified containers
                </p>
            </div>
        </div>
    </div>
</template>
