import React, { useState, useRef, useEffect } from 'react';
import SqFeetSlider from './SqFeetSlider';

const Header = ({ setFilters }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(200);
  const [pendingFilters, setPendingFilters] = useState({ sortBy: 'default', bedrooms: 'any', area: 'any', priceMin: 0, priceMax: 200, location: '', propertyType: [] });
  const [hidden, setHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
    // Only add click outside handler if search is in overlay, not in menu
    // (No handler needed when search is inside menu)
  }, [showSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure menu closes on navigation (optional, for better UX)
  const handleMenuNav = (href) => {
    setShowMenu(false);
    window.location.hash = href;
  };

  // Responsive navbars: mobile and desktop
  return (
    <header className={`bg-white/60 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-transform duration-500 ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} bg-blue-50 overflow-x-hidden`}>
      <div className="container mx-auto px-2 md:px-4 overflow-x-hidden">
        {/* Mobile Navbar */}
        <div className="flex items-center w-full justify-between md:hidden p-2">

          <button className="ml-2" onClick={() => setShowMenu(s => !s)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <div className="flex items-center">
            <img
              src="images/logo.png"
              alt="Brick & Key"
              className="h-8 cursor-pointer"
              onClick={() => window.location.hash = '/'}
            />
          </div>


          <div className="flex items-center space-x-4 mr-2">
            <button
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Search"
              onClick={() => setShowSearch(s => !s)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>Search
            </button>

          </div>

        </div>
        {/* Mobile nav dropdown */}
        {showMenu && (
          <div className="fixed top-16 left-0 w-full bg-white shadow-lg rounded-b-xl z-[9999] flex flex-col items-center py-4 space-y-2 pointer-events-auto md:hidden" style={{ position: 'fixed' }}>
            <a href="#home" onClick={() => handleMenuNav('#home')} className="block w-full text-center py-2 text-gray-600 hover:text-blue-600 border-b">Home</a>
            <a href="#about" onClick={() => handleMenuNav('#about')} className="block w-full text-center py-2 text-gray-600 hover:text-blue-600 border-b">About</a>

            <a href="#contact" onClick={() => handleMenuNav('#contact')} className="block w-full text-center py-2 text-gray-600 hover:text-blue-600 border-b">Blogs</a>
            <a href="#contact" onClick={() => handleMenuNav('#contact')} className="block w-full text-center py-2 text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        )}
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between w-full p-2">
          <div className="flex items-center">
            <img
              src="images/logo.png"
              alt="Brick and Key"
              className="h-8 cursor-pointer"
              onClick={() => window.location.hash = '/'}
            />
          </div>
          <nav className="flex-1 flex justify-evenly items-center space-x-2 md:space-x-8">
            <a href="#home" className="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition">Home</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition">About</a>

            <a href="#contact" className="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition">Blogs</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition">Contact</a>
            <div className="mr-2">
              <button
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
                aria-label="Search"
                onClick={() => setShowSearch(s => !s)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>Search
              </button>

            </div>
          </nav>
        </div>
      </div>
      {/* Search and filters (remains the same) */}
      {showSearch && (
        <div className="fixed top-20 left-0 w-full z-50 flex flex-col items-center pointer-events-none px-2">
          <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl bg-white rounded-xl shadow p-4 flex flex-col gap-4 border border-blue-100 animate-fade-in pointer-events-auto overflow-x-hidden">
            {/* First row: Sort By and Bedrooms (2 columns) */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Sort By Dropdown */}
              <div className="flex flex-col flex-1 min-w-[180px]">
                <label className="text-xs font-semibold text-gray-600 mb-1">Sort By</label>
                <select className="border rounded px-2 py-1 text-sm" value={pendingFilters.sortBy} onChange={e => setPendingFilters(f => ({ ...f, sortBy: e.target.value }))}>
                  <option value="default">Default</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="area">Area</option>
                  <option value="bedrooms">Bedrooms</option>
                </select>
              </div>
              {/* Bedrooms Dropdown */}
              <div className="flex flex-col flex-1 min-w-[180px]">
                <label className="text-xs font-semibold text-gray-600 mb-1">No. of Bedrooms</label>
                <select className="border rounded px-2 py-1 text-sm" value={pendingFilters.bedrooms} onChange={e => setPendingFilters(f => ({ ...f, bedrooms: e.target.value }))}>
                  <option value="any">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
            {/* Second row: Property Area and Price Range (2 columns) */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Property Area Dropdown */}
              <div className="flex flex-col flex-1 min-w-[180px]">
                <label className="text-xs font-semibold text-gray-600 mb-1">Property Area (Chennai)</label>
                <select className="border rounded px-2 py-1 text-sm" value={pendingFilters.area} onChange={e => setPendingFilters(f => ({ ...f, area: e.target.value }))}>
                  <option value="any">Any</option>
                  <option value="Adyar">Adyar</option>
                  <option value="Anna Nagar">Anna Nagar</option>
                  <option value="Porur">Porur</option>
                  <option value="Velachery">Velachery</option>
                  <option value="T Nagar">T Nagar</option>
                  <option value="Kodambakkam">Kodambakkam</option>
                  <option value="Madipakkam">Madipakkam</option>
                  <option value="Alwarpet">Alwarpet</option>
                  <option value="Ramapuram">Ramapuram</option>
                  <option value="Iyyapanthangal">Iyyapanthangal</option>
                  <option value="Manapakkam">Manapakkam</option>
                  <option value="Vadapalani">Vadapalani</option>
                  <option value="Valsaravakkam">Valsaravakkam</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              {/* Price Range Slider */}
              <div className="flex flex-col flex-1 min-w-[180px]">
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="1"
                    className="w-full accent-blue-600"
                    value={pendingFilters.priceMin}
                    onChange={e => setPendingFilters(f => ({ ...f, priceMin: Number(e.target.value) }))}
                  />
                  <input
                    type="range"
                    min={pendingFilters.priceMin}
                    max="200"
                    step="1"
                    className="w-full accent-blue-600"
                    value={pendingFilters.priceMax}
                    onChange={e => setPendingFilters(f => ({ ...f, priceMax: Number(e.target.value) }))}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹ {pendingFilters.priceMin}L</span>
                    <span>₹ {pendingFilters.priceMax}L</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">

              <div className="flex flex-col flex-1 min-w-[180px]">
                <label className="text-xs font-semibold text-gray-600 mb-1">Property Area (Chennai)</label>
                <select className="border rounded px-2 py-1 text-sm" value={pendingFilters.area} onChange={e => setPendingFilters(f => ({ ...f, area: e.target.value }))}>
                  <option value="any">Any</option>
                  <option value="Adyar">Adyar</option>
                  <option value="Anna Nagar">Anna Nagar</option>
                  <option value="Porur">Porur</option>
                  <option value="Velachery">Velachery</option>
                  <option value="T Nagar">T Nagar</option>
                  <option value="Kodambakkam">Kodambakkam</option>
                  <option value="Madipakkam">Madipakkam</option>
                  <option value="Alwarpet">Alwarpet</option>
                  <option value="Ramapuram">Ramapuram</option>
                  <option value="Iyyapanthangal">Iyyapanthangal</option>
                  <option value="Manapakkam">Manapakkam</option>
                  <option value="Vadapalani">Vadapalani</option>
                  <option value="Valsaravakkam">Valsaravakkam</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition" onClick={() => { setFilters(pendingFilters); setShowSearch(false); }}>Apply Filters</button>

              {/* Search input remains in header */}
            </div>

          </div>

        </div>
      )}

    </header>
  )
}

export default Header;