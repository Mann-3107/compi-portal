import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JudgeLogin = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const json = await Axios.post("http://localhost:8000/judge/login/", {
            "email": credentials.email,
            "password": credentials.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(json.data.authtoken){
            localStorage.setItem('token', json.data.authtoken);
            navigate('/judge');
        } else {
            alert("Invalid Credentials");
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div>
        <h2>Login to continue</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="ldap" className="form-label">Email</label>
                <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default JudgeLogin
