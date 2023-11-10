import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadAllVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function  Add({setUploadVideoStatus}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [video,setVideo] = useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""
  })
  const embedVideoLink = (e)=>{
    const {value} = e.target
    console.log(value.slice(-11));
    const link = `https://www.youtube.com/embed/${value.slice(-11)}`
    setVideo({...video,embedLink:link})
  }
  console.log(video);

  const handleUpload = async ()=>{
    const {id,caption,url,embedLink}= video
    if(!id || !caption || !url || !embedLink){
      toast.warning('please fill the form completely')
    }
    else{
      const response = await uploadAllVideo(video)
      console.log(response);
      if(response.status>=200 && response.status<300){
        toast.success(`${response.data.caption} is uploaded successfully`)

        // to change the value of setuploadVideoStatus
        setUploadVideoStatus(response.data);

        // making the state value none
        setVideo({
          id:"",
          caption:"",
          url:"",
          embedLink:""
         }) 

        // to close modal
        handleClose()
      }
      else{
        console.log(response);
        toast.error('Something went wrong. Please try again later')

      }
    }
  }
  return (
    <>
        <div className='d-flex'>
            <h5>Upload new video</h5>
            <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fa-2x"></i></button>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film text-warning me-2"></i> Upload video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details</p>
          <form className='border border-secondary rounded p-2'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={(e)=>setVideo({...video,id:e.target.value})} type="text" placeholder="Enter video id" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={(e)=>setVideo({...video,caption:e.target.value})} type="text" placeholder="Enter video caption" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={(e)=>setVideo({...video,url:e.target.value})} type="text" placeholder="Enter image url" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={embedVideoLink} type="text" placeholder="Enter youtube video link" />
          </Form.Group>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Add