import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/gallery`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Failed to fetch photos', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <img key={photo.id} src={photo.url} alt={photo.description} className="w-full h-auto" />
      ))}
    </div>
  );
};
