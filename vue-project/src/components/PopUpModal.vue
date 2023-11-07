<template>
 <div class="">

<!-- Main modal -->
<div id="authentication-modal" tabindex="-1" aria-hidden="true" :class="props.show ? 'flex' : 'hidden'" class="modal-container fixed top-0 left-0 right-0 bottom-0 h-screen z-50 justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-black text-white rounded-lg shadow dark:bg-gray-700">
            <button @click="props.onClose" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-white ">Modifier votre information</h3>
                <form class="space-y-6" @submit.prevent="updateValues" >
                    <div>
                        <Input v-model="val" :title='props.title' :full="true" :type="props.inputType" :options="props.options" />
                    </div>
                    
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
                    
                </form>
            </div>
        </div>
    </div>
</div> 
</div> 
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import Input from './Input.vue'
import MyAxios from '../utils/Axios.js'
import {useUserStore} from '../stores/user'
import axios from "axios";

const props = defineProps(['show','onClose','title','inputType','options','dbAttr'])
const userStore = useUserStore()
const val = ref('')

watch(props,() => val.value = '')


const updateValues = async () => {
    let obj = {}
    obj[props.dbAttr] = val.value
    console.log(obj)
    const data = (await axios.create({
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
            }
    }).patch('http://localhost:8080/users/'+userStore.user.id_utilisateur, obj)).data.user
    console.log(data)
    userStore.setUser(data)
    val.value = 'hi'
    props.onClose()
}
</script>

<style>
.modal-container{
    background: rgba(114, 113, 113, 0.473);
}
</style>