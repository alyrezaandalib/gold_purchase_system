import http from "@/services/http";
import {getCookie} from "cookies-next";

export const updateUserInformation = (userInfo: any) => {
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {};


    return http.put(``, body, {headers})
};
