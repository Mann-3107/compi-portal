import React, { useContext, useEffect, useState } from 'react'
import judgeContext from '../../context/judge/judgeContext';
import scoreContext from '../../context/scores/scoreContext';

const ParticipantTotalScore = ({participant_id}) => {
    const jc = useContext(judgeContext);
    const { judgeComp } = jc;

    const sc = useContext(scoreContext);
    const { judgeScores, getJudgeScores } = sc;

    useEffect(() => {
        getJudgeScores()
    }, [])

    return (
        judgeScores.map((scoreElement) => {
            if(scoreElement.competition === judgeComp.uid && scoreElement.participant === participant_id && scoreElement.judge === localStorage.getItem('token')) {
                return <td className='px-4 text-center' key={scoreElement.uid}>{scoreElement.judge_total_score}</td>
            }
        })
    )
}

export default ParticipantTotalScore
