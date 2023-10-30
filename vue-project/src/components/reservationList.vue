<template>
<div class="flex flex-wrap justify-center gap-4 mb-4" >
    <ReservationCard :day="props.day" :heure="props.heure" v-if="exterieur_filme.length != 0" :info="exterieur_filme[0]" :count="exterieur_filme.length"  />
    <ReservationCard :day="props.day" :heure="props.heure"  v-if="exterieur_non_filme.length != 0" :info="exterieur_non_filme[0]" :count="exterieur_non_filme.length"  />
    <ReservationCard :day="props.day" :heure="props.heure"  v-if="interieur_filme.length != 0" :info="interieur_filme[0]" :count="interieur_filme.length"  />
    <ReservationCard :day="props.day" :heure="props.heure"  v-if="interieur_non_filme.length != 0" :info="interieur_non_filme[0]" :count="interieur_non_filme.length"  />
</div>
</template>

<script setup>
import ReservationCard from './reservationCard.vue'
const props = defineProps(['dispo','heure','day'])
let exterieur_filme = props.dispo.exterieur_filme
let interieur_non_filme = props.dispo.interieur_non_filme
let exterieur_non_filme = props.dispo.exterieur_non_filme
let interieur_filme = props.dispo.interieur_filme
</script>

<style>

</style>