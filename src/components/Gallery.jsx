import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/gallery`);
        setPhotos(response.data);
      } catch (error) {
        toast.error('Failed to fetch photos');
      }
    };

    fetchPhotos();
  }, []);

  const handleAddPhoto = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setPhotos([...photos, response.data]);
      setFile(null);
      toast.success('Photo added successfully');
    } catch (error) {
      toast.error('Failed to add photo');
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        }
      });
      setPhotos(photos.filter(photo => photo._id !== id));
      toast.success('Photo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete photo');
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>
      <div className="mb-4 flex items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddPhoto}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Photo
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-4">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo._id} className="relative border p-2 rounded border-gray-300">
              <img
                src={`data:${photo.contentType};base64,${arrayBufferToBase64(photo.image.data)}`}
                alt="Gallery"
                className="w-32 h-32 object-contain"
              />
              <button
                onClick={() => handleDeletePhoto(photo._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-6 text-center">No photos in backend</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};


