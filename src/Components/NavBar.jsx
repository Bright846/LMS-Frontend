import React, { useState, useRef, useEffect } from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [instanceDropdownOpen, setInstanceDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setInstanceDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex flex-col md:flex-row items-center justify-between w-full px-6 py-4 shadow-md bg-white rounded-b-lg">
            <div className="mb-4 md:mb-0 flex items-center">
                <img src={Logo} alt="LMS Logo" className="h-12 w-12 object-contain rounded-full shadow-sm" />
                <span className="ml-3 text-2xl font-bold text-amber-700 tracking-tight">LMS</span>
            </div>
            <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-8 bg-amber-400/90 px-4 py-2 rounded-lg shadow-sm">
                <Link
                    to="/courses"
                    className="text-lg text-amber-900 font-medium hover:text-white hover:bg-amber-500 px-3 py-1 rounded transition"
                >
                    Courses
                </Link>
                <Link
                    to="/courses/create-course"
                    className="text-lg text-amber-900 font-medium hover:text-white hover:bg-amber-500 px-3 py-1 rounded transition"
                >
                    Create Course
                </Link>

                {/* Instance dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setInstanceDropdownOpen(!instanceDropdownOpen)}
                        className="text-lg text-amber-900 font-medium hover:text-white hover:bg-amber-500 px-3 py-1 rounded transition flex items-center gap-1"
                        aria-haspopup="true"
                        aria-expanded={instanceDropdownOpen}
                    >
                        Instance
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${instanceDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    {instanceDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                            <Link
                                to="/instances/create"
                                className="block px-4 py-2 text-amber-900 hover:bg-amber-500 hover:text-white transition"
                                onClick={() => setInstanceDropdownOpen(false)}
                            >
                                Create Instance
                            </Link>
                            <Link
                                to="/instances"
                                className="block px-4 py-2 text-amber-900 hover:bg-amber-500 hover:text-white transition"
                                onClick={() => setInstanceDropdownOpen(false)}
                            >
                                All Instances
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
