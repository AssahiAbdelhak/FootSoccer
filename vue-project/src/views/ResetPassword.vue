<template>
  <div class="h-screen flex justify-center items-center">
    <div class="mb-4 max-w-lg h-fit" style="width : 500px;">
        <label class="block text-gray-700 text-sm font-boldm-auto " for="mail">
                adresse e-mail
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail" type="email" placeholder="Adresse e-mail">
        <input @click="sendLink" value="Envoyer le lien" type="submit" class="bg-blue-500 mt-4 w-full mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const email = ref('')

const sendLink = async () => {
  /**TODO */
  // envoyer le bon mail
  const allusers = (await axios.get('http://localhost:8080/users')).data.data
  const user = allusers.filter((a) => a.email == email.value)
  if(user.length != 0){
    console.log(user)
    console.log('http://localhost:5173/setNewPassword/'+user[0].id_utilisateur)
  }
  
}

</script>

<style>

</style>