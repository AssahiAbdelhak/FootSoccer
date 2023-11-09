<template>
    <div class="text-white bg-black ">
        <div class="px-20 w-full flex flex-col items-center" style="height : calc(100vh - 84px)">
            <h1 class="text-center mt-28 mb-20 text-5xl">modifier le compte</h1>
            <div class="flex w-full justify-between flex-wrap">
                <Input v-model="user.nom_complet" class="w-2/5" title="nom complet" />
                <Input v-model="user.email" type="email" class="w-2/5" title="adresse email" />
                <Input v-model="date_naiss" type="date" class="w-2/5" title="date de nais" />
                <Input v-model ="user.num_tel" type="tel" class="w-2/5" title="numéro téléphone" />
                <Input v-model="user.niveau" type="select" :options="options" class="w-2/5" title="niveau" />
                <Input v-model="user.role" type="select" :options="['utilisateur','admin']" class="w-2/5" title="role" />
            </div>
            <Error v-if="error" :message="error" />
            <button class="btn" @click="updateUser">modifier le compte</button>
        </div>
    </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
import Input from '../components/Input.vue'
import Error from '../components/Error.vue'
import {sendEmail} from '../utils/fonctions.js'
import axios from 'axios'
import {ref, watch} from 'vue'
import emailjs from '@emailjs/browser';
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const options = ["débutant","intermidiaire", "confirmé"]
const props = defineProps(['id'])
const router = useRouter()
const error = ref(null)

const user = ref(((await axios.get('http://localhost:8080/users/'+props.id+'?filter=nom_complet,role,date_naiss,niveau,num_tel,email')).data.data)[0])
const date_naiss = ref(dayjs(user.value.date_naiss).format('YYYY-MM-DD'))

const updateUser = async () => {
    console.log('hello')
    try{
    const res = await axios.create({
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
                }
        }).patch('http://localhost:8080/users/'+props.id,{...user.value,date_naiss : date_naiss.value});
        router.push('/dashboard')
    }catch(e){
        console.log(e)
        error.value = e.message
    }
}

</script>

<style>

</style>