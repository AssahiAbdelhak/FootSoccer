<template>
<div>
    <button id="dropdownDefaultButton" @click="active = !active" data-dropdown-toggle="dropdown" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{{props.title}} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdown" class="absolute z-10 block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" :class="active ? 'block' : 'hidden'">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" v-for="opt in props.options" :key="opt" aria-labelledby="dropdownDefaultButton">
        <li>
            <router-link :to=opt.lien class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{opt.titre}}</router-link>
        </li>
        
        </ul>
    </div>
</div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps(['title','options'])
const active = ref(false)

watch(active, () => console.log('active updated'))

</script>