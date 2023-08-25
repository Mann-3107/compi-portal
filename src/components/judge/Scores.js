import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import judgeContext from "../../context/judge/judgeContext";
import ShowScore from "./ShowScore";
import EnterScore from "./EnterScore";

const Scores = () => {
    let navigate = useNavigate();

    const jc = useContext(judgeContext);
    const { judgeComp, getJudgeDetails } = jc;

    useEffect(() => {
        // if (localStorage.getItem("token")) {
        // getJudgeDetails();
        // } else {
        // navigate("/judge/login");
        // }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {judgeComp.map((comp) => {
                return (
                    <>
                        <h2>{comp.comp_name}</h2>
                        <EnterScore comp_id={comp.uid} />

                        <ShowScore comp_id={comp.uid} />
                    </>
                );
            })}
        </>
    );
};

export default Scores;
