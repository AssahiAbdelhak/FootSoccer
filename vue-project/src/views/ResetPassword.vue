<template>
  <div class="text-white flex flex-col items-center justify-center h-screen">
    <h1 class="text-center mb-28 text-5xl">Réinitialisez votre mot de passe</h1>
    <Input type="password" v-model="password" title="Saisir votre nouveau mot de passe"/>
    <Input type="password" v-model="confirmPassword" title="confirme le nouveau mot de passe"/>
    <Error v-if="error" :message="error" />
    <button class="btn" @click="updatePassword">envoyer le lien</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import Input from '../components/Input.vue'
import Error from '../components/Error.vue'

const error = ref(null)
const props = defineProps(['id'])
const password = ref('')
const confirmPassword = ref('')
//  
const updatePassword = async () => {
  error.value = null
  if(password.value !== confirmPassword.value){
    error.value = 'les deux mots de passe ne sont pas identiques'
    return
  }
  await axios.post('http://localhost:8080/secure/updatePassword/'+props.id,{
    mot_de_passe : password.value
  })
}

</script>

<style>

</style>