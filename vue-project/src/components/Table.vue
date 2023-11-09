<template>
  
<div class="relative bg-white text-black px-8 py-4 overflow-x-auto my-5 shadow-md sm:rounded-lg">
    
    <div class="flex w-full items-center justify-between gap-5 mb-8">
        <h1 class=" uppercase text-3xl">{{title}}</h1>
        <SearchBar v-model="value" />
        <router-link v-if="props.possibleAdd" :to="props.preLink+'add/'" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">nouveau centre</router-link>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" v-for="attr in props.attributes" :key="attr" class="px-6 text-center py-3">
                    {{attr}}
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr v-for="elem in dataList" :key="elem[idAttr]" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" v-for="key in Object.keys(elem)" :key="key" class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{elem[key]}}
                </th>
                <td class="px-6 text-center py-4 flex flex-col">
                    <router-link :to="preLink+'modify/'+elem[idAttr]" class="font-medium  text-red-600 dark:text-red-500 hover:underline">modifier</router-link>
                    <button v-if="title != 'users' || elem.role != 'admin'" @click="() => onDelete(elem[idAttr])" class="font-medium  text-red-600 dark:text-red-500 hover:underline">supprimer</button>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>

</template>

<script setup>
import { computed, ref, watch } from "vue"

import SearchBar from "./SearchBar.vue"


const props = defineProps(['attributes','onDelete','onUpdate','preLink','idAttr','title','onFilter','possibleAdd','data'])
console.log('getting new props')
console.log(props.title)
const dataList = computed(() => props.onFilter(props.data,value.value))

const update = (id,title,elem) => {
    
    props.onUpdate(id,title,elem)
}

const value = ref('')


</script>

<style>

</style>