export const apiServices = {
    get base_url() {
        return import.meta.env.VITE_API_URL || "http://localhost:9000"; 
    },
    test: "Nav"
};

