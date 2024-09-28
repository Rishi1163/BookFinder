import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


const Bookcards = ({book}) => {
    console.log(book);
   
    
  return (
    <>
    <div className='main p-4 flex justify-around gap-10 flex-wrap'>
   {
    book.map((item)=>{
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        let title = item.volumeInfo && item.volumeInfo.title
        let amount = item.saleInfo.listPrice &&  item.saleInfo.listPrice.amount
        let id = item.id
        if (thumbnail !== undefined) {
            return(
                <>
                  <NavLink to={`/${id}`}>
                <div className='cards h-auto rounded-xl shadow-lg text-center w-48 p-3 cursor-pointer' key={id} onClick={()=>{setShow(true); setBookItem(item)}}>
                  <img src={thumbnail} alt="" className='w-32 ml-5 h-40'/>
                  <p className='mt-2 font-Poppins font-semibold text-[15px]'>{title}</p>
                  <button className='bg-[#FFF07C] px-4 rounded-lg text-sm py-1 cursor-pointer font-Roboto mt-2'>About Book</button>
                </div>
                </NavLink>
              </>
            )
        }
    })
   }       
    </div>
    {/* <div className='flex justify-center mt-3'>
    <button className='px-3 py-2 bg-[#FFF07C] rounded-lg cursor-pointer'>Show More</button>
    </div> */}
    </>
  )
}

export default Bookcards
