import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    function setUser(User) {
        user.value = User
    }
    return { user,setUser }
})