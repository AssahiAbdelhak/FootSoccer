<template>
  <div class="text-white bg-black ">
        <div class="px-20 w-full flex flex-col items-center" style="height : calc(100vh - 84px)">
            <h1 class="text-center mt-28 mb-20 text-5xl">ajoutez un nouveau centre</h1>
            <div class="flex w-full justify-between flex-wrap">
                <Input v-model="object.nom_centre"  class="w-2/5" title="nom centre" />
                <Input v-model="object.nb_terrains" type="number" class="w-2/5" title="nombre de terrains" />
                <Input v-model="n_voie" class="w-2/5" type="number" title="numéro de voie" />
                <Input v-model="nom_rue" class="w-2/5" title="nom de la rue" />
                <Input v-model="cp" class="w-2/5" type="number" title="code postale" />
                <Input v-model="nom_commune" class="w-2/5" title="nom de la commune" />
                <Input v-model="object.tarif" class="w-2/5" title="tarif" />
                <Input v-model="image" :type="'file'" class="w-2/5" title="choisir une image" />
            </div>
            <Error v-if="error" :message="error" />
            <button @click="addCentre" class="btn" >ajouter le centre</button>
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
const n_voie=ref('')
const nom_rue=ref('')
const cp=ref('')
const nom_commune=ref('')
const image = ref(null)

const adresse = computed(() => `${n_voie.value} ${nom_rue.value} ${cp.value} ${nom_commune.value},France`)
const object = ref({
    nom_centre : '',
    nb_terrains : '',
    tarif : '',
})

const onFileChange = (e) => {
  image.value = e.target.files[0]
  console.log(image.value)
}

const addCentre = async () => {
    try{
        console.log({...object.value,adr_centre :  adresse})
        let bodyFormData = new FormData();
        bodyFormData.append('nom_centre', object.value.nom_centre);
        bodyFormData.append('adr_centre', adresse.value);
        bodyFormData.append('nb_terrains', object.value.nb_terrains);
        bodyFormData.append('tarif', object.value.tarif);
        bodyFormData.append('image', image.value);
        console.log(bodyFormData)
        const res = await axios.create({
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
            }).post('http://localhost:8080/centres',bodyFormData);
            router.push('/dashboard')
        }catch(e){
            console.log(e)
            error.value = e.message
        }
}



</script>

<style>

</style>