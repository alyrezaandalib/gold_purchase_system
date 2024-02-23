import http from "@/services/http";
import {getCookie} from "cookies-next";

export const getAllOpenTransactions = () => {

    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    return http.get("", {headers})
};
