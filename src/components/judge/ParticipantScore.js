import React, { useContext, useEffect, useState } from 'react'
import judgeContext from '../../context/judge/judgeContext';
import Axios from 'axios';
import scoreContext from '../../context/scores/scoreContext';

const ParticipantScore = ({parameter_id, participant_id}) => {
    const host = "http://127.0.0.1:8000"
    const jc = useContext(judgeContext);
    const { judgeComp } = jc;

    const sc = useContext(scoreContext);
    const { scores, getScores, judgeScores } = sc;

    useEffect(() => {
        getScores()
    }, [judgeScores])

  return (
    scores.map((scoreElement) => {
        if(scoreElement.competition === judgeComp.uid && scoreElement.parameter === parameter_id && scoreElement.participant === participant_id && scoreElement.judge === localStorage.getItem('token')) {
            return <td className='px-4 text-center' key={scoreElement.uid}>{scoreElement.score}</td>
        }
    })
  )
}

export default ParticipantScore
