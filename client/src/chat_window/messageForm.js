import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const MessageForm = () => {
    const [message, setMessage] = useState("")
    const {groupID, subgroupID} = useParams()

    function handleSubmit(e){
        e.preventDefault()
        axios({
            method: 'post',
            url: "http://localhost:5000/send",
            data: {
                groupID: groupID,
                subgroupID: subgroupID,
                message: message
            },
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            setMessage("")
        })
        .catch((error) => {console.log(error)})
    }

    return ( 
    <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={ message } onChange={ (e) => setMessage(e.target.value) }></input>
        <input type="submit" value="Mandar mensaje"></input>
    </form>
    );
}
 
export default MessageForm;