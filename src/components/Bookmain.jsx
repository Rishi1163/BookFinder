import React, { useState } from 'react';
import img1a from '../assets/images/img1.jpg';
import logo from '../assets/svg/logo.svg';
import Bookcards from './Bookcards';


const Bookmain = () => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const searchBook = async () => {
    const trimmedSearch = search.trim(); 
    if (trimmedSearch) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${trimmedSearch}&key=${apiKey}&maxResults=40`
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          setBookData(data.items);
          setError("");
        } else {
          setBookData([]);
          setError("Data not found");
        }
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching data");
      }
    } else {
      setBookData([]);
      setError("Please enter a search term");
    }
  };
  

  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      searchBook();
    }
  };

  return (
    <div>
      <div className='relative'>
        <img src={img1a} alt="" className='w-full md:h-[30rem] opacity-50 z-0' />
        <img src={logo} alt="" className='z-10 absolute top-6 w-32 ml-3 md:ml-8' />
        <div className='absolute top-[5rem] right-[3.5rem] md:left-80 mt-4 md:top-40 ml-4 md:ml-10'>
          <h1 className='text-black z-10 text-2xl text-center w-[19rem] md:w-[40rem] md:text-6xl'>
            Find the Perfect Book,<br />Every Time.
          </h1>
        </div>
        <div className='flex absolute bottom-16 w-80 border-2 border-black left-[3.5rem] px-2 py-1 rounded-3xl md:w-[40rem] md:px-3 md:bottom-24 md:left-[22rem]'>
          <input
            type="text"
            placeholder='Search For Books'
            onKeyPress={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-transparent outline-none placeholder:text-black w-80 md:w-[30rem]'
          />
          <button
            className='ml-6 bg-[#FFF07C] px-3 rounded-3xl text-sm py-2 md:text-base outline-none md:px-5 md:ml-12'
            onClick={searchBook}
          >Search</button>
        </div>
      </div>
      <div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Bookcards book={bookData} />
      </div>
    </div>
  );
};
export default Bookmain;