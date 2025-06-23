import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCourseStore } from '../Store/courseStore.js';

const CourseDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // get course ID from URL
    const { course, loading, error, fetchCourseById, deleteCourseById } = useCourseStore();

    useEffect(() => {
        if (id) fetchCourseById(id);
    }, [id, fetchCourseById]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            await deleteCourseById(course.courseId || course._id);
            navigate('/courses');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
    if (!course) return <div className="text-center mt-10">No course found.</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-300">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to='/courses'
                        className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded transition"
                    >
                        &larr; Back to Courses
                    </Link>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-amber-700 mb-8">{course.title}</h1>

                {/* Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input
                            type="text"
                            readOnly
                            value={course.title}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                        <input
                            type="text"
                            readOnly
                            value={course.courseId}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                        <textarea
                            readOnly
                            value={course.description}
                            rows={4}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed resize-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
                        <input
                            type="text"
                            readOnly
                            value={
                                Array.isArray(course.prerequisites) && course.prerequisites.length > 0
                                    ? course.prerequisites
                                        .map(prereq =>
                                            typeof prereq === 'object'
                                                ? `${prereq.title} (${prereq.courseId})`
                                                : prereq
                                        )
                                        .join(', ')
                                    : 'None'
                            }
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-10">
                    <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition font-semibold"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        Delete Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
