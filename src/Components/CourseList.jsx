import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseStore } from '../Store/courseStore.js';

// Helper to get unique prerequisites (flattened, ignoring "-")
const getUniquePrerequisites = (courses) => {
    if (!courses) return [];
    const prereqs = courses
        .map(c => Array.isArray(c.prerequisites) ? c.prerequisites : [c.prerequisites])
        .flat()
        .filter(p => p && p !== '-');
    return Array.from(new Set(prereqs));
};

const CourseList = () => {
    const { courses, course, loading, error, fetchCourses, deleteCourseById } = useCourseStore();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleDelete = async (course) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            await deleteCourseById(course.courseId || course._id);
            navigate('/courses');
        }
    };
    const uniquePrereqs = getUniquePrerequisites(courses);

    const filteredCourses = (courses || []).filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
        // Handle both array and string for prerequisites
        const coursePrereqs = Array.isArray(course.prerequisites)
            ? course.prerequisites.join(', ')
            : course.prerequisites;
        const matchesFilter = filter
            ? (Array.isArray(course.prerequisites)
                ? course.prerequisites.includes(filter)
                : course.prerequisites === filter)
            : true;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="overflow-x-auto p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by course title"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-amber-400"
                />
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-amber-400"
                >
                    <option value="">All Prerequisites</option>
                    {uniquePrereqs.map(prereq =>
                        typeof prereq === 'object' ? (
                            <option key={prereq.courseId} value={prereq.courseId}>
                                {prereq.title} ({prereq.courseId})
                            </option>
                        ) : (
                            <option key={prereq} value={prereq}>{prereq}</option>
                        )
                    )}
                </select>
            </div>

            {loading && (
                <div className="text-center text-amber-700">Loading courses...</div>
            )}
            {error && (
                <div className="text-center text-red-600">{error}</div>
            )}

            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-amber-400">
                    <tr>
                        <th className="py-3 px-6 text-left text-amber-900 font-bold">Course Title</th>
                        <th className="py-3 px-6 text-left text-amber-900 font-bold">Course ID</th>
                        <th className="py-3 px-6 text-left text-amber-900 font-bold">Prerequisites</th>
                        <th className="py-3 px-6 text-left text-amber-900 font-bold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map(course => (
                        <tr key={course.courseId || course._id} className="hover:bg-amber-50 transition">
                            <td className="py-2 px-6">{course.title}</td>
                            <td className="py-2 px-6">{course.courseId || course._id}</td>
                            <td className="py-2 px-6">
                                {Array.isArray(course.prerequisites) && course.prerequisites.length > 0
                                    ? course.prerequisites
                                        .map(prereq =>
                                            typeof prereq === 'object'
                                                ? `${prereq.title} (${prereq.courseId})`
                                                : prereq
                                        )
                                        .join(', ')
                                    : '-'}
                            </td>
                            <td className="py-2 px-6 flex gap-2">
                                <Link to={`/courses/${course.courseId}`} className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 transition">View Details</Link>
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => handleDelete(course)} disabled={loading}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {filteredCourses.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-amber-700">No courses found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
