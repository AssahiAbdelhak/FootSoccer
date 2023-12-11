<template>
    <div class="text-white bg-black h-screen">
        <div class="flex flex-col items-center" style="height : calc(100vh - 84px)">
            <h1 class="text-center mt-36 mb-28 text-5xl">Connectez vous à votre compte</h1>
            <Error v-if="error" :message="error" />
            <Input :required="true" v-model="object.email" title="adresse mail" />
            <Input :required="true" v-model="object.password" title="mot de passe" link="/forgotPassword" type="password" help="mot de passe oublié ?" />
            <p class="font-light">Vous n’avez pas de compte ? <router-link to="/register">créez-en un</router-link></p>
            <button class="btn mt-5" @click="connectUser">se connecter</button>
        </div>
    </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue' 
import Error from '../components/Error.vue'
import axios from "axios"
import { ref } from "vue"
import Input from '../components/Input.vue'
import { useUserStore } from '../stores/user'
import {useRouter,useRoute} from 'vue-router'



const object = ref({
    email: '',
    password : ''
})
const router = useRouter()
const userStore = useUserStore()
const error = ref(null)

const connectUser = async () => {
    
    try{
        error.value = null
        const res = await axios.post('http://localhost:8080/login',object.value)
        console.log('succes')
        console.log(res.data)
        userStore.setUser(res.data.elem)
        localStorage.setItem('token', res.data.token)
        router.push('/')
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