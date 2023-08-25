import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import competitionContext from "../../context/competition/competitionContext";
import ViewParametersModal from "./ViewParametersModal";
import CompetitionDetails from "./CompetitionDetails";

const AdminHome = () => {
    const ref = useRef(null);
    const cc = useContext(competitionContext);
    const { competitions, getCompetitions } = cc;

    const [parameters, setParameters] = useState([]);

    const navigate = useNavigate();
    

    useEffect(() => {
      
        if (localStorage.getItem("token")) {
            getCompetitions();
        } else {
          navigate("/admin/login")
        }
    }, []);

    const viewParameters = (params) => {
      ref.current.click()
      setParameters(params)
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="px-4 text-center">Competition Name</th>
                        <th className="px-4 text-center">
                            Register Parameters
                        </th>
                        <th className="px-4 text-center">View Parameters</th>
                        <th className="px-4 text-center">
                            Generate Final Score Sheet
                        </th>
                        <th className="px-4 text-center">
                            View Final Score Sheet
                        </th>
                    </tr>
                </thead>
                <tbody>
                {competitions.map((compi) => {
                    return <>
                    <CompetitionDetails comp={compi} viewParameters={viewParameters} />
                    <ViewParametersModal comp={compi} parameters={parameters} />
                    </>
                })}
                </tbody>
            </table>
            <button
                    ref={ref}
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    View
                </button>
            
        </>
    );
};

export default AdminHome;
