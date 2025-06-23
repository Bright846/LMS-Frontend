import { axiosInstance } from '../../utils/axios.js';
import toast from "react-hot-toast";
import { create } from "zustand";

export const useInstanceStore = create((set) => ({
    instances: [],
    loading: false,
    error: null,
    instance: null,

    createInstance: async (instanceData) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.post('/api/instances', instanceData);
            set((state) => ({
                instances: [...state.instances, res.data.instance], // assuming backend returns { instance }
                loading: false,
            }));
            toast.success('Instance created successfully!');
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || 'Failed to create instance',
            });
            toast.error(error.response?.data?.message || 'Failed to create instance');
        }
    },

    fetchInstancesByYearSemester: async (year, semester) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get(`/api/instances/${year}/${semester}`);
            set({ instances: res.data.instances, loading: false }); // backend should return { instances: [...] }
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || 'Failed to fetch instances',
            });
        }
    },

    fetchInstanceDetail: async (year, semester, courseId) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get(`/api/instances/${year}/${semester}/${courseId}`);
            set({ instance: res.data.instance, loading: false }); // backend should return { instance: {...} }
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || 'Failed to fetch instance',
            });
        }
    },

    deleteInstanceDetail: async (year, semester, courseId) => {
        set({ loading: true, error: null });
        try {
            await axiosInstance.delete(`/api/instances/${year}/${semester}/${courseId}`);
            set(state => ({
                loading: false,
                instances: state.instances.filter(
                    instance => (instance.courseId || instance._id) !== courseId
                ),
            }));
            toast.success('Instance deleted successfully!');
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || 'Failed to delete instance',
            });
            toast.error(error.response?.data?.message || 'Failed to delete instance');
        }
    }
}));
