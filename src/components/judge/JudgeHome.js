import React from "react";
import { Link } from "react-router-dom";
import Scores from "./Scores";

const JudgeHome = () => {
    return (
        <>
            {!localStorage.getItem("token") ? (
                <div className="container">
                    <Link
                        to="/judge/login"
                        className="btn btn-primary mx-1"
                        role="button"
                    >
                        Login
                    </Link>
                    <Link
                        to="/judge/signup"
                        className="btn btn-primary mx-1"
                        role="button"
                    >
                        Signup
                    </Link>
                </div>
            ) : (
                <Scores />
            )}
        </>
    );
};

export default JudgeHome;
