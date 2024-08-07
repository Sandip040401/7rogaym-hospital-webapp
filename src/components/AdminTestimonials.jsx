import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';

const AdminTestimonials = ({ baseUrl, token }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        toast.error('Failed to fetch testimonials');
      }
    };

    fetchTestimonials();
  }, [baseUrl]);

  const getEmbedUrl = (url) => {
    let videoId;
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v');
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleAddTestimonial = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/testimonials`, { videoLink: newTestimonial }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTestimonials([...testimonials, response.data]);
      setNewTestimonial('');
      toast.success('Testimonial added successfully');
    } catch (error) {
      toast.error('Failed to add testimonial');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseUrl}/api/testimonials/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== deleteId));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      toast.error('Failed to delete testimonial');
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="YouTube Video Link"
          value={newTestimonial}
          onChange={(e) => setNewTestimonial(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTestimonial}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Testimonial
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <div key={testimonial._id} className="relative border p-2 rounded border-gray-300">
              <iframe
                width="100%"
                height="200"
                src={getEmbedUrl(testimonial.videoLink)}
                title="Testimonial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => handleDeleteClick(testimonial._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No testimonials in backend</p>
        )}
      </div>
      <ToastContainer />
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Do you really want to delete this testimonial?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminTestimonials;
