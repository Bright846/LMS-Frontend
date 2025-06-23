import React from 'react'
import HomePage from './Pages/HomePage';
import CreateCoursePage from './Pages/CreateCoursePage';
import CourseDetailPage from './Pages/CourseDetailsPage';
import CreateInstancePage from './Pages/CreateInstancePage';
import InstancePage from './Pages/InstancePage';
import InstanceDetailPage from './Pages/InstanceDetailPage';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/courses' element={<HomePage />} />
          <Route path='/courses/create-course' element={<CreateCoursePage />} />
          <Route path='/courses/:id' element={<CourseDetailPage />} />
          <Route path='/instances/create' element={<CreateInstancePage />} />
          <Route path='/instances' element={<InstancePage />} />
          <Route path='/instances/:year/:semester/:id' element={<InstanceDetailPage />} />

        </Routes>
      </BrowserRouter>
      <Toaster />

    </>
  )
}

export default App;
