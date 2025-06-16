<script setup lang="ts">
import { storeToRefs } from 'pinia'
import About from '../components/About.vue'
import AddNew from '../components/AddNew.vue'
import { useContainerStore } from '../stores/container'
import SwipeItem from '../components/SwipeItem.vue'
import Divider from '../components/Divider.vue'

const containerStore = useContainerStore()
const { containers } = storeToRefs(containerStore)

const deleteContainer = async (id: number) => {
    await containerStore.deleteContainer(id)
}
</script>

<template>
    <AddNew name="containers" />

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
                        </div>

                        <p
                            class="text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter"
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
