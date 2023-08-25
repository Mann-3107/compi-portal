import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <div><Link to='/judge' className='btn btn-primary'>Judge Page</Link></div>
      <div><Link to='/admin' className='btn btn-primary'>Admin Page</Link></div>
    </div>
  )
}


export default Home