import axios from "axios"
import hostName from "./domain"

    const isAuth = async () => {
        try{
            await axios.get(hostName+'/auth',{withCredentials : true})
             return true
        }
        catch(err){
            console.log(err);
            
           return false;
        }
    }
     
    export default isAuth
