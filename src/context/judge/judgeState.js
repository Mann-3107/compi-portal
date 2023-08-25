import judgeContext from "./judgeContext";
import { useState } from "react";
import Axios from "axios";

const JudgeState = (props) => {
    const host = "http://127.0.0.1:8000";
    const [judgeComp, setJudgeComp] = useState([]);

    const getJudgeDetails = () => {
        const url = `${host}/judgedetails/`;
        Axios.post(url, {
            "judge": localStorage.getItem("token"),
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => setJudgeComp(res.data))
        .catch((error) => console.error(error))
    };

    return (
        <judgeContext.Provider value={{ judgeComp, getJudgeDetails }}>
            {props.children}
        </judgeContext.Provider>
    );
};

export default JudgeState;
