<template>
  <div class="h-screen flex justify-center items-center">
    <div class="mb-4 max-w-lg h-fit" style="width : 500px;">
        <label class="block text-gray-700 text-sm font-boldm-auto" for="mail">
                nouveau mot de passe
        </label>
        <input v-model="mot_de_passe" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password"  placeholder="mot de passe">
        <input @click="updatePassword" value="Réinitialiser le mot de passe" type="submit" class="bg-blue-500 mt-4 w-full mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const mot_de_passe = ref('')
const props = defineProps(['id'])

const updatePassword = async () => {
  /**TODO */
  // envoyer le bon mail
  const resp = await axios.post('http://localhost:8080/secure/updatePassword/'+props.id,{
    mot_de_passe : mot_de_passe.value
  })
  console.log(resp)
}

</script>

<style>

</style>