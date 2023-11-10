import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <div>
         <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link to={'/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>
            <i className='fa-solid fa-video fa-beat text-warning me-3'></i>{' '}
            Video Player
            </Link>
         
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header