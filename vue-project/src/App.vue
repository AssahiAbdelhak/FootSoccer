<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<Suspense>
<RouterView />
</Suspense>
</template>

<style scoped>
*{
    font-family: 'Poppins', sans-serif;;
}
</style>
