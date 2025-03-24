export const apiServices = {
    base_url: import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}/nav/taskify`
        : 'http://localhost:9000/nav/taskify',
};
