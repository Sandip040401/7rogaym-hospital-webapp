import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar } from './AppBar';
import { Footer } from './Footer';

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/gallery`);
        setPhotos(response.data);
      } catch (error) {
        toast.error('Failed to fetch photos');
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

  return (
    <>
      <AppBar />
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen pt-20 mt-10">
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Gallery</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {photos.length > 0 ? (
                photos.map((photo) => (
                  <div
                    key={photo._id}
                    className="relative overflow-hidden rounded-lg shadow-md transform transition duration-300 hover:scale-105"
                  >
                    <img
                      src={`data:${photo.contentType};base64,${arrayBufferToBase64(photo.image.data)}`}
                      alt="Gallery"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-xl text-gray-600">No photos available</p>
              )}
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};
