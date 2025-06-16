<script setup lang="ts">
import { storeToRefs } from 'pinia'
import About from '../components/About.vue'
import AddNew from '../components/AddNew.vue'
import { eventEmoji } from '../shared/utils/format'
import { useLogStore } from '../stores/log'
import Divider from '../components/Divider.vue'
import SwipeItem from '../components/SwipeItem.vue'

const logStore = useLogStore()
const { logs } = storeToRefs(logStore)

const deleteLog = async (id: number) => {
    await logStore.deleteLog(id)
}
</script>

<template>
    <AddNew name="logs" />

    <div class="px-[1.125rem]">
        <div class="flex flex-col items-end bg-bg rounded-xl overflow-hidden">
            <template v-for="(log, index) in logs" :key="log.ID">
                <SwipeItem :id="log.ID" :onDelete="deleteLog">
                    <div class="w-full flex items-center px-4 gap-4">
                        <p
                            class="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-secondary-bg text-[1.25rem]"
                        >
                            {{ eventEmoji(log.event_type) }}
                        </p>

                        <div
                            class="overflow-hidden flex-1 flex flex-col py-3 gap-0.5"
                        >
                            <p
                                class="text-[1rem] leading-[1.375rem] text-text tracking-tight truncate"
                            >
                                {{ log.pattern }}
                            </p>
                            <p
                                class="text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter"
                            >
                                {{ log.event_type }} - {{ log.match_type }}
                            </p>
                        </div>
                    </div>
                </SwipeItem>

                <Divider
                    v-if="index < logs.length - 1"
                    class="w-[calc(100%-5rem)]"
                />
            </template>
        </div>
    </div>

    <About />
</template>
