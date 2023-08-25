import participantContext from "./participantContext";
import { useState } from "react";
import Axios from "axios";

const ParticipantState = (props) => {
    const host = "http://127.0.0.1:8000"
    const [participants, setParticipants] = useState([])
    
    const getParticipants = async (comp_id) => {
        let url = `${host}/participants/`;
        Axios.post(url, {"competition": comp_id}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => setParticipants(res.data))
        .catch(err => console.error(err))
    }

    return(
        <participantContext.Provider value={{ participants, getParticipants }}>
            {props.children}
        </participantContext.Provider>
    )
}

export default ParticipantState