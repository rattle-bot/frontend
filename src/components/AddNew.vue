<script setup lang="ts">
import { computed, ref } from 'vue'
import LogsForm from './forms/LogsForm.vue'
import ContainersForm from './forms/ContainersForm.vue'
import ChatsForm from './forms/ChatsForm.vue'
import UsersForm from './forms/UsersForm.vue'

const props = defineProps<{
    name: 'logs' | 'containers' | 'chats' | 'users'
}>()

const showForm = ref(false)
const toggleForm = () => (showForm.value = !showForm.value)

const formComponent = computed(() => {
    switch (props.name) {
        case 'logs':
            return LogsForm
        case 'containers':
            return ContainersForm
        case 'chats':
            return ChatsForm
        case 'users':
            return UsersForm
        default:
            return null
    }
})
</script>

<template>
    <div v-if="!showForm" class="w-full flex items-center justify-start px-4 pt-3">
        <button @click="toggleForm" class="text-[0.9375rem] leading-[1.25rem] text-link font-semibold py-px px-2">
            Add new
        </button>
    </div>

    <Transition name="fade-slide-form" appear>
        <component v-if="showForm && formComponent" :is="formComponent" @close="toggleForm" />
    </Transition>
</template>

<style scoped>
.fade-slide-form-enter-from {
    opacity: 0;
    transform: translateY(2.5rem);
}

.fade-slide-form-enter-active {
    transition:
        opacity 0.5s ease,
        transform 0.5s ease;
}

.fade-slide-form-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.fade-slide-form-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.fade-slide-form-leave-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}

.fade-slide-form-leave-to {
    opacity: 0;
    transform: translateY(2.5rem);
}
</style>
