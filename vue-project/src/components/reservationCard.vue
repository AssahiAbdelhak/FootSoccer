<template>
  <div style="width : 300px;" class="rounded border shadow overflow-hidden-lg">
    <h3 class="border-b-2 text-center py-2">{{titre}}</h3>
    <div class="flex justify-between items-center px-2 py-4">
        <div>
            <h1>5$ / Personne</h1>
            <h3>{{heure}}h</h3>
        </div>
        
        <button class="bg-blue-500 mt-3 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                RESERVER
        </button>
    </div>
    
    <h3 class="border-t-2 text-center py-2">{{props.count}} terrains disponibles</h3>
  </div>
</template>

<script setup>
import dayjs from "dayjs"

let titre = `FOOT-${props.info.localisation.toUpperCase()}${props.info.est_filme ? '-FILME' : ''}`
let heure = props.heure.split(':')[0]
const props = defineProps(['info','heure','count'])
</script>

<style>

</style>