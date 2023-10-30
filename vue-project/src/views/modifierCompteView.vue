<template>
  <div class="sign-in-container h-screen flex flex-col md:flex-row items-center w-full bg-red-50 p-6 gap-6">
    <div class=" md:w-1/2">
        <form @submit.prevent="modifierInfos" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
            <h1 class="bold text-4xl text-center">JE MODIFIE MES INFORMATIONS !</h1>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="mail">
                adresse e-mail
            </label>
            <input v-model="object.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail" type="email" placeholder="Adresse e-mail">
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="num">
                numero de tel
            </label>
            <input v-model="object.num_tel" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="num" type="tel" placeholder="Adresse e-mail">
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Mot de Passe
            </label>
            <input v-model="object.mot_de_passe" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            
            </div>
            <div class="flex flex-col items-center justify-between">
            <button class="bg-blue-500 w-full mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                modifier
            </button>
            <router-link  class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/mon_compte">
                retour
            </router-link>
            </div>
        </form>
    </div>
    
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"
import {useUserStore} from '../stores/user.js'

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
const object = ref({
    email : userStore.user.email,
    num_tel : userStore.user.num_tel,
    mot_de_passe : ''
})

const modifierInfos = async () => {
try{
const res = await axios.create({
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
            }
    }).patch('http://localhost:8080/users/'+userStore.user.id_utilisateur,object.value)
    console.log(res.data)
}catch(e){
    location.href = 'http://localhost:5173/sign-in'
}
}

</script>

<style>

</style>