<template>
    <div class="p-4 h-screen ">
        <div>
            <div class="list-date flex items-center justify-between px-4 my-5">
                <span class="fleche cursor-pointer font-bold text-2xl">&lt;</span>
                <span class="date cursor-pointer text-2xl" @click="() => date_param = today">{{today}}</span>
                
                <span class="date text-gray-500 cursor-pointer text-2xl" v-for="day in days" :key="day" @click="() => date_param = day" >
                    {{day}}
                    </span>
                <span class="fleche cursor-pointer font-bold text-2xl">&gt;</span>
            </div>
            <div class="flex justify-end">
                <button  @click="() => optionsTabIsClosed = false" class="bg-blue-500 mt-7 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            PLUS D'OPTIONS
                </button>
            </div>
            <div>
                <div >
                    <ReservationList :dispo="foot.dispo" :heure="foot.heure" v-for="foot in available" :key="foot" />
                </div>
                
            </div>
        </div>
        <div v-if="!optionsTabIsClosed" class=" w-2/3 h-2/3 border z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
            <form class="h-full">
                <div class="border-b-2 text-center py-3 relative">
                    <h1 class="">VOS OPTIONS</h1>
                    <i class="fa-solid fa-xmark absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" @click="() => optionsTabIsClosed = true"></i>
                </div>
                
                <div style="height : 550px;" class="px-8">
                <div class="py-4 flex flex-col gap-3 h-full justify-around">
                    <h2>TYPE TERRAIN : </h2>
                    <div class="flex justify-around items-center">
                        <div>
                            <input type="radio" name="type" id="type-1">
                            <label class="ml-2 mr-6" for="type-1">INTERIEUR</label>
                        </div>
                        <div>
                            <input type="radio" name="type" id="type-2">
                            <label for="type-2"  class="ml-2">EXTERIEUR</label>
                        </div>
                    </div>
                    <h2>HORRAIRE A PARTIR DE : </h2>
                    <div class="flex justify-center items-center gap-2">
                        <span class="fleche cursor-pointer font-bold text-2xl">&lt;</span>
                        <h3 class="border w-11 h-11 p-2 flex items-center justify-center cursor-pointer rounded bg-gray-100"><i class="fa-solid fa-ban"></i></h3>
                        <h3 class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">10H</h3>
                        <h3 class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">11H</h3>
                        <h3 class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">12H</h3>
                        <h3 class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">13H</h3>
                        <h3 class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">14H</h3>
                        <h3 class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">15H</h3>
                        <span class="fleche cursor-pointer font-bold text-2xl">&gt;</span>
                    </div>
                    <button class="bg-blue-500 mt-7 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            APPLIQUER
                    </button>
                </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue'
    import dayjs from 'dayjs'
    import axios from 'axios'
    import ReservationList from '../components/reservationList.vue'

    const days = []
    let available = ref([])
    let today = dayjs().format('DD/MM - ddd')
    for(let i=1; i < 5 ; i++){
        days.push(dayjs().add(i,'days').format('DD/MM - ddd'))
    }
let [id_centre,date] = location.href.split('?')[1].split('&')
    const optionsTabIsClosed = ref(true)
    const date_param = ref(date)
    
    watch(date_param,() => console.log('date changed'))
    
    let allTerrains = await computed((await axios.get('http://localhost:8080/terrains?'+id_centre)).data.data) 
    let response = computed((await axios.get('http://localhost:8080/terrains?'+id_centre+'&'+date_param.value)).data.data)
    const start = dayjs('2023-10-13 15:00:00')
    const duration = 3

console.log(allTerrains.value)
console.log(response.value)

    for(let i = 0 ; i < duration ; i++){
        let obj = {
            heure : start.add(i,'hours').format('HH:mm:ss'),
            dispo : {
                interieur_filme : [],
                interieur_non_filme : [],
                exterieur_filme : [],
                exterieur_non_filme : [],
            }
            
        }
        
        let x = response.value.filter((a) => a.debut == obj.heure)
        for (const ter of allTerrains.value){
            let found = false
            for(const reserved of x){
                if(ter.id_terrain == reserved.id_terrain){
                    found = true
                }
            }
            if(!found){
                if(ter.est_filme && ter.localisation == 'interieur'){
                    obj.dispo.interieur_filme.push(ter)
                }else if(!ter.est_filme && ter.localisation == 'interieur'){
                        obj.dispo.interieur_non_filme.push(ter)
                }else if(ter.est_filme && ter.localisation == 'exterieur'){
                        obj.dispo.exterieur_filme.push(ter)
                }else{
                        obj.dispo.exterieur_non_filme.push(ter)
                }
            }   
        }
        available.value.push(obj)
    }
    console.log(available.value)
</script>

<style>

</style>