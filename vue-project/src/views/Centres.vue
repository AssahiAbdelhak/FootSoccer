<template>
  <div class="bg-black text-white">
    <h1 class="text-center mt-40 uppercase text-3xl my-16">découvrez nos centres <span class="text-red-500">foot soccer</span> présents en france</h1>
    <div class="px-20 flex flex-col gap-8">
        <Centre v-for="centre in centres" :key="centre.id" :centre="centre" :flip="flip = !flip" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
import Footer from '../components/Footer.vue'
import Centre from '../components/Centre.vue'
import axios from 'axios'

const flip=true

const centres = (await axios.get('http://localhost:8080/centres')).data.data


</script>

<style>


</style>