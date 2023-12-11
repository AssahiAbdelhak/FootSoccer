<template>
  <div class="flex justify-between flex-wrap w-2/5 mb-20">
        <label class="text-2xl font-light mb-3"> <slot></slot> <span class="text-red-600 w-16">*</span> </label>    
        <input 
        v-model="inputValue"  
        class="w-full input px-5 py-2.5 bg-[#222] rounded-md" 
        :type="inputType" 
        :placeholder="placeholder"
        accept="image/png, image/jpeg"
        :min="inputType === 'number' ? 0 : ''"
        :required="required"
        :name="inputName"
        @change="handleInputValue"
    />
  </div>
</template>

<script>
import { reactive, toRefs} from 'vue';
import get from 'lodash/get.js';
import isEqual from 'lodash/isEqual.js';

export default {
    name: 'BaseInput',
    emits: ['onInputValue', 'onUpdateComponent'],
    props: {
        inputType: {
          type: String,
          validator: (value) => ['number', 'date', 'text', 'file'].includes(value),
          required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        required : {
            type: Boolean,
        },
        inputName: {
            type: String,
            required: true,
        }
    },

    setup(props, {emit}){
        const state = reactive({
            inputValue: '',
            myForm: null,
        });

        function handleInputValue(event){
            const type = get(props, 'inputType');
            
            if (isEqual(type, 'file')) {
                const file = get(event.target.files, '0');
                emit('onInputValue', {file});
            }

            emit('onInputValue', state.inputValue);
        }

        return {
            ...toRefs(state),
            handleInputValue,
        }
    }
}
</script>

<style>

</style>