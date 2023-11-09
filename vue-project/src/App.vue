<script setup>
import { RouterLink, RouterView } from 'vue-router'

import navigation from './components/navigation.vue'
</script>

<template>
<div>
    <navigation />
    <div class="div">
        <Suspense>
            <RouterView />
        </Suspense>
    </div>
</div>
</template>

<style scoped>
*{
    font-family: 'Poppins', sans-serif;;
}
.div{
    margin-top: 0px;
}
</style>
