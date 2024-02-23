import axios from "axios";
import {baseURL} from "@/meta/_baseURL";

axios.defaults.baseURL = baseURL

const http = {
    patch: axios.patch,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default http;
