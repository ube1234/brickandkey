import React, { useState, useEffect, useRef } from 'react';

const demoImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'; // Example image

const slides = [
  {
    title: 'Demo Image',
    content: (
      <div className="w-full h-72 flex items-center justify-center overflow-hidden">
        <img
          src={demoImage}
          alt="Demo"
          className="w-full h-72 object-cover rounded-2xl shadow-lg transition-transform duration-700"
        />
      </div>
    ),
  },
  {
    title: "Chennai's No.1 Builder Property Site",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">Chennai's No.1 Builder Property Site</h2>
        <p className="text-lg text-gray-700">Welcome to Brick and Key, your trusted partner for premium properties in Chennai.</p>
      </div>
    ),
  },
  {
    title: 'Home Loan',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">Home Loan</h2>
        <p className="text-lg text-gray-700">Get the best rates and support for your dream home loan with Brick and Key.</p>
      </div>
    ),
  },
  {
    title: 'Home Interior',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">Home Interior</h2>
        <p className="text-lg text-gray-700">Transform your space with our expert interior design solutions.</p>
      </div>
    ),
  },
  {
    title: 'Home Construction',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">Home Construction</h2>
        <p className="text-lg text-gray-700">Quality construction services for your next project, from start to finish.</p>
      </div>
    ),
  },
  {
    title: 'Join Venture',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">Join Venture</h2>
        <p className="text-lg text-gray-700">Partner with us for successful real estate ventures in Chennai.</p>
      </div>
    ),
  },
];


const MainSlides = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-white shadow-lg overflow-hidden" style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      <div className="h-72 flex items-center justify-center transition-all duration-700">
        {slides[current].content}
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button onClick={prevSlide} className="bg-blue-600 text-white rounded-full p-2 m-2 shadow hover:bg-blue-700 transition-all">
          &#8592;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button onClick={nextSlide} className="bg-blue-600 text-white rounded-full p-2 m-2 shadow hover:bg-blue-700 transition-all">
          &#8594;
        </button>
      </div>
      <div className="flex justify-center gap-2 py-4 bg-gray-50">
        {slides.map((slide, idx) => (
          <button
            key={slide.title}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
};

export default MainSlides;
