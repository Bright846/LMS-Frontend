import React from 'react';
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import CourseList from '../Components/CourseList';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-tr from-amber-50 to-amber-200">
            <NavBar />
            <main className="flex-1">
                <CourseList />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
