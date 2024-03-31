import React from 'react'
import"./Loader.css"
import { ProgressBar} from 'react-loader-spinner'
function Loader() {
  return (<>
  <div className='loader'>
     <h2 className='lable'>Loading....</h2>
    <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor='#f5a5da'
        borderColor='#e924d8'
        color="#e924d8"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div></>

  )
}

export default Loader