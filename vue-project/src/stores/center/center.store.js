import { defineStore } from 'pinia';
import {getCenters, createCenter} from '../center/center.api.js';

const getters = {
    GET_CENTERS: (state) => state.centers,
};

const actions = {
    async fetchCenters() {
        try {
            const centers = await getCenters();
            this.centers = centers;

            return centers;
        } catch (error) {
            throw new Error(error);
        }
    },

    async createCenter({center}){
        console.log(center)
        try {
            const response = await createCenter({center});

            return response;
        } catch (error) {
            console.log("🚀 ~ file: center.store.js:26 ~ createCenter ~ error:", error)
            throw new Error(error);
        }
    }
};

const state = {
    centers: [],
};

const useCenterStore = defineStore('center', {
    state: () => state,
    getters,
    actions,
});

export default useCenterStore;