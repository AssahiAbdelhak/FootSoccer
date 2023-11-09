<template>
    <div class="text-white bg-black h-screen">
        <div class="px-20 ">
            <h1 class="uppercase text-4xl  mt-40 font-normal text-center mb-20">reservez votre terrain de football en quelques étapes faciles</h1>
            <div class="flex gap-10">
                <div class="w-2/3">
                    <h1 class="border-b-2 py-6">Sélectionnnez {{centre_prop == 'null' ? 'un centre, ' : ''}}une date et une heure</h1>
                    
                    <div class="flex justify-between gap-6 items-center">
                        <div class="flex flex-col w-2/5">
                            <p class="text-2xl font-light capitalize mb-3">Centres *</p>
                            <select class="input mb-8 w-full px-5 py-2.5" v-model="centre_id">
                                <option class="bg-black"  v-for="centre in centres" :key="centre.id_centre" :value="centre.id_centre">{{centre.nom_centre}}</option>
                            </select>
                            <VueDatePicker :min-date="new Date()" :disabled="centre ? false : true" v-model="day" :enable-time-picker="false" ></VueDatePicker>
                        </div>
                        
                        <div class="w-3/5" >
                            <h2 class="my-5">{{day ? dayjs(day).format('dddd D MMMM') : ''}}</h2>
                            <div class="flex flex-wrap justify-between gap-3">

                                <h3 class="w-44 h-12 cursor-pointer flex justify-center items-center border-2" @click="() => hour = av" v-for="av in availablehours" :key="av">{{av}}:00</h3>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="flex flex-col justify-between gap-8 flex-grow">
                    <h1 class="border-b-2 py-6">Détails du service</h1>
                    <div class="flex flex-col gap-4">
                        <h2>match 5vs 5</h2>
                        <h2>{{day ? dayjs(day).format('D MMMM YYYY') : ''}} {{hour ? `à ${hour}:00` : ''}}</h2>
                        <h2>{{centre ? centre.adr_centre.split(' ').slice(0,centre.adr_centre.split(' ').length - 3).join(' ') : ''}} <br />{{centre ? centre.adr_centre.split(' ').slice(centre.adr_centre.split(' ').length - 3).join(' ') : ''}}</h2>
                    </div>
                    <h1>Détails du paiement</h1>
                    <div class="flex justify-between">
                        <h1>Total</h1>
                        <h1>{{centre ? centre.tarif+'$' : ''}}</h1>
                    </div>
                    <router-link to="#" @click="reserver" class="btn text-center" style="width:100%;" >réserver</router-link>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
import Footer from '../components/Footer.vue'
import Input from '../components/Input.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import axios from 'axios'
import { reactive, ref, watch } from 'vue';
import {useRouter} from 'vue-router'
import {useUserStore} from '../stores/user.js'

const userStore = useUserStore()

dayjs.locale('fr')
let indisponibilites,availablehours = ref([])
const props = defineProps(['centre'])
let centre_prop = props.centre.split('=')[1]
console.log(typeof centre_prop)
let centre_id = ref(centre_prop == 'null' ? '' : centre_prop)
let day = ref('')
let hour = ref('')
let centre = ref(null)
const router = useRouter()

let centres = (await axios.get('http://localhost:8080/centres?filter=nom_centre,id_centre,tarif,adr_centre')).data.data
centre.value = centres.filter((a) => a.id_centre == centre_id.value)[0]


let generate = (x,y) => {
    let arr =[]
    for(let i =x ; i <= y ; i++)
        arr.push(i)
    return arr
}
watch(centre_id,async () => {
    centre.value = centres.filter((a) => a.id_centre == centre_id.value)[0]
})
watch([day,centre_id],async () => {
    if(day.value){
        indisponibilites = (await axios.get('http://localhost:8080/reservation/terrain/'+centre_id.value+'?date='+dayjs(day.value).format('YYYY-MM-DD')+'&filter=debut')).data.data.map(
            (a) => a['debut']);
        let min = dayjs(day.value).format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD') ? Number(dayjs().format('HH'))+1 : 10
        console.log(dayjs(day.value).format('YYYY-MM-DD') )
        console.log(dayjs().format('YYYY-MM-DD'))
        console.log(min)
        console.log(indisponibilites)
        console.log(availablehours.value)
        availablehours.value = generate(min,20).filter((a) => indisponibilites.indexOf(a) == -1)
        console.log(availablehours.value)
    }
    console.log('day updated...')

})

const reserver = async () => {
    if(hour.value == '')
        return 
    console.log('pass')
    const id_resa = (await axios.post('http://localhost:8080/reservation/terrain',{
        id_centre : centre_id.value,
        date : dayjs(day.value).format('YYYY-MM-DD'),
        debut : hour.value
    })).data.id_resa

    const res = (await axios.post('http://localhost:8080/reservation/joueur',{
        id_resa,
        id_utilisateur : userStore.user.id_utilisateur,
    })).data
    router.push('/')
}


    /*try{
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
    */
</script>

<style>

</style>