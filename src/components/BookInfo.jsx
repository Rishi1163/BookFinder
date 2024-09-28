import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookInfo = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        setInfo(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    getInfo();
  }, [id]); 

 
  const removeHTMLTags = (text) => {
    return text?.replace(/<[^>]*>/g, '') || '';
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  const { volumeInfo } = info;

  return (
    <div className='bg-gray-100 min-h-[100%]'>
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img src={volumeInfo.imageLinks.smallThumbnail} alt="Book Cover" className="h-[300px] max-w-[300px] shadow-lg rounded-lg" />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{volumeInfo.title}</h1>
            <p className="text-xl font-semibold text-gray-600 mb-2">by <span className="text-gray-800">{volumeInfo.authors}</span></p>

            {/* Use the removeHTMLTags function for description */}
            <p className="text-gray-600 mb-4">{removeHTMLTags(volumeInfo.description)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Publisher</p>
                <p className="text-gray-800">{volumeInfo.publisher}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Release Date</p>
                <p className="text-gray-800">{volumeInfo.publishedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">PageCount</p>
                <p className="text-gray-800">{volumeInfo.pageCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-gray-800">{volumeInfo.categories?.[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
