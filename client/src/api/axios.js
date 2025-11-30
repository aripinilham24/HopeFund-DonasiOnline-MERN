import axios from "axios";

let url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: `${url}/api/`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export {api, url}