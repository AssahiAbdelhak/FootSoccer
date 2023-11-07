<template>
  <div class="flex gap-8 items-center" :class="flip ? 'flex-row' : 'flex-row-reverse'">
    <div class="w-1/2 flex flex-col gap-8">
        <h1 class="uppercase text-3xl">centre {{props.centre.nom_centre}}</h1>
        <h2 class="text-right">{{props.centre.tarif}}$/Personne</h2>
        <div>
            <p>{{adr.slice(0,adr.length - 3).join(' ')}}</p>
            <p>{{adr.slice(adr.length - 3).join(' ')}}</p>
        </div>
        <router-link :to=href class="btn mt-10">réserver dans ce centre</router-link>
    </div>
    <div class="image w-1/2">
        <img src="../images/centre.jpg" alt="">
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['flip','centre'])
console.log(props.centre.adr_centre)
const adr = props.centre.adr_centre.split(' ')
const href = `/reservation/centre=${props.centre.id_centre}`
console.log()
</script>

<style>

</style>