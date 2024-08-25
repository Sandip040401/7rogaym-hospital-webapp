import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/gallery`);
        setPhotos(response.data);
      } catch (error) {
        setError('Failed to fetch photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length);
    }, 3000); // Adjust the timing as needed

    return () => clearInterval(slideInterval);
  }, [photos.length]);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-[300px] mt-10 py-20">
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Gallery</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-xl">
              {error}
            </div>
          ) : (
            <div className="relative w-full overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 20}%)` }} // Move 20% for each slide to show 5 images at a time
              >
                {photos.map((photo, index) => (
                  <div
                    key={photo._id}
                    className="flex-shrink-0 w-1/5 px-2" // Each image takes up 1/5th of the width
                  >
                    <img
                      src={`data:${photo.contentType};base64,${arrayBufferToBase64(photo.image.data)}`}
                      alt="Gallery"
                      className="w-full h-[300px] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex justify-between items-center px-2">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? photos.length - 5 : prevSlide - 1))}
                >
                  &lt;
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length)}
                >
                  &gt;
                </button>
              </div>
              <div className="absolute bottom-0 w-full flex justify-center gap-2 py-2">
                {photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
