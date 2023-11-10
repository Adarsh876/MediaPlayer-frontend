import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import View from '../components/View'
import Add from '../components/Add'
import Category from '../components/Category'

function Home() {
  //create stste to do state-lifting
  const {UploadVideoStatus, setUploadVideoStatus} = useState({})
  return (
    <>
    <div className="container mt-5 mb-5 d-flex justify-content-between align-items-center">
      <div className='add-videos'>
        <Add setUploadVideoStatus={setUploadVideoStatus}/>
      </div>
      <Link to={'/watchhistory'} style={{textDecoration:'none',color:'white',fontSize:'30px'}} >Watch history</Link>
    </div>

    <div className="container w-100 mt-5 mb-5 d-flex justify-content-between">
      <div className="all-videos col-lg-9">
        <h4 className="mb-5">All Videos</h4>
        <View UploadVideoStatus={UploadVideoStatus}/>
      </div>
      <div className="category col-lg-3">
        <Category/>
      </div>
    </div>
    </>
  )
}

export default Home