import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { getAllcategory, getCategory, getVideo, updateCategory } from '../services/allAPI';
import { Col, Row } from 'react-bootstrap';
import Videocard from '../components/Videocard'


function Category() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryDetails, setCategoryDetails] = useState({})
  const [allCategory, setAllCategory] = useState([]);

  

  // function to add category
  
  const handleAddCategory = async()=>{
    console.log(categoryDetails);
    if(categoryDetails){
      let body = {
        categoryDetails,
        allVideos: []
      }

      //make api call
      const response = await getCategory(body)
      console.log(response);
      if(response.status>=200 && response.status<300){
        alert('Category successfully added')

        // to make the state null after successful addition
        setCategoryDetails("")
        handleClose()
      }
      else{
        console.log(response);
        alert('Something went wrong. Please try again later')
      }
      
    }
    else{
      alert('Please fill the form correctly')
    }
  }

  // function to get all category
  const getallcategory = async()=>{
    const {data} = await getAllcategory()
    setAllCategory(data)
  }
  console.log(allCategory);

  const dragOver = (e)=>{
    e.preventDefault()  // preventing the reloading of data which is send from videocard.jsx
    console.log('inside');

  }

  const videoDrop = async(e,categoryId)=>{
    console.log(`dropped inside the category id ${categoryId}`);
    // to get video id sent from videocard
    const videoid =  e.dataTransfer.getData("videoID")
    console.log(videoid);

    // api to get particular video that is dragged

  const {data} = await getVideo(videoid)
  console.log(data);

  // to find particular category with specified id
  let selectedCategory = allCategory?.find(item=>item.id===categoryId)
  console.log(selectedCategory);

  // data is added to allVideos array in the particular category with specified id
  selectedCategory.allVideos.push(data)
  console.log(selectedCategory);

  await updateCategory(categoryId,selectedCategory)
  getAllcategory()
  }

  

  useEffect(()=>{
    getallcategory()
  },[])


  return (
    <>
      <div className='d-grid ms-3'>
      <Button onClick={handleShow} className='btn btn-danger'>Add new category</Button>
      </div>
      {allCategory?.length>0?
      allCategory?.map((item) => (
        <div className="mt-5 border border-secondary rounded p-3">
          <div className="d-flex justify-content-between align-items-center" droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
            <h6>{item.categoryDetails}</h6>
            <Button variant="btn btn-danger">
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </div>
          <Row>
            <Col sm={12}>
              {
                item.allVideos?.length>0?
                item.allVideos.map(card=>(<Videocard displayVideo={card}/>))
                : <p>Nothing to display</p>
              }
            </Col>
        </Row>
        </div>

        
      ))
      :
      <p>Nothing to display</p>
    }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='border border-secondary rounded p-2'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
          <Form.Control onChange={(e)=>setCategoryDetails(e.target.value)} type="text" placeholder="Enter category name" />
          </Form.Group>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="danger">Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Category