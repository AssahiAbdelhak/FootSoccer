<template>
<div>
    <Navigation />
    <div class=" flex flex-col justify-center p-7 gap-9" style="min-height: calc(100vh - 78px);">
        <h1 class="bold text-3xl">Mon profile</h1>
        <h2>{{userStore.user.nom_complet}}</h2>
        <h2>Date de Naissance : {{date_nais}}</h2>
        <h1 class="bold text-3xl">Contact</h1>
        <div>
            <h2 class="bold text-3xl">Tel : {{userStore.user.num_tel}}</h2>
            <h2 class="bold text-3xl">mail : {{userStore.user.email}}</h2>
        </div>
        <router-link class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit" to="/mon_compte/modifier">modifier les informations</router-link>
        <h1 class="bold text-3xl">Prochaines reservation : </h1>
        <div class="flex gap-3">
            <div v-for="res in userResa" class="p-4 w-fit rounded border shadow overflow-hidden-lg" :key="res.id_resa">
                <h1>Date : {{ dayjs(res.date).format('YYYY/MM/DD')}}</h1>
                <h1>Debut : {{res.debut}}</h1>
                <h1>Duree : {{res.duree}}</h1>
            </div>
        </div>
        
    </div>
</div>
  
</template>

<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { ref } from 'vue'
import Navigation from '../components/navigation.vue'
import {useUserStore} from '../stores/user.js'

let userResa = ref([])

const userStore = useUserStore()
console.log(userStore.user)
const date_nais = dayjs(userStore.user.date_naiss).format('YYYY/MM/DD')
console.log(userStore.user.id_utilisateur)
let reservations = (await axios.get('http://localhost:8080/reservation/joueur/'+userStore.user.id_utilisateur)).data.data


for (let i = 0 ; i < reservations.length ; i++){
    console.log(reservations[i].id_resa)
    userResa.value.push((await axios.get('http://localhost:8080/reservation/terrain/'+reservations[i].id_resa)).data.data[0])
    console.log((await axios.get('http://localhost:8080/reservation/terrain/'+reservations[i].id_resa)).data.data[0])
}
console.log(userResa.value)
</script>

<style>

</style>