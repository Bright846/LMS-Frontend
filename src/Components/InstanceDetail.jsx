import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useInstanceStore } from '../Store/InstanceStore.js';

const InstanceDetail = () => {
    const { year, semester, id } = useParams();
    const navigate = useNavigate();
    const { instance, fetchInstanceDetail, deleteInstanceDetail, loading, error } = useInstanceStore();

    useEffect(() => {
        if (year && semester && id) {
            fetchInstanceDetail(year, semester, id);
        }
    }, [year, semester, id, fetchInstanceDetail]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this instance?")) {
            await deleteInstanceDetail(year, semester, id);
            navigate('/instances');
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-amber-700">Loading...</div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }
    if (!instance) {
        return <div className="text-center py-10 text-amber-700">No instance found.</div>;
    }

    const { course } = instance;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-300">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to='/instances'
                        className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded transition"
                    >
                        &larr; Back to Instance List
                    </Link>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-amber-700 mb-8">Instance Detail</h1>

                {/* Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input
                            type="text"
                            readOnly
                            value={course?.title || ''}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                        <input
                            type="text"
                            readOnly
                            value={course?.courseId || ''}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <input
                            type="text"
                            readOnly
                            value={instance.semester || ''}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                            type="text"
                            readOnly
                            value={instance.year || ''}
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                        <textarea
                            readOnly
                            value={course?.description || ''}
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
                                course?.prerequisites && course.prerequisites.length
                                    ? course.prerequisites.map(pr => pr.title || pr).join(', ')
                                    : "None"
                            }
                            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-10">
                    <button
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition font-semibold"
                        onClick={handleDelete}
                    >
                        Delete Instance
                    </button>
                </div>
            </div>
        </div >
    );
}

export default InstanceDetail;
