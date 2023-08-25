import Axios from 'axios';
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import competitionContext from '../../context/competition/competitionContext';

const JudgeSignup = () => {
  const cc = useContext(competitionContext);
  const {competitions, getCompetitions} = cc;
  const [credentials, setCredentials] = useState({email: "", password: "", name: "", competition: "", contact: ""});

    const navigate = useNavigate();
    
    useEffect(() => {
        getCompetitions()
        console.log(competitions)
      // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const json = await Axios.post('http://127.0.0.1:8000/judge/signup/', {
        "judge_email": credentials.email,
        "judge_password": credentials.password,
        "judge_name": credentials.name,
        "judge_contact": credentials.contact,
        "competition": credentials.competition
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(json.data.authtoken) {
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
        <h2>Signup to continue</h2>
        <form onSubmit={handleSubmit}>
          <div className="row my-2">
            <div className="col-3">
                  <label htmlFor="name" className="form-label">Name</label>
            </div>
            <div className="col-6">
                  <input type="text" className="form-control" value={credentials.name} id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
                  <label htmlFor="contact" className="form-label">Contact</label>
            </div>
            <div className="col-6">
                  <input type="text" className="form-control" value={credentials.contact} id="contact" name="contact" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
                  <label htmlFor="email" className="form-label">Email</label>
            </div>
            <div className="col-6">
                  <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
            <label htmlFor="password" className="form-label">Password</label>
            </div>
            <div className="col-6">
                <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
            <label htmlFor="competition" className="form-label">Competition</label>
            </div>
            <div className="col-6">
            <select value={credentials.competition} name="competition" id="competition" onChange={onChange}>
              <option>Select the competition</option>
                {competitions.map((competition) => {
                    return <option key={competition.uid} value={competition.uid}>{competition.comp_name}</option>
                })}
            </select>
            </div>
            <div className="col-3"></div>
          </div>
            
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default JudgeSignup
