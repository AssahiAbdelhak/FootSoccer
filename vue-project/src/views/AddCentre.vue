<template>
  <div class="text-white bg-[#222] ">
        <div class="px-20 w-full flex flex-col items-center">
            <h1 class="text-center mt-28 mb-20 text-5xl">ajoutez un nouveau centre</h1>
            <form ref="myForm">
                <div class="flex w-full justify-between flex-wrap">
                    <BaseInput :required="true" inputType="text" placeholder="Nom de votre centre" @on-input-value="handleInputCenterName" inputName="name"> 
                        Nom du centre 
                    </BaseInput>
                    <BaseInput :required="true" inputType="number" placeholder="Numéro de voie" @on-input-value="handleInputAddrNumber" inputName="address_num"> 
                            Numéro de la voie
                    </BaseInput>
                    <BaseInput :required="true" inputType="number" placeholder="Votre code postal" @on-input-value="handleInputZipCode" inputName="zipcode"> 
                        Code Postal
                    </BaseInput>
                    <BaseInput :required="true" inputType="number" placeholder="Tarif de location" @on-input-value="handleInputAmount" inputName="location_amount"> 
                            Tarif
                    </BaseInput>
                    <BaseInput :required="true" inputType="number" placeholder="Nombre de terrain(s)" @on-input-value="handleInputPitchNumber" inputName="nb_of_pitch"> 
                        Nombre de terrain(s)
                    </BaseInput>
                    <BaseInput :required="true" inputType="text" placeholder="Nom de la rue" @on-input-value="handleInputAddrName" inputName="address_name"> 
                            Nom de votre rue
                    </BaseInput>
                    <BaseInput :required="true" inputType="text" placeholder="Votre commune de résidence" @on-input-value="handleInputCity" inputName="city"> 
                            Nom de la commune
                    </BaseInput>
                    <Input v-model="center.file" :type="'file'" class="w-2/5" title="choisir une image" />
                    <!--<BaseInput :required="true" inputType="file" placeholder="importer votre image" inputName="picture"> 
                            Importer une image
                    </BaseInput>-->
                </div>
                <!-- <div class="flex w-full justify-between flex-wrap">
                    <Input v-model="object.nom_centre"  class="w-2/5" title="nom du centre" />
                    <Input v-model="object.nb_terrains" type="number" :min="1" class="w-2/5" title="nombre de terrains" />
                    <Input v-model="n_voie" class="w-2/5" type="number" :min="1" :max="100" title="numéro de la rue" />
                    <Input v-model="nom_rue" class="w-2/5" title="nom de la rue" />
                    <Input v-model="cp" class="w-2/5"  :min="10000" :max="99999" type="number" title="code postale" />
                    <Input v-model="nom_commune" class="w-2/5" title="nom de la commune" />
                    <Input v-model="object.tarif" class="w-2/5" :min="0" title="tarif" />
                    <Input v-model="image" :type="'file'" class="w-2/5" title="choisir une image" />
                </div>
                <Error v-if="error" :message="error" />
                <button 
                    @click="addCentre" 
                    :class="hasEmptyValue ? 'font-light uppercase text-3xl bg-red-300 w-fit px-8 py-3 rounded-lg cursor-not-allowed' : 'font-light uppercase text-3xl bg-red-500 w-fit px-8 py-3 rounded-lg'"
                    :disabled="hasEmptyValue ? 'disable' : ''"
                    >
                        ajouter le centre
                    </button> -->

            </form>
                <BaseButton button-type="tertiary" :onClick="addCenter" :disabled="hasEmptyValue">Ajouter le centre</BaseButton>
        </div>
    </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import {useRouter} from 'vue-router';
import some from 'lodash/some.js';
import map from 'lodash/map.js';
import Navigation from '../components/navigation.vue';
import Input from '../components/Input.vue';
import Error from '../components/Error.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import useCenterStore from '../stores/center/center.store';
import axios from 'axios';

export default {
    name: 'AddCentre',
    components : {
        Navigation,Input,Error,BaseButton,BaseInput
    },

    setup(){
        const router = useRouter()
        const state = reactive({
            error : null,
            adresse : computed(() => `${state.center.num_voie} ${state.center.nom_adresse} ${state.center.code_postal} ${state.center.commune},France`),
            myForm: null,
            center : {
                nombre_centre : 0,
                tarif : 0,
                code_postal : 0,
                commune : '',
                num_voie : 0,
                nom_centre : '',
                nom_adresse : '',
                file : null,
            },
            hasEmptyValue : computed(() => some(state.center, (value) => {
                if(value === '' || value === 0 || value === null){
                    console.log(value)
                    return true
                }
            })),
        });
        const centerStore = useCenterStore()

        async function addCenter () {
            const data = new FormData(state.myForm);
            for (const key of data.keys()) {
                console.log("🚀 ~ file: AddCentre.vue:105 ~ addCenter ~ key:", `${key} => ${data.get(key)}`);
            }
            let bodyFormData = new FormData()
            bodyFormData.append('nom_centre', state.center.nom_centre);
            bodyFormData.append('adr_centre', state.adresse);
            bodyFormData.append('nb_terrains', state.center.nombre_centre);
            bodyFormData.append('tarif', state.center.tarif);
            bodyFormData.append('image', state.center.file);
            try{
                const res = await axios.create({
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                        }
                }).post('http://localhost:8080/centres',bodyFormData);
                router.push('/dashboard')
            }catch(e){
                console.log(e)
                //error.value = e.message
            }

        }

        function onFileChange(e) {
            //state.image = get(e.target.files[0], 'name');
        }

        function handleInputCenterName(inputValue) {
            state.center.nom_centre = inputValue;
        }

        function handleInputAddrNumber(inputValue) {
            state.center.num_voie = inputValue;
        }

        function handleInputAddrName(inputValue) {
            state.center.nom_adresse = inputValue;
        }

        function handleInputAmount(inputValue) {
            state.center.tarif = inputValue;
        }

        function handleInputCity(inputValue) {
            state.center.commune = inputValue;
        }

        function handleInputPitchNumber(inputValue) {
            state.center.nombre_centre = inputValue;
        }

        function handleInputZipCode(inputValue) {
            state.center.code_postal = inputValue;
        }

        function handleInputFile(e) {
            if(e.file)
                state.center.file = e.file;
            console.log("🚀 ~ file: AddCentre.vue:134 ~ handleInputFile ~ state.center.file:", state.center.file);
        }

        return {
            ...toRefs(state),
            router,
            onFileChange,
            handleInputCenterName,
            handleInputAddrNumber,
            handleInputAddrName,
            handleInputAmount,
            handleInputCity,
            handleInputPitchNumber,
            handleInputZipCode,
            handleInputFile,
            addCenter
        }
        
        
      /*  const error = ref(null)
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

        const addCentre = async () => {
            console.log('click')
            error.value = null
            if(object.value.nom_centre == ""){
                error.value = "Veuillez saisir le nom de votre centre"
                return;
            }else if(object.value.nb_terrains == ""){
                error.value = "Veuillez saisir le nombre de terrains de votre centre"
                return;
            }else if(n_voie.value == ""){
                error.value = "Veuillez saisir le numéro de la rue de votre centre"
                return;
            }else if(nom_rue.value == ""){
                error.value = "Veuillez saisir le nom de la rue "
                return;
            }else if(cp.value == ""){
                error.value = "Veuillez saisir le code postale"
                return;
            }else if(nom_commune.value == ""){
                error.value = "Veuillez saisir le nom de la commune"
                return;
            }else if(object.value.tarif == ""){
                error.value = "Veuillez saisir le tarif"
                return;
            }else if(image.value == null){
                error.value = "Veuillez insérer une image"
                return;
            }

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

        const center = ref({
            nombre_centre : 0,
            tarif : 0,
            code_postal : 0,
            commune : '',
            num_voie : 0,
            nom_centre : '',
            nom_adresse : '',
            file : null,
        });

        const hasEmptyValue = computed(() => {
            return some(center.value, (value) => value === '' || value === 0 || value === null)
        });

        const onFileChange = (e) => {
        image.value = e.target.files[0]
        console.log(image.value)
        }

        const handleInputCenterName = (inputValue) => {
            center.value.nom_centre = inputValue;
        }

        const handleInputAddrNumber = (inputValue) => {
            center.value.num_voie = inputValue;
        }

        const handleInputAddrName = (inputValue) => {
            center.value.nom_adresse = inputValue;
        }

        const handleInputAmount = (inputValue) => {
            center.value.tarif = inputValue;
        }

        const handleInputCity = (inputValue) => {
            center.value.commune = inputValue;
        }

        const handleInputPitchNumber = (inputValue) => {
            center.value.nombre_centre = inputValue;
        }

        const handleInputZipCode = (inputValue) => {
            center.value.code_postal = inputValue;
        }

        const handleInputFile = (inputValue) => {
            center.value.file = inputValue;
        }*/
    }
}


</script>