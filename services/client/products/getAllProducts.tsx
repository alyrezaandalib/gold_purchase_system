import http from "@/services/http";
import {getCookie} from "cookies-next";

export const getAllProducts = () => {

    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    return http.get("", {headers})
};
