<template>
  <button 
    :disabled="disabled"
    :class="disabled ? `${buttonStyle} cursor-not-allowed` : buttonStyle"
    @click="onClick"
    >
        <slot></slot>
    </button>
</template>

<script>
import {computed, reactive, toRefs} from 'vue';
import get from 'lodash/get.js';

export default {
    name: 'BaseButton',
    props: {
        buttonType : {
            type: String,
            validator: (value) => ['primary', 'secondary', 'tertiary'].includes(value)
        },
        disabled : {
            type: [Boolean, Number],
            default: false
        },
        onClick : {
            type : Function
        }
    },

    setup(props){
        const state = reactive({
            buttonStyle: computed(() => {
                const defaultStyle = 'font-light uppercase text-2xl w-fit px-8 py-3 rounded-md';
                const propsValue = get(props, 'buttonType');
                switch (propsValue) {
                    case 'primary':
                        const primaryStyle = `${defaultStyle} bg-red-500`;
                        return primaryStyle;
                    case 'secondary':
                        const secondaryStyle = `${defaultStyle} bg-orange-400`;
                        return secondaryStyle;
                    case 'tertiary':
                        const tertiaryStyle = `${defaultStyle} bg-gray-50 text-[#222]`;
                        return tertiaryStyle;                
                    default:
                        return `${defaultStyle} bg-red-500`;
                }
            })
        });

        return {
            ...toRefs(state),
        }
    }
}
</script>