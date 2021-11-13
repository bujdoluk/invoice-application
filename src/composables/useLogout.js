import { ref } from "vue"
import { projectAuth } from '../firebase/config'

const errorLogout = ref(null)

const logout = async () => {
    errorLogout.value = null
    try {
        await projectAuth.signOut();
    } catch (err) {
        console.log(err.message)
        errorLogout.value = err.message
    }
}

const useLogout = () => {
    return { logout, errorLogout }
}

export default useLogout