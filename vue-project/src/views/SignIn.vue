<template>
  <div class="sign-in-container h-screen flex flex-col md:flex-row items-center w-full bg-red-50 p-6 gap-6">
    <div class=" md:w-1/2">
        <form @submit.prevent="connectUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="bold text-4xl text-center">JE ME CONNECTE !</h1>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="mail">
                adresse e-mail
            </label>
            <input v-model="object.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail" type="email" placeholder="Adresse e-mail">
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Mot de Passe
            </label>
            <input v-model="object.password" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            
            </div>
            <div class="flex flex-col items-center justify-between">
            <button class="bg-blue-500 w-full mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                CONNEXION
            </button>
            <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/resetPassword">
                Mot de passe oublié ?
            </router-link>
            </div>
        </form>
    </div>
    <div class="w-1/2 flex flex-col justify-around items-center gap-4">
        <h1 class="bold text-6xl text-center">FOOT SOCCER</h1>
        <h2 class="bold text-4xl text-center">TU N'AS PAS ENCORE E COMPTE ?</h2>
        <a href="/user/create" class="btn" type="button">
                CREER MON COMPTE
            </a>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"

const object = ref({
    email: '',
    password : ''
})
const connectUser = async () => {
    
    try{
        const res = await axios.post('http://localhost:8080/sign-up',object.value)
        console.log('succes')
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        location.href = 'http://localhost:5173/'
        }catch(e){
        console.log('failed')
        console.log(e)
    }
}
</script>

<style>

</style>