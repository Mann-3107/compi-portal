import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import scoreContext from "../../context/scores/scoreContext";
import { useNavigate } from "react-router-dom";

const EnterScore = ({ comp_id }) => {
    const host = "http://127.0.0.1:8000";
    let navigate = useNavigate();
    const [score, setScore] = useState({});
    const [parameters, setParameters] = useState([]);
    const [participants, setParticipants] = useState([]);

    const sc = useContext(scoreContext);
    const { scores, enterJudgeScore } = sc;

    const onChange = (e) => {
        setScore({ ...score, [e.target.name]: e.target.value });
    };

    let judge_total_score = 0;
    function enterScore(item, index, arr) {
        const keys = Object.keys(score);
        const values = Object.values(score);
        const parameter_id = item.uid;
        const i = keys.indexOf(parameter_id);
        judge_total_score = judge_total_score + parseFloat(values[i]);
        const query = {
            "competition": comp_id,
            "judge": localStorage.getItem("token"),
            "participant": score.team,
            "parameter": parameter_id,
            "score": values[i],
        };
        Axios.post(`${host}/scores/`, query, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => scores.concat(res.data))
        .catch((err) => console.error(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        parameters.forEach(enterScore);
        enterJudgeScore(
            comp_id,
            score.team,
            localStorage.getItem("token"),
            judge_total_score
        );
        judge_total_score = 0;
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getParameters(comp_id);
            getParticipants(comp_id);
        } else {
            navigate("/judge/login");
        }
        // eslint-disable-next-line
    }, []);

    const getParameters = async (comp_id) => {
        let url = `${host}/parameters/`;
        Axios.post(
            url,
            { "competition": comp_id },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => setParameters(res.data))
            .catch((err) => console.error(err));
    };

    const getParticipants = async (comp_id) => {
        let url = `${host}/participants/`;
        Axios.post(
            url,
            { "competition": comp_id },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => setParticipants(res.data))
            .catch((err) => console.error(err));
    };
    const k = 12 / (parameters.length + 2);

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className={`col-${k}`}>
                    <label htmlFor="team" className="form-label">
                        Team
                    </label>
                </div>
                {parameters.map((parameter) => {
                    return (
                        <div className={`col-${k}`}>
                            <label
                                key={parameter.uid}
                                htmlFor={parameter.parameter_name}
                                className="form-label"
                            >
                                {parameter.parameter_name}
                            </label>
                        </div>
                    );
                })}
                <div className={`col-${k}`}>
                    {/* <label htmlFor="score" className="form-label">Score</label> */}
                </div>
            </div>
            <div className="row">
                <div className={`col-${k}`}>
                    <select onChange={onChange} name="team" id="team">
                        <option>Select the team number</option>
                        {participants.map((participant) => {
                            return (
                                <option
                                    key={participant.uid}
                                    value={participant.uid}
                                >
                                    {participant.participant_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {parameters.map((parameter) => {
                    const p_id = parameter.uid;
                    return (
                        <div className={`col-${k}`}>
                            <input
                                type="number"
                                onChange={onChange}
                                name={p_id}
                                id={parameter.parameter_name}
                                value={score.p_id}
                            />
                        </div>
                    );
                })}
                <div className={`col-${k}`}>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EnterScore;
