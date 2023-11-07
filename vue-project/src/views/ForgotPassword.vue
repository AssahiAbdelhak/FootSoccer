<template>

<div class="text-white flex flex-col items-center justify-center h-screen">
    <h1 class="text-center mb-28 text-5xl">Récupérez votre mot de passe</h1>
    <Input type="email" v-model="emailto" title="Saisir votre adresse mail"/>
    <button class="btn" @click="sendLink">envoyer le lien</button>
  </div>
  
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import Input from '../components/Input.vue'
import { sendEmail } from '../utils/fonctions'


const emailto= ref('')

const sendLink = async () => {
    try{
        const id = ((await axios.get('http://localhost:8080/users?filter=id_utilisateur&email='+emailto.value)).data.data[0]).id_utilisateur
        console.log(id)
        sendEmail('template_kmmr326',{
            to : emailto.value,
            message : `
            Hi user,
            A password reset was requested.
            Please click the link below to reset your password and set a new one.
            http://localhost:5173/resetPassword/${id}
            `
        })
    }catch(e){
        console.log(e)
    }
}
</script>

<style>

</style>