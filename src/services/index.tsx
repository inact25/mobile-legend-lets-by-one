import axios from "axios";

const getAllHeroList = async ()=>{
    const response = await axios.get("https://mapi.mobilelegends.com/hero/list")
    return response.data
}


export {
    getAllHeroList
}
