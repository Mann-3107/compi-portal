import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ldap: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/adminlogin/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ldap: credentials.ldap, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if(json){
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('is_admin', json.is_admin);
            console.log(localStorage.getItem('token'));
            console.log(localStorage.getItem('is_admin'));
            navigate('/admin');
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
                <label htmlFor="ldap" className="form-label">Ldap</label>
                <input type="email" className="form-control" value={credentials.ldap} id="ldap" name="ldap" aria-describedby="emailHelp" onChange={onChange}/>
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

export default AdminLogin
