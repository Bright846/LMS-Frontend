import React from 'react';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import InstanceList from '../Components/InstanceList';

const InstancePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-tr from-amber-50 to-amber-200">
            <Navbar />
            <main className="flex-1 flex flex-col gap-y-4 mt-4 mb-4">
                <InstanceList />
            </main>
            <Footer />
        </div>
    );
};

export default InstancePage;
