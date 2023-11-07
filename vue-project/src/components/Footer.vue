<template>
  <div class="text-white bg-black px-20 py-16 flex flex-col">
    <div class="flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between">
        <h1 class="text-red-500 uppercase text-3xl">foot soccer</h1>
        <div class="lg:w-1/2 w-full">
            <h1 class="text-3xl capitalize mb-10">liens rapides</h1>
            <div class="flex justify-between uppercase ">
                <router-link to="/" class="hover:text-red-500">accueil</router-link>
                <a href="/#about" class="hover:text-red-500">a propos</a>
                <router-link to="/centres" class="hover:text-red-500">centres</router-link>
                <router-link to="/reservation/centre=null" class="hover:text-red-500">reservation</router-link>
                <a href="/#contact" class="hover:text-red-500">contact</a>
            </div>
        </div>
    </div>
    <h1 class="mt-16 text-center uppercase">fait avec ❤️ par l'équipe <span>foot soccer</span></h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>