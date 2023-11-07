<template>
<div>
    <Navigation />
    <PopUpModal :show="show" :dbAttr="dbAttr" :inputType="inputType" :options="options" :onClose="hideModal" :title="title" />
    <div class="text-white px-20 py-16 bg-black">
        <h1 class="text-5xl uppercase font-normal my-12">mon profile</h1>
        <div class="flex flex-wrap justify-between gap-24">
            <InfoField infoName="nom complet" :onModify="() => showModal('Nom','text','nom_complet')" :info=userStore.user.nom_complet />
            <InfoField infoName="date de naissance" :onModify="() => showModal('Date de naissance','date','date_naiss')" :info="userStore.user.date_naiss.substring(0,10).split('-').join('/')" />
            <InfoField infoName="email" :onModify="() => showModal('email','email','email')" :info=userStore.user.email />
            <InfoField infoName="numéro téléphone" :onModify="() => showModal('numéro de téléphone','tel','num_tel')" :info=userStore.user.num_tel />
            <InfoField infoName="niveau" :onModify="() => showModal('niveau','select','niveau')" :info=userStore.user.niveau />
        </div>
        <h1 class="text-5xl uppercase font-normal my-12">mes prochaines réservations</h1>
        <div class="flex items-center justify-start flex-wrap gap-5">
            <Card v-for="res in reservationInfos" :key="res" :info="res" />
        </div>
    </div>
    <Footer />
</div>
  
</template>

<script setup>
import Footer from '../components/Footer.vue'
import InfoField from '../components/InfoField.vue'
import PopUpModal from'../components/PopUpModal.vue'
import Card from '../components/Card.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import Navigation from '../components/navigation.vue'
import {useUserStore} from '../stores/user.js'
import CardVue from '../components/Card.vue'

const show = ref(false)
const title = ref('')
const dbAttr = ref('')
const inputType = ref('')
const options = ref([])

const showModal = (tit,type,attr) => {
    show.value = true
    title.value = tit
    dbAttr.value = attr
    inputType.value = type
    if(type == 'select')
        options.value = ['débutant','intermidiare','confirmé']
}
const hideModal = () => {
    show.value = false
}

const userStore = useUserStore()

const date_naiss = ref()
let id = userStore.user.id_utilisateur

const reservation = (await axios.get('http://localhost:8080/reservation/joueur/'+id)).data.data
let reservationInfos = ref([])
reservation.forEach(async (res) => {
    let response = (await axios.get('http://localhost:8080/reservation/'+res.id_resa)).data.data
    console.log('http://localhost:8080/centres/'+response.id_centre)
    console.log(response)
    let centre = (await axios.get('http://localhost:8080/centres/'+response.id_centre)).data.data[0]
    console.log(centre)
    reservationInfos.value.push({
        nom_centre : centre.nom_centre,
        adr_centre : centre.adr_centre,
        tarif : centre.tarif,
        date : response.date,
        debut : response.debut
    })
})

/*
let userResa = ref([])

try{
(await axios.create({
    headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
    }).get('http://localhost:8080/decode_jwt')).data.decoded.id
}catch(e){
    location.href = 'http://localhost:5173/sign-in'
}

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
console.log(userResa.value)*/
</script>

<style>

</style>