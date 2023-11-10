import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { deleteHistory, getAllHistory } from '../services/allAPI';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function WatchHistory() {

  const [history, setHistory] = useState([])
    
   const getHistory = async()=>{
    const {data} = await getAllHistory()
    setHistory(data)
   }
   console.log(history);

  //function to delete history
   const handleDelete = async(id)=>{
    await deleteHistory(id)
    getHistory()
  }  

  useEffect(()=>{
    getHistory()
  },[])

  return (
    <>
      <h3>WATCH HISTORY</h3> 
      <Link to={'/home'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white', fontSize:'20px'}}>Back Home</Link>

    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Caption</th>
          <th>Url</th>
          <th>Timestamp</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {history.length>0?
        history.map((item)=>(
        <tr>
          <td>{item.id}</td>
          <td>{item.caption}</td>
          <td><a href={item.embedLink}>{item.embedLink}</a></td>
          <td>{item.timeStamp}</td>
          <td><Button  onClick={()=>handleDelete(item?.id)}  className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></Button></td>
        </tr>))
        :
        <p>Nothing to display</p>
        }
      </tbody>
    </Table>

    </>
  )
}

export default WatchHistory