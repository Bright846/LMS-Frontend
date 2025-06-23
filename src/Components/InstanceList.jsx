import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useInstanceStore } from '../Store/InstanceStore.js';

const InstanceList = () => {
    const { instances, fetchInstancesByYearSemester, deleteInstanceDetail, loading, error } = useInstanceStore();
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    // Years and semesters for dropdowns
    const years = useMemo(() =>
        Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2000 + i), []
    );
    const semesters = [1, 2, 3, 4, 5, 6];

    // Fetch when both year and semester are selected
    useEffect(() => {
        if (selectedYear && selectedSemester) {
            fetchInstancesByYearSemester(selectedYear, selectedSemester);
        }
    }, [selectedYear, selectedSemester, fetchInstancesByYearSemester]);

    // Filter further by course if selected
    const filteredInstances = instances.filter(instance =>
        (selectedCourse === "" || instance.title === selectedCourse)
    );

    const handleDelete = (instance) => {
        if (window.confirm(`Delete instance: ${instance.course.title} (${instance.year} S${instance.semester})?`)) {
            deleteInstanceDetail(instance._id);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold text-amber-700 mb-6">Course Instances</h2>
            <div className="mb-8">
                <span className="block text-lg font-semibold text-gray-700 mb-2">Filters</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>
            </div>

            <div className="overflow-x-auto">
                {!selectedYear || !selectedSemester ? (
                    <div className="text-center py-4 text-amber-700">
                        Please select both Year and Semester to view instances.
                    </div>
                ) : loading ? (
                    <div className="text-center py-4 text-amber-700">Loading...</div>
                ) : error ? (
                    <div className="text-center py-4 text-red-600">{error}</div>
                ) : (
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-amber-400 text-amber-900">
                            <tr>
                                <th className="py-3 px-6 text-left font-bold">Course Title</th>
                                <th className="py-3 px-6 text-left font-bold">Course ID</th>
                                <th className="py-3 px-6 text-left font-bold">Year</th>
                                <th className="py-3 px-6 text-left font-bold">Semester</th>
                                <th className="py-3 px-6 text-left font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInstances.length > 0 ? (
                                filteredInstances.map(instance => (
                                    <tr key={instance._id} className="hover:bg-amber-50 transition">
                                        <td className="py-3 px-6 border-b border-gray-100">{instance.course?.title || '-'}</td>
                                        <td className="py-3 px-6 border-b border-gray-100">{instance.course?.courseId || '-'}</td>
                                        <td className="py-3 px-6 border-b border-gray-100">{instance.year}</td>
                                        <td className="py-3 px-6 border-b border-gray-100">{instance.semester}</td>
                                        <td className="py-3 px-6 border-b border-gray-100 flex gap-2">
                                            <Link
                                                to={`/instances/${instance.year}/${instance.semester}/${instance.course.courseId}`}
                                                className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 transition"
                                            >
                                                View Details
                                            </Link>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                onClick={() => handleDelete(instance)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-amber-700">No course instances found.</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    );
};

export default InstanceList;
