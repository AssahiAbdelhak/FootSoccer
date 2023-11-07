import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    if(localStorage.getItem("user"))
        user.value = JSON.parse(localStorage.getItem("user"))
    function setUser(User) {
        console.log('setting user equal ...')
        console.log(User)
        user.value = User
        localStorage.setItem('user',JSON.stringify(user.value))
    }
    return { user,setUser }
})