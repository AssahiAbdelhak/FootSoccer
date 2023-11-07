<template>
    <div class="flex flex-col justify-between w-fit border-2 rounded-lg py-2 px-4 gap-8 ">
        <div class="flex flex-col gap-4">
            <h2>Match 5vs5</h2>
            <h2>{{dayjs(props.info.date).format('D MMMM YYYY')}} {{`à ${props.info.debut}:00`}}</h2>
            <h2>{{props.info.adr_centre.split(' ').slice(0,props.info.adr_centre.split(' ').length - 3).join(' ')}} <br />{{props.info.adr_centre.split(' ').slice(props.info.adr_centre.split(' ').length - 3).join(' ')}}</h2>
        </div>
        <div class="flex justify-between">
            <h1>Total</h1>
            <h1>{{props.info.tarif+'$'}}</h1>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import dayjs from "dayjs"

const props = defineProps(['info'])
console.log(props.info)
</script>

<style>

</style>