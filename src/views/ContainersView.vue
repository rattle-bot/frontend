<script setup lang="ts">
import { storeToRefs } from 'pinia'
import About from '../components/About.vue'
import AddNew from '../components/AddNew.vue'
import { useContainerStore } from '../stores/container'
import SwipeItem from '../components/SwipeItem.vue'
import Divider from '../components/Divider.vue'
import FilteringMode from '../components/FilteringMode.vue'
import { useUserStore } from '../stores/user'
import { useModeStore } from '../stores/mode'

const containerStore = useContainerStore()
const { containers } = storeToRefs(containerStore)

const modeStore = useModeStore()

const userStore = useUserStore()

const deleteContainer = async (id: number) => {
    await containerStore.deleteContainer(id)
}
</script>

<template>
    <AddNew name="containers" />

    <FilteringMode v-if="userStore.user?.role === 'admin'" />
    <p
        v-else
        class="uppercase text-section-header-text px-8.5 text-[0.8125rem] leading-[1rem] tracking-tight"
    >
        Current mode: <b>{{ modeStore.mode?.value }}</b>
    </p>

    <div class="px-[1.125rem]">
        <div class="flex flex-col items-end bg-bg rounded-xl overflow-hidden">
            <template
                v-for="(container, index) in containers"
                :key="container.ID"
            >
                <SwipeItem :id="container.ID" :onDelete="deleteContainer">
                    <div class="w-full flex items-center px-4 gap-4">
                        <div
                            class="overflow-hidden flex-1 flex flex-col py-3 gap-0.5"
                        >
                            <p
                                class="text-[1rem] leading-[1.375rem] text-text font-medium tracking-tight truncate"
                            >
                                {{ container.value }}
                            </p>
                            <p
                                class="text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter"
                            >
                                {{ container.mode }}
                            </p>
                        </div>

                        <p
                            class="flex flex-col items-end text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter text-right"
                        >
                            {{ container.type }}
                        </p>
                    </div>
                </SwipeItem>

                <Divider
                    v-if="index < containers.length - 1"
                    class="w-[calc(100%-5rem)]"
                />
            </template>
        </div>
    </div>

    <About />
</template>
