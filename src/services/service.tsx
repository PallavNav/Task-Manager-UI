export const apiServices = {
    get base_url() {
        console.log("Current URL:", location.href);
        return location.href.includes('localhost') 
            ? "http://localhost:9000/nav/taskify/" 
            : "https://taskify-nav-be.vercel.app/nav/taskify/";
    },
    test: "Nav"
};
