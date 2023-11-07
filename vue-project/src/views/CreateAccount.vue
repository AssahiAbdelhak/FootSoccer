<template>
    <div class="text-white bg-black ">
        <Navigation />
        <div class="px-20 w-full flex flex-col items-center" style="height : calc(100vh - 84px)">
            <h1 class="text-center mt-28 mb-20 text-5xl">créer votre compte</h1>
            <div class="flex w-full justify-between flex-wrap">
                <Input v-model="objet.nom_complet" class="w-2/5" title="nom complet" />
                <Input v-model="objet.email" type="email" class="w-2/5" title="adresse email" />
                <Input v-model="objet.mot_de_passe" type="password" class="w-2/5" title="mot de passe" />
                <Input v-model="objet.date_naiss" type="date" class="w-2/5" title="date de nais" />
                <Input v-model="objet.niveau" type="select" :options="options" class="w-2/5" title="niveau" />
                <Input v-model ="objet.num_tel" type="tel" class="w-2/5" title="numéro téléphone" />
            </div>
            <Error v-if="error" :message="error" />
            <button class="btn" @click="creerUser">créer votre compte</button>
        </div>
    </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
import Input from '../components/Input.vue'
import Error from '../components/Error.vue'
import {sendEmail} from '../utils/fonctions.js'
import axios from 'axios'
import {ref, watch} from 'vue'
import emailjs from '@emailjs/browser';

const options = ["débutant","intermidiaire", "confirmé"]

const error = ref(false)
const objet = ref({
    nom_complet : '',
    niveau : '',
    date_naiss : '',
    num_tel : '',
    email : '',
    mot_de_passe : '',
})


const creerUser = async () => {

    error.value = null
    const res = (await axios.post('http://localhost:8080/users',objet.value)).data.id_user
    error.value = false

    sendEmail('template_nxtq11s',{
        name : objet.value.nom_complet,
        link : 'http://localhost:5173/user/verifyCompte/'+res,
        to : objet.value.email
    })

}

</script>

<style>

</style>