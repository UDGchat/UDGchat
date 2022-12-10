import axios from "axios"

export const fetchUser = async () => {
    const { data } = await axios({
        method: 'get',
        url: "http://localhost:5000/user",
        withCredentials: true
    } ).catch(error => {
        return error
    })
    return await data
}