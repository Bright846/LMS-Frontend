import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCourseStore } from '../Store/courseStore.js';
import { useInstanceStore } from '../Store/InstanceStore.js';

const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2000 + i);
const semesters = [1, 2, 3, 4, 5, 6];

const InstanceForm = () => {
    const { courses, fetchCourses, loading: coursesLoading } = useCourseStore();
    const { createInstance, loading: instanceLoading } = useInstanceStore();

    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleCancel = (e) => {
        e.preventDefault();
        setSelectedCourseId("");
        setSelectedYear("");
        setSelectedSemester("");
        toast('Form cleared.', { icon: '🧹' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourseId || !selectedYear || !selectedSemester) {
            toast.error("All fields are required.");
            return;
        }
        await createInstance({
            year: selectedYear,
            semester: selectedSemester,
            course: selectedCourseId
        });
        setSelectedCourseId("");
        setSelectedYear("");
        setSelectedSemester("");
        toast.success('Course instance created!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-300">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">Create New Course Instance</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <select
                            value={selectedCourseId}
                            onChange={e => setSelectedCourseId(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            disabled={coursesLoading}
                        >
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course.courseId} value={course.courseId}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <select
                            value={selectedYear}
                            onChange={e => setSelectedYear(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                            <option value="">Select Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <select
                            value={selectedSemester}
                            onChange={e => setSelectedSemester(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                            <option value="">Select Semester</option>
                            {semesters.map(sem => (
                                <option key={sem} value={sem}>{sem}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={instanceLoading}
                            className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition font-semibold"
                        >
                            {instanceLoading ? 'Creating...' : 'Create Instance'}
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

export default InstanceForm;
