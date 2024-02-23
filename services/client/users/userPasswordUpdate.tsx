import http from "@/services/http";
import {getCookie} from "cookies-next";

export const userPasswordUpdate = (updateUserPassword: any , id:any) => {
    const ID = Number(id)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        password: updateUserPassword
    };

    return http.patch(``, body, {headers})
};