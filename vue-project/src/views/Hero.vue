<template>
  <div>
    <div class="img p-x-2">
        <div class="flex flex-col justify-center gap-16 items-center h-full ">
            <div class="flex flex-col gap-1 w-full justify-center items-center text-center text-3xl font-bold  tracking-widest leading-loose uppercase">
                <span class="block">FOOTSOCCER</span> 
                <span>c'est 15 centres <i class="fa-solid inline-block fa-warehouse"></i></span> 
                <span>100 terrains <i class="fa-solid fa-futbol"></i></span>
                <span>et 1000 utilisateurs <i class="fa-solid fa-person"></i></span>
                <span>dans toute la france</span>
            </div>
            <form action="/reserve" class="w-3/4">
                <div class="flex flex-col md:flex-row items-center bg-white justify-center">
                    <div style="height: 70px;" class="flex w-full md:w-2/5 justify-center items-center gap-2 h-full ">
                        <i class="fa-solid fa-2xl fa-warehouse"></i>
                        <div class="div">
                            <h3>CENTRE</h3>
                            <select name="id_centre" id="id_centre">
                            <option v-for="centre in centres" :key="centre" :value="centre.id_centre">{{centre.nom_centre}}</option>
                            </select>
                        </div>
                    </div>
                    <div style="height: 70px;" class="flex justify-center w-full md:w-2/5  items-center gap-2 h-full ">
                        <i class="fa-solid fa-calendar-days fa-2xl"></i>
                        <div class="div">
                            <h3>DATE</h3>
                            <input type="date" name="date" id="date"  :value="date_ajd">
                        </div>
                    </div>
                    <button type="submit" style="height: 70px;" class="flex bg-black text-white justify-center items-center w-full h-full md:w-1/5">
                        VOIR LES DISPONIBILITES
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import dayjs from "dayjs"
import { ref } from "vue"
import {useUserStore} from '../stores/user.js'

const userStore = useUserStore()
const centres = (await axios.get('http://localhost:8080/centres')).data.data
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
    }else{
        location.href = 'http://localhost:5173/sign-in'
    }
    
}

</script>

<style>
.img{
    height: calc(100vh - 80px);
    background: url('../images/cover.jpg');
    background-size: cover;
    background-position: center;
}
</style>