import axios from "axios";

let url = "localhost:5000/api"

if(process.env.MODE === "PRODUCTION") {
    url = "hopefund-be-production.up.railway.app/api"
}

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
