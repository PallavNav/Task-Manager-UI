export const apiServices = {
    get base_url() {
        console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
        return import.meta.env.VITE_API_URL || "http://localhost:9000/nav/taskify"; // Fallback
    },
    get IS_LOCAL() {
        return import.meta.env.IS_LOCAL
        // return false
    }
};
