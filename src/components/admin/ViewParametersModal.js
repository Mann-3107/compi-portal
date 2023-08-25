import React, { useEffect, useState } from 'react';
import { Axios } from 'axios';

const ViewParametersModal = ({comp}) => {
    const host = "http://127.0.0.1:8000";
    const [parameters, setParameters] = useState([]);

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

    useEffect(() => {
        getParameters(comp.uid)
    }, [])

  return (
    <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                View Parameters
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            competition is {comp.comp_name}
                            {/* {parameters.map((item) => {
                                return <p>hello</p>
                            })} */}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default ViewParametersModal