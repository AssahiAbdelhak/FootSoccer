<template>
    <div class="body flex flex-col bg-red-300">
        <Hero />
        <Citation />
        <div id="about" class="flex flex-col items-center py-16 lg:items-start lg:flex-row justify-between px-20 bg-black">
            <div class="image w-2/5" style="height: 500px;">
                
            </div>
            
            <div class="w-2/5"> 
                <h1 class="uppercase text-4xl  text-gray-600">à propos</h1>
                <h1 class="text-5xl text-white uppercase font-bold my-9">foot soccer</h1>
                <p class="text-white text-base font-normal uppercase">FOOT SOCCER est dédié à rendre le football accessible à tous les passionnés de Lyon. Notre mission est de fournir des terrains de qualité pour des parties mémorables.</p>
            </div>
        </div>
        <div id="testimonial" class="tem py-16 px-20 w-screen">
            <h1 class="text-5xl text-center uppercase mb-32">des témoignages</h1>
            <div class="flex flex-col gap-16">
                <Temoignage />
                <Temoignage />
                <Temoignage />
            </div>
        </div>       
        <div id="contact" class="contact bg-black flex justify-between px-20 py-16">
            <div class="flex flex-col font-light text-sm gap-10 w-2/5">
                <h1 class="uppercase text-4xl font-bold">foot soccer</h1>
                <div>
                    <p>11 allee droits de l'homme</p>
                    <p>69500 Bron,France</p>
                </div>
                <p>Tél : 01 23 45 67 89</p>
                <p>Fax : 01 23 45 67 89</p>
                <p>info@footsoccer.fr</p>
                <div class="flex justify-between">
                    <i class="fa-brands fa-facebook-f fa-2xl"></i>
                    <i class="fa-brands fa-x-twitter fa-2xl"></i>
                    <i class="fa-brands fa-instagram fa-2xl"></i>
                    <i class="fa-brands fa-youtube fa-2xl"></i>
                </div>
            </div>
            <div class="w-2/5 flex flex-col gap-8">
                <h1 class="uppercase text-4xl font-bold">contact</h1>
                <input v-model="obj.nom" class="input" type="text" placeholder="Nom">
                <input v-model="obj.email" class="input" type="email" placeholder="E-mail">
                <input v-model="obj.tel" class="input" type="tel" placeholder="Téléphone">
                <textarea v-model="obj.message" class="input" placeholder="Message" name="message" id="" cols="30" rows="10"></textarea>
                <button class="btn" @click="envoyer">envoyer</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
import Hero from '../components/Hero.vue'
import Citation from '../components/citation.vue'
import Temoignage from '../components/temoignage.vue'
import Footer from '../components/Footer.vue'
import {sendEmail} from '../utils/fonctions.js'
import { useUserStore } from '../stores/user'
import { ref, watch } from 'vue'

const userStore = useUserStore()
const obj = ref({
    nom : '',
    email : '',
    tel :'',
    message : ''
})


const envoyer = () => {
    sendEmail('template_kmmr326',{
        to : 'footsoccerabdelhak@gmail.com',
        message : `
        Hello Adelhak
        You have received a contact demand from ${obj.value.nom}
        He left you this message : ${obj.value.message}
        you can reach him by his email : ${obj.value.email} or hin phone number : ${obj.value.tel}
        Kind regards,
        `
    })
}
</script>

<style>
.image{
    background: url(../images/pitch.jpg);
    background-position: center;
    background-size: cover;
}
.body{
    background: url(../images/players.jpg) #D53B46;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    background-color: #D53B46;
    color: white;
}
.tem{
    background-color: #d53b456b;
}
</style>