<template>
    <div class="p-4 flex justify-center ">
        <form class="w-full max-w-lg" @submit.prevent="creerUser"  >
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                Nom Complet
            </label>
            <input v-model="objet.nom_complet" class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Jane">
            
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                email
            </label>
            <input v-model="objet.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Doe">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Password
            </label>
            <input v-model="objet.mot_de_passe" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="niv">
                Date de naissance
            </label>
            
            <div class="flex justify-center max-w-sm">
            <input type="date" v-model="objet.date_naiss"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
            
            </div>

            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="niv">
                Niveau
            </label>
            <div class="relative">
                <select v-model="objet.niveau" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="niv">
                <option>debutant</option>
                <option>Missouri</option>
                <option>Texas</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="num_tel">
                Numero de telephone
            </label>
            <input v-model="objet.num_tel" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="num_tel" type="tel" placeholder="0606060606">
            </div>
        </div>
        <input value="CREER UN COMPTE" type="submit" class="bg-blue-500 mt-4 w-full mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" :class="error ? 'block' : 'hidden'" role="alert">
                    <strong class="font-bold">Erreur</strong>
                    <span class="block sm:inline">Une erreur s'est produite</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import {ref} from 'vue'
import emailjs from '@emailjs/browser';

const error = ref(false)
const objet = ref({
    nom_complet : 'hello',
    niveau : '',
    date_naiss : '',
    num_tel : '',
    email : '',
    mot_de_passe : '',
})
const creerUser = async () => {

try{
const res = (await axios.post('http://localhost:8080/users',objet.value)).data.id_user
console.log(res)
error.value = false
console.log('succes')
emailjs.send('service_pmpofgp', 'template_nxtq11s', {
    name : objet.value.nom_complet,
    link : 'http://localhost:5173/user/verifyCompte/'+res,
    to : objet.value.email
}, '2hUGv3c8JztUPCBQN')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
alert('we \'ve sent you mail, please confirm your email')
}catch(e){
    console.log(e)
    error.value = true
}
    

}

</script>

<style>

</style>