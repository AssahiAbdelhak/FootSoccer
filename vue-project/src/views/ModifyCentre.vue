<template>
  <div class="text-white bg-black ">
        <Navigation />
        <div class="px-20 w-full flex flex-col items-center" style="height : calc(100vh - 84px)">
            <h1 class="text-center mt-28 mb-20 text-5xl">ajoutez un nouveau centre</h1>
            <div class="flex w-full justify-between flex-wrap">
                <Input v-model="centre.nom_centre"  class="w-2/5" title="nom centre" />
                <Input v-model="centre.nb_terrains" type="number" class="w-2/5" title="nombre de terrains" />
                <Input v-model="centre.adr_centre" class="w-2/5" title="adresse" />
                <Input v-model="centre.tarif" class="w-2/5" title="tarif" />
            </div>
            <Error v-if="error" :message="error" />
            <button @click="updateCentre" class="btn" >modifier le centre</button>
        </div>
    </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
import Input from '../components/Input.vue'
import Error from '../components/Error.vue'
import { computed, ref } from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

const router = useRouter()
const error = ref(null)
const props = defineProps(['id'])

const centre = ref((await axios.get('http://localhost:8080/centres/'+props.id+'?filter=nom_centre,nb_terrains,adr_centre,tarif')).data.data[0])
console.log(centre)
const updateCentre = async () => {
    console.log('hello')
    try{
    const res = await axios.create({
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
                }
        }).patch('http://localhost:8080/centres/39',centre.value);
        router.push('/dashboard')
    }catch(e){
        console.log(e)
        error.value = e.message
    }
}



</script>

<style>

</style>