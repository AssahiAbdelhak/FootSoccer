<template>
  <div id="hero">
    <div class="relative px-20 bg-black text-white w-screen font-normal">
        <div class="flex flex-col py-16">
            <h1 class="text-5xl mb-8 leading-relaxed font-normal">Bienvenue sur <a href="#contact"><span class="text-red-500">FOOT SOCCER</span></a>, votre destination pour la réservation de terrains de football en ligne !</h1>
            <h3 class="uppercase text-2xl font-light mb-28 ">Facilitez votre réservation, jouez au football !</h3>
            <router-link to="/reservation/centre=null" class="btn">réserver</router-link>
            <div class="fixed right-8 top-60 flex flex-col gap-3">
                <a :href="lien.href" v-for="lien in liens" :key="lien.id" @click="active=lien.id">
                    <span class="block h-5 w-5 border-2 rounded-full border-white " :class=" lien.id == active ? 'bg-white' : ''"></span>
                </a>         
            </div>
        </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue"

const active = ref(0)
const liens = [
    {id : 0,href : '/#hero'},
    {id : 1,href : '/#about'},    
    {id : 2,href : '/#testimonial'},    
    {id : 3,href : '/#contact'}  
]
/*import axios from "axios"
import dayjs from "dayjs"
import { ref } from "vue"
import {useUserStore} from '../stores/user.js'


const userStore = useUserStore()
const res_centres = (await axios.get('http://localhost:8080/centres')).data
const count_terrins = (await axios.get('http://localhost:8080/terrains/count')).data.length
const count_users = (await axios.get('http://localhost:8080/users/count')).data.length
const count_centres = res_centres.length

const centres = res_centres.data
const date_ajd = dayjs().format('YYYY-MM-DD')

const token = localStorage.getItem('token')

if(token != null){
    let reqInstance = axios.create({
        headers: {
            Authorization : `Bearer ${token}`
            }
    })
    const token_verif = (await reqInstance.get('http://localhost:8080/decode_jwt')).data
    console.log(token_verif)
    if(token_verif.success){
        let user_id = token_verif.decoded.id
        userStore.setUser((await reqInstance.get('http://localhost:8080/users/'+user_id)).data.data[0])
        console.log(userStore.user)
        //location.href = 'http://localhost:5173/'
    }
    
}
*/
</script>

<style>
.img{
    height: calc(100vh - 80px);
    background: url('../images/cover.jpg');
    background-size: cover;
    background-position: center;
}
</style>