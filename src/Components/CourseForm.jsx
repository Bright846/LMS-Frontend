import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useCourseStore } from '../Store/courseStore.js';

const CourseForm = () => {
    const [title, setTitle] = useState('');
    const [courseId, setCourseId] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPrereqs, setSelectedPrereqs] = useState([]);
    const { courses, fetchCourses, createCourse, loading } = useCourseStore();
    const navigate = useNavigate();

    // Fetch all courses on mount for dynamic prerequisites
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Memoize options for react-select
    const prerequisiteOptions = useMemo(
        () =>
            courses
                .filter(course => course.title && course.courseId)
                .map(course => ({
                    label: course.title,
                    value: course.courseId,
                })),
        [courses]
    );

    const handleCancel = (e) => {
        e.preventDefault();
        setTitle('');
        setCourseId('');
        setDescription('');
        setSelectedPrereqs([]);
        navigate('/courses');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prerequisites = selectedPrereqs.map(option => option.value);
        const courseData = { title, courseId, description, prerequisites };
        await createCourse(courseData);
        navigate('/courses');
    };

    const handleRemove = (value) => {
        setSelectedPrereqs(selectedPrereqs.filter(option => option.value !== value));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-300">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">Create New Course</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input
                            type="text"
                            placeholder="Course Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                        <input
                            type="text"
                            placeholder="Course ID"
                            value={courseId}
                            onChange={e => setCourseId(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                        <textarea
                            placeholder="Course Description"
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Prerequisite</label>
                        {selectedPrereqs.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {selectedPrereqs.map(option => (
                                    <span
                                        key={option.value}
                                        className="inline-flex items-center bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs"
                                    >
                                        {option.label}
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(option.value)}
                                            className="ml-1 text-red-500 hover:text-red-700"
                                            aria-label={`Remove ${option.label}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        <Select
                            isMulti
                            options={prerequisiteOptions}
                            value={selectedPrereqs}
                            onChange={setSelectedPrereqs}
                            placeholder="Select prerequisites..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isLoading={loading}
                        />
                    </div>
                    <div className="flex justify-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-amber-500 text-white px-6 py-2 rounded transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-600'}`}
                        >
                            {loading ? 'Creating...' : 'Create Course'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseForm;
