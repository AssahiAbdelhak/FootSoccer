<template>
    <div class="flex flex-col w-[500px] h-28 py-2 px-4 justify-between border-2">
                <div class="flex justify-between items-center">
                    <h1 class="uppercase text-4xl text-gray-500">{{props.infoName}}</h1>
                    <i class="fa-solid fa-pencil fa-xl" @click="props.onModify"></i>
                </div>
    <h1 class="uppercase text-3xl">{{props.info}}</h1>
    </div>
</template>

<script setup>
import { ref } from "vue"
import PopUpModalVue from "./PopUpModal.vue"

const props = defineProps(['info','infoName','onModify'])
const show = ref(false)

const active = () => {
    show.value = true
}

</script>

<style>

</style>