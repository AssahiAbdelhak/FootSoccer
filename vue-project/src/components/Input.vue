<template>
  <div class="mb-20" :class="props.full ? 'w-full' : 'w-1/2'">
    <p class="text-2xl font-light capitalize mb-3">{{props.title}} *</p>
    <select class="input w-full px-5 py-2.5" v-if="props.type == 'select'" :value="modelValue" @input="updateValue" >
        <option v-for="option in props.options" class="bg-black" :key="option" :value="option">{{option}}</option>
    </select>
    <input v-else :value="modelValue" @input="updateValue" class="input w-full px-5 py-2.5 bg-black" :type="props.type ? props.type : 'text' " :placeholder="props.title">
    <router-link v-if="props.help" :to="props.link" class="text-blue-500 text-right mt-3">{{_.capitalize(props.help)}}</router-link>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import _ from 'lodash'
import { ref, watch } from 'vue'
const props = defineProps(["title","help","type","options","modelValue" ,"full",'link'])
const title = ref(_.capitalize(props.title))
const inputValue = ref('')
const emits  = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emits('update:modelValue',event.target.value)

}

watch(inputValue,() => {
  console.log("value changed !!")
  emits('update:model',inputValue.value)
  
})

</script>

<style>

</style>