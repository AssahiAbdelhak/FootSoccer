<template>
    <div class="p-4 h-screen ">
        <div>
            <div class="list-date flex items-center justify-between px-4 my-5">
                <span class="fleche cursor-pointer font-bold text-2xl">&lt;</span>
                <span class="date cursor-pointer text-2xl" @click="() => date_param = date">{{today}}</span>
                
                <span class="date text-gray-500 cursor-pointer text-2xl" v-for="day in days" :key="day" @click="() => date_param = day[1]" >
                    {{day[0]}}
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
                    <ReservationList :dispo="foot.dispo" :day="date_param" :heure="foot.heure" v-for="foot in available" :key="foot" />
                    
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
                        <div @click="() => type='interieur'" >
                            <input type="radio" name="type" id="type-1">
                            <label class="ml-2 mr-6" for="type-1">INTERIEUR</label>
                        </div>
                        <div @click="() => type='exterieur'">
                            <input type="radio" name="type" id="type-2">
                            <label for="type-2"  class="ml-2">EXTERIEUR</label>
                        </div>
                    </div>
                    <h2>HORRAIRE A PARTIR DE : </h2>
                    <div class="flex justify-center items-center gap-2">
                        <span class="fleche cursor-pointer font-bold text-2xl">&lt;</span>
                        <h3  class="border w-11 h-11 p-2 flex items-center justify-center cursor-pointer rounded bg-gray-100"><i class="fa-solid fa-ban"></i></h3>
                        <h3 @click="() => startFrom=15" class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">15H</h3>
                        <h3 @click="() => startFrom=16" class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">16H</h3>
                        <h3 @click="() => startFrom=17" class="border w-11 p-2 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100">17H</h3>
                        <span class="fleche cursor-pointer font-bold text-2xl">&gt;</span>
                    </div>
                    <button @click="appliquerFilter" class="bg-blue-500 mt-7 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            APPLIQUER
                    </button>
                </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUpdated, ref, watch, watchEffect,  } from 'vue'
    import dayjs from 'dayjs'
    import axios from 'axios'
    import ReservationList from '../components/reservationList.vue'

    try{
        (await axios.create({
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).get('http://localhost:8080/decode_jwt')).data.decoded.id
    }catch(e){
        location.href = 'http://localhost:5173/sign-in'
    }

    const type = ref(null)
    const startFrom = ref(null)

    let [id_centre,date] = location.href.split('?')[1].split('&')
    date = date.split('=')[1]

    const days = []
    let available = ref([])
    let today = dayjs(date).format('DD/MM - ddd')
    for(let i=1; i < 5 ; i++){
        days.push([dayjs(date).add(i,'days').format('DD/MM - ddd'),dayjs(date).add(i,'days').format('YYYY-MM-DD')])
    }
    console.log(days)
    
    const optionsTabIsClosed = ref(true)
    const date_param = ref(date)
    let save = []
    const load_disponibilite = async () => {
        available.value = []
        console.log('date_param')
        console.log(date_param.value)
    let allTerrains =  (await axios.get('http://localhost:8080/terrains?'+id_centre)).data.data
    let response = (await axios.get('http://localhost:8080/terrains?'+id_centre+'&date='+date_param.value)).data.data
    const start = dayjs('2023-10-13 15:00:00')
    const duration = 3

    for(let i = 0 ; i < duration ; i++){
        let obj = {
            heure : start.add(i,'hours').format('HH'),
            dispo : {
                interieur_filme : [],
                interieur_non_filme : [],
                exterieur_filme : [],
                exterieur_non_filme : [],
            }
            
        }
        
        let x = response.filter((a) => a.debut == obj.heure)
        for (const ter of allTerrains){
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
        save = available.value
    }
    }

    const appliquerFilter = () => {
        available.value = save
        if(type.value != null){
            available.value = available.value.filter(a => a.dispo[type.value+'_filme'].length > 0 || a.dispo[type.value+'_non_filme'].length > 0)
        }else if(startFrom.value != null){
            available.value = available.value.filter(a => a.heure.split(':')[0]>=startFrom.value)
        }else{
            console.log('no')
        }
        optionsTabIsClosed.value = true
    }

    watch(date_param,() => load_disponibilite())
    onMounted(() => load_disponibilite())
    
</script>

<style>

</style>