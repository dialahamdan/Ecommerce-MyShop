import React from 'react'
import './NotFound.css'
import photo from './img/notFound.jpg'
function NotFound() {
  return (
    <>
     <img
         className="w-75 text-center mx-auto d-block mb-3 notFPhoto"
         src={photo}
         alt="Not found"
       />
    <div className='notFound'>
    <h2>Opps..!</h2>
    <p>This page is not available , try again with correct request</p>
    </div>
    </>
  )
}

export default NotFound
