<template>
  <div class="bg-black text-white">
    <h1 class="text-center mt-40 uppercase text-3xl my-16">découvrez nos centres <span class="text-red-500">foot soccer</span> présents en france</h1>
    <div class="px-20 flex flex-col gap-8">
        <Centre v-for="center in centers" :key="center.id" :centre="center" :flip="flip = !flip" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Centre from '../components/Centre.vue'
import { onMounted, reactive, toRefs } from 'vue';
import useCenterStore from '../stores/center/center.store.js';

export default {
  name: 'Centres',
  components: {Footer, Centre},

  setup() {
    const centerStore = useCenterStore();
    const state = reactive({
      flip: true,
      centers: [],
    });

    onMounted(async () => {
      state.centers = await centerStore.fetchCenters();
    });

    return {
      ...toRefs(state),
    }
  }
}

</script>