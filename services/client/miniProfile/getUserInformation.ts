import http from "@/services/http";
import {getCookie} from "cookies-next";

export const getUserInformation = async () => {
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    return await http.get(``, {headers})
};
