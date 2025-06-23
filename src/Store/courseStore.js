import { axiosInstance } from '../../utils/axios.js';
import toast from "react-hot-toast";
import { create } from "zustand";

export const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,
  course: null,
  createCourse: async (courseData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post('/api/courses', courseData);
      set((state) => ({
        courses: [...state.courses, res.data.course],
        loading: false,
      }));
      toast.success('Course created successfully!');
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create course',
      });
      toast.error(error.response?.data?.message || 'Failed to create course');
    }
  },

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/api/courses');
      set({ courses: res.data.courses, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch courses',
      });
    }
  },

  fetchCourseById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/api/courses/${id}`);
      set({ course: res.data.course, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch course',
      });
    }
  },

  deleteCourseById: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/api/courses/${id}`);
      set(state => ({
        loading: false,
        // Remove the deleted course from the courses array
        courses: state.courses.filter(
          course => (course.courseId || course._id) !== id
        ),
      }));
      toast.success('Course deleted successfully!');
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete course',
      });
      toast.error(error.response?.data?.message || 'Failed to delete course');
    }
  }
}));