<template>
  <div class="bg-red-500 h-screen flex flex-col justify-center gap-5 p-10">
    <h1>Details de la réservations</h1>
    <h2> <i class="fa-solid inline-block fa-warehouse"></i> {{centre}}</h2>
    <h2> <i class="fa-solid inline-block fa-calendar-days"></i> {{d}} - {{h}}h</h2>
    <h2><i class="fa-regular fa-clock"></i>1 heure</h2>
    <button @click="reserve" class="bg-blue-500 mt-3 ml-auto mr-0 w-fit items-end mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Payer 5$
    </button>
    <div class="flex items-center">
        <h2>invite tes amis par : </h2>
        <button @click="sendSMS" class="bg-blue-500 mt-3 ml-10 mr-10 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            SMS
        </button>
        <button @click="sendWhatsappMessage" class="bg-blue-500 mt-3 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Whatsapp
        </button>
        <a href="https://api.whatsapp.com/send?phone=33605855334&text=Hi">Send Message</a>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import dayjs from "dayjs"

let [id_terrain,heure,date] = location.href.split('?')[1].split('&')
let id = id_terrain.split('=')[1]
let h = heure.split('=')[1].substring(0,2)
let d = dayjs(date.split('=')[1]).format('dd DD/MM')
let id_c = (await axios.get('http://localhost:8080/terrains/'+id)).data.data[0].id_terrain
let centre = (await axios.get('http://localhost:8080/centres/'+id_c)).data.data[0].nom_centre
let id_user
try{
id_user = (await axios.create({
    headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
    }).get('http://localhost:8080/decode_jwt')).data.decoded.id
}catch(e){
    location.href = 'http://localhost:5173/sign-in'
}
const reserve = async () => {
  const res = await axios.post('http://localhost:8080/reservation/terrain?id_terrain='+id+'&date='+date.split('=')[1]+'&debut='+heure.split('=')[1]+'&duree=1')
  console.log(res.data)
  await axios.post('http://localhost:8080/reservation/joueur?id_resa='+res.data.id_resa+'&id_utilisateur='+id_user)
}

const sendSMS = async () => {
    const number = prompt('saisir numero de telephone : ')
    await axios.post('http://localhost:8080/send/sms',{
        destinataire : '+33'+number.substring(1,11),
        message : `votre ami vous invite au matche prévu le ${d} ${h}h à ${centre}`
    })
}
const sendWhatsappMessage = async () => {
    const number = prompt('saisir numero de telephone : ')
    await axios.post('http://localhost:8080/send/whatsapp',{
        destinataire : '+33'+number.substring(1,11),
        message : `votre ami vous invite au matche prévu le ${d} ${h}h à ${centre}`
    })
}

</script>

<style>

</style>