import parameterContext from "./parameterContext";
import { useState } from "react";
import Axios from "axios";

const ParameterState = (props) => {
    const host = "http://127.0.0.1:8000"
    const [parameters, setParameters] = useState([])
    
    const getParameters = async (comp_id) => {
        let url = `${host}/parameters/`;
        Axios.post('http://127.0.0.1:8000/parameters/', {"competition": comp_id}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => setParameters(res.data))
        .catch(err => console.error(err))
    }

    return(
        <parameterContext.Provider value={{ parameters, getParameters }}>
            {props.children}
        </parameterContext.Provider>
    )
}

export default ParameterState