import React, { useEffect, useState } from "react";
import Axios from "axios";
import ParticipantScore from "./ParticipantScore";
import ParticipantTotalScore from "./ParticipantTotalScore";

const ShowScore = ({ comp_id }) => {
    const host = "http://127.0.0.1:8000";
    const [parameters, setParameters] = useState([]);
    const [participants, setParticipants] = useState([]);
    const getParameters = async (comp_id) => {
        let url = `${host}/parameters/`;
        Axios.post(
            url,
            { competition: comp_id },
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
            { competition: comp_id },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => setParticipants(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getParameters(comp_id);
            getParticipants(comp_id);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="p-4">Team No</th>
                        {parameters.map((parameter) => {
                            return (
                                <th className="p-4" key={parameter.uid}>
                                    {parameter.parameter_name}
                                </th>
                            );
                        })}
                        <th className="p-4">Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => {
                        return (
                            <tr>
                                <td className="px-4 text-center">
                                    {participant.participant_name}
                                </td>
                                {parameters.map((parameter) => {
                                    return (
                                        <ParticipantScore
                                            parameter_id={parameter.uid}
                                            participant_id={participant.uid}
                                        />
                                    );
                                })}
                                <ParticipantTotalScore
                                    participant_id={participant.uid}
                                />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ShowScore;
