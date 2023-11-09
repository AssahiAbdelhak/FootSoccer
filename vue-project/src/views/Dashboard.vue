<template>
  <div class="text-white div">
    <PopUpFormVue :show="show" :id="id" :updateFunc="updateFunc" :element="element" :attributes="attributes" />
    <div class="div px-20">
      
      <Table title="centres" idAttr="id_centre" :onDelete="deleteCenter" :onUpdate="update" :possibleAdd="true" :onFilter="centresFilter"  :attributes="centreAttributes" preLink="/centres/" :data="centres" />
    </div>
    <div class="px-20">
      <Table title="users" idAttr="id_utilisateur" :onDelete="deleteUser" :onFilter="usersFilter" :attributes="userAttributes" preLink="/users/" :data="users" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import axios from 'axios'
import {useRouter} from 'vue-router'
import Navigation from '../components/navigation.vue'
import PopUpFormVue from "../components/PopUpForm.vue"
import Footer from '../components/Footer.vue'
import Table from '../components/Table.vue'
import { onUpdated, ref, watch } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advanced from 'dayjs/plugin/advancedFormat'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)

const router = useRouter()

let centres = ref((await axios.get('http://localhost:8080/centres?filter=id_centre,nom_centre,adr_centre,nb_terrains,tarif')).data.data)
let centreAttributes = ['id','nom','adresse','nombre de terrains','tarif','actions']
let attributes = ref([])
let users = ref((await axios.get('http://localhost:8080/users?filter=id_utilisateur,date_naiss,nom_complet,email,role,num_tel')).data.data)

console.log(users.value)
let userAttributes = ['id','date de naissance','nom','adresse mél','role','numéro tel','actions']
let show = ref(false)
let element = ref({})
const id = ref(-1)
let updateFunc = ref(null)

onUpdated(() => console.log('view updated'))


//refreshElems()

const centresFilter = (data,search) => {
  return data.filter((a) => a.nom_centre.includes(search))
}
const usersFilter = (data,search) => {
  return data.filter((a) => a.nom_complet.includes(search))
}

const deleteCenter = async (id) => {
  try{
      const res = await axios.create({
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
                }
        }).delete('http://localhost:8080/centres/'+id);
      centres.value = (await axios.get('http://localhost:8080/centres?filter=id_centre,nom_centre,adr_centre,nb_terrains,tarif')).data.data
      
    }catch(e){
        console.log(e)
    }
}
const deleteUser = async (id) => {
  try{
      const res = await axios.create({
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
                }
        }).delete('http://localhost:8080/users/'+id);
      users.value = (await axios.get('http://localhost:8080/users?filter=id_utilisateur,date_naiss,nom_complet,email,role,num_tel')).data.data
      
    }catch(e){
        console.log(e)
    }
}

const updateCenter = async (id,elem) => {
  try{
      console.log(elem.value)
      console.log('updating elem with id == ',id)
      const res = await axios.create({
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
                }
        }).patch('http://localhost:8080/centres/'+id,elem.value);
        
      centres.value = (await axios.get('http://localhost:8080/centres?filter=id_centre,nom_centre,adr_centre,nb_terrains,tarif')).data.data
      
    }catch(e){
        console.log(e)
    }
}

const update = async (idVal,title,elem) => {
  console.log(idVal)
  id.value = idVal
  show.value = true
  element.value = elem
  console.log(element.value)
  if(title == 'users'){
    attributes.value = userAttributes
    updateFunc.value = userUpdate
    delete element.value.id_utilisateur
  }
  if(title == 'centres'){
    updateFunc.value = updateCenter
    attributes.value = centreAttributes
    
    delete element.value.id_centre
  }
  console.log(element.value)
        /*let res = (await axios.create({
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).patch('http://localhost:8080/centres/'+id, object)).data
        console.log(res)
        console.log((await axios.get('http://localhost:8080/centres?filter=id_centre,nom_centre,adr_centre,nb_terrains,tarif')).data.data)
        centres.value = (await axios.get('http://localhost:8080/centres?filter=id_centre,nom_centre,adr_centre,nb_terrains,tarif')).data.data*/
}

</script>

<style>
.div{
  margin-top: 150px;
}
</style>