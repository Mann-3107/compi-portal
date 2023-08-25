import scoreContext from "./scoreContext";
import { useState } from "react";
import Axios from "axios";

const ScoreState = (props) => {
    const host = "http://127.0.0.1:8000";
    const [judgeScores, setJudgeScores] = useState([]);
    const [scores, setScores] = useState([]);

    const getJudgeScores = () => {
        const url = `${host}/judgescores/`
        Axios.get(url)
        .then(res => setJudgeScores(res.data))
        .catch(err => console.error(err))
    }

    const enterJudgeScore = ( compi_id, participant_id, judge_id, judge_total_score ) => {
        const url = `${host}/judgescores/`
        console.log("entering judge score into the db");
        Axios.post(url, {
            "competition": compi_id,
            "participant": participant_id,
            "judge": judge_id,
            "judge_total_score": judge_total_score
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res => setJudgeScores(judgeScores.concat(res.data)))
        .catch(err => console.error(err))
    }

    const getScores = () => {
        const url = `${host}/getscores/`
        Axios.get(url)
        .then(res => setScores(res.data))
        .catch(err => console.error(err))
    }

    return(
        <scoreContext.Provider value={{ judgeScores, getJudgeScores, scores, getScores, enterJudgeScore }}>
            {props.children}
        </scoreContext.Provider>
    )
}

export default ScoreState