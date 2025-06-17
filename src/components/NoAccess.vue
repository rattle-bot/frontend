<script setup lang="ts">
import About from './About.vue'
</script>

<template>
    <div
        class="fixed top-0 left-0 z-50 w-full h-full flex flex-col justify-center items-center gap-10 bg-secondary-bg"
    >
        <p
            class="text-[1rem] leading-[1.375rem] text-text font-medium text-center"
        >
            You don't have access<br />Please contact the administrator
        </p>

        <About />
    </div>
</template>
