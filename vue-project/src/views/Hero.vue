<template>
  <div>
    <div class="img p-x-2">
        <div class="flex flex-col justify-center gap-16 items-center h-full ">
            <div class="flex flex-col gap-1 w-full justify-center items-center text-center text-3xl font-bold  tracking-widest leading-loose uppercase">
                <span class="block">FOOTSOCCER</span> 
                <span>c'est 15 centres <i class="fa-solid inline-block fa-warehouse"></i></span> 
                <span>100 terrains <i class="fa-solid fa-futbol"></i></span>
                <span>et 1000 utilisateurs <i class="fa-solid fa-person"></i></span>
                <span>dans toute la france</span>
            </div>
            <form action="/reserve" class="w-3/4">
                <div class="flex flex-col md:flex-row items-center bg-white justify-center">
                    <div style="height: 70px;" class="flex w-full md:w-2/5 justify-center items-center gap-2 h-full ">
                        <i class="fa-solid fa-2xl fa-warehouse"></i>
                        <div class="div">
                            <h3>CENTRE</h3>
                            <select name="centre" id="id_cente">
                            <option value="1">Parilly</option>
                            <option value="5">Lyon</option>
                            <option value="7">Le Mans</option>
                            </select>
                        </div>
                    </div>
                    <div style="height: 70px;" class="flex justify-center w-full md:w-2/5  items-center gap-2 h-full ">
                        <i class="fa-solid fa-calendar-days fa-2xl"></i>
                        <div class="div">
                            <h3>DATE</h3>
                            <input type="date" name="date" id="date"  value="2023-10-12">
                        </div>
                    </div>
                    <button type="submit" style="height: 70px;" class="flex bg-black text-white justify-center items-center w-full h-full md:w-1/5">
                        VOIR LES DISPONIBILITES
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.img{
    height: calc(100vh - 80px);
    background: url('../images/cover.jpg');
    background-size: cover;
    background-position: center;
}
</style>