import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const observers = useRef([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        setAlert({ message: 'Failed to fetch testimonials', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [baseUrl]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const videos = document.querySelectorAll('iframe');
      
      videos.forEach((video, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.src = `${video.dataset.src}&autoplay=1&mute=1`;
              } else {
                video.src = video.dataset.src; // Stops the video when it's out of view
              }
            });
          },
          { threshold: 0.5 } // Adjust threshold as needed
        );
        observer.observe(video);
        observers.current.push(observer);
      });
    }
    
    return () => {
      observers.current.forEach((observer) => observer.disconnect());
    };
  }, [testimonials]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(testimonials.length / 3)); // Cycle through slides
    }, 5000); // Adjust the timing as needed

    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  const getEmbedUrl = (url) => {
    let videoId;
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v');
    }
    return `https://www.youtube.com/embed/${videoId}?mute=1`; // No autoplay initially
  };

  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-100 min-h-[300px] py-20">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Testimonials</h2>
        
        {alert.message && (
          <div className={`mb-4 p-4 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {alert.message}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Move 100% for each set of 3 videos
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="flex-shrink-0 w-full md:w-1/3 px-4" // Each video takes up 1/3rd of the width in larger screens
                >
                  <iframe
                    data-src={getEmbedUrl(testimonial.videoLink)}
                    width="100%"
                    height="250"
                    title="Testimonial Video"
                    className="rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex justify-between items-center">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? Math.ceil(testimonials.length / 3) - 1 : prevSlide - 1))}
              >
                &lt;
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(testimonials.length / 3))}
              >
                &gt;
              </button>
            </div>
            <div className="absolute bottom-0 w-full flex justify-center gap-2 py-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
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
  );
};

export default Testimonials;
