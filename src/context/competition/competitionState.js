import competitionContext from "./competitionContext";
import { useState } from "react";
import Axios from "axios";

const CompetitionState = (props) => {
    const host = "http://127.0.0.1:8000"
    const [competitions, setCompetitions] = useState([]);
    
    const getCompetitions = () => {
        let url = `${host}/getcompetitions/`;
        Axios.get(url).then(res => setCompetitions(res.data))
        .catch(err => console.error(err))
    }

    return(
        <competitionContext.Provider value={{ competitions, getCompetitions }}>
            {props.children}
        </competitionContext.Provider>
    )
}

export default CompetitionState