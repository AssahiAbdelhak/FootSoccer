<template>

    <div class="bg-red-50 h-screen p-6">
        <div v-if="error" class="bg-red-100 border mx-auto mb-16 border-red-400 w-96 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold mr-3">Erreur !</strong>
            <span class="block sm:inline">{{error}}.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>
        <div class="sign-in-container flex flex-col md:flex-row items-center w-full gap-6">
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
    </div>

  
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"

const object = ref({
    email: '',
    password : ''
})

const error = ref(null)

const connectUser = async () => {
    
    try{
        error.value = null
        const res = await axios.post('http://localhost:8080/sign-up',object.value)
        console.log('succes')
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        location.href = 'http://localhost:5173/'
        }catch(e){
        console.log('failed')
        console.log(e)
        error.value = e.response.data.message
        console.log(error.value)
    }
}
</script>

<style>

</style>