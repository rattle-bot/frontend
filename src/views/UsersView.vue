<script setup lang="ts">
import { storeToRefs } from 'pinia'
import About from '../components/About.vue'
import AddNew from '../components/AddNew.vue'
import Divider from '../components/Divider.vue'
import SwipeItem from '../components/SwipeItem.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const deleteUser = async (id: number) => {
    await userStore.deleteUser(id)
}
</script>

<template>
    <AddNew name="users" />

    <div class="px-[1.125rem]">
        <div class="flex flex-col items-end bg-bg rounded-xl overflow-hidden">
            <template v-for="(user, index) in users" :key="user.ID">
                <SwipeItem
                    :disable-swipe="
                        userStore.user?.telegram_id === user.telegram_id
                    "
                    :id="user.ID"
                    :onDelete="deleteUser"
                >
                    <div class="w-full flex items-center px-4 gap-4">
                        <div
                            class="overflow-hidden flex-1 flex flex-col py-3 gap-0.5"
                        >
                            <p
                                class="text-[1rem] leading-[1.375rem] font-medium tracking-tight truncate"
                                :class="
                                    !user.active
                                        ? 'text-subtitle-text'
                                        : 'text-text'
                                "
                            >
                                {{
                                    !user.active
                                        ? 'NOT ACTIVE'
                                        : user.username || user.first_name
                                }}
                            </p>
                            <p
                                class="text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter"
                            >
                                {{ user.telegram_id }}
                            </p>
                        </div>

                        <p
                            class="text-[0.9375rem] leading-[1.25rem] text-subtitle-text tracking-tighter"
                        >
                            {{ user.role }}
                        </p>
                    </div>
                </SwipeItem>

                <Divider
                    v-if="index < users.length - 1"
                    class="w-[calc(100%-5rem)]"
                />
            </template>
        </div>
    </div>

    <About />
</template>
