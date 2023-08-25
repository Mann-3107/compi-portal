import React, { useRef } from "react";

const CompetitionDetails = ({ comp, viewParameters }) => {
    const ref = useRef(null);
    const onRegisterParameter = () => {
        console.log("clicked");
    };

    return (
        <tr key={comp.uid}>
            <td className="px-4 text-center">{comp.comp_name}</td>
            <td className="px-4 text-center">
                <button
                    className="btn btn-primary"
                    onClick={onRegisterParameter}
                >
                    Register
                </button>
                
            </td>
            <td className="px-4 text-center">
            <button
                    className="btn btn-primary"
                    onClick={viewParameters}
                >
                    View
                </button>
            </td>
            <td className="px-4 text-center">
                <button
                    className="btn btn-primary"
                    onClick={onRegisterParameter}
                >
                    Generate
                </button>
            </td>
            <td className="px-4 text-center">
                <button
                    className="btn btn-primary"
                    onClick={onRegisterParameter}
                >
                    View
                </button>
            </td>
        </tr>
    );
};

export default CompetitionDetails;
