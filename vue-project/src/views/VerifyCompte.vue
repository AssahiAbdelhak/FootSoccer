<template>
  <div class="h-screen flex justify-center items-center flex-col gap-5">
    <h1>Please verify your account by clicking this button below</h1>
    <button @click="verifyAccount" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Verify your account
            </button>
  </div>
</template>

<script setup>
import axios, { Axios } from "axios"
import { useRoute } from "vue-router"
const props = defineProps(['id'])

try{
  (await axios.get('http://localhost:8080/user/'+props.id)).data
}catch(e){
  location.href = 'http://localhost:5173/sign-in'
}
  

const verifyAccount = async () => {
    console.log(props.id)
    const res = await axios.post('http://localhost:8080/users/verifyCompte/'+props.id)
    console.log(res)
}
</script>

<style>

</style>