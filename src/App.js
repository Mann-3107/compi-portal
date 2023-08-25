import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import CompetitionState from "./context/competition/competitionState";
import JudgeState from "./context/judge/judgeState";
import ParameterState from "./context/parameters/parameterState";
import ParticipantState from "./context/participant/participantState";
import ScoreState from "./context/scores/scoreState";

import Home from "./components/Home";
import JudgeHome from "./components/judge/JudgeHome";
import JudgeLogin from "./components/judge/JudgeLogin";
import JudgeSignup from "./components/judge/JudgeSignup";
import AdminHome from "./components/admin/AdminHome";
import AdminLogin from "./components/admin/AdminLogin";
import AdminSignup from "./components/admin/AdminSignup";



function App() {
  return(
    <>
    <CompetitionState>
      <JudgeState>
        <ParameterState>
        <ParticipantState>
          <ScoreState>
      <BrowserRouter>
      <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path="/judge" element={<JudgeHome/>} />
            <Route exact path='/judge/login' element={<JudgeLogin/>} />
            <Route exact path='/judge/signup' element={<JudgeSignup/>} />
            <Route exact path='/admin' element={<AdminHome/>} />
            <Route exact path='/admin/login' element={<AdminLogin/>} />
            <Route exact path='/admin/signup' element={<AdminSignup/>} />
          </Routes>
        </div>
      </BrowserRouter>
      </ScoreState>
      </ParticipantState>
      </ParameterState>
      </JudgeState>
      </CompetitionState>
    </>
  )
}

export default App