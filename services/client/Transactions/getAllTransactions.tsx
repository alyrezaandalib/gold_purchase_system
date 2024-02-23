import http from "@/services/http";
import {getCookie} from "cookies-next";

export const getAllTransactions = () => {

    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    return http.get("", {headers})
};
