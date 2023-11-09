<template>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {useUserStore} from '../stores/user.js'

const userStore = useUserStore()

localStorage.clear()
useRouter().push('/')
userStore.setUser(null)
</script>

<style>

</style>