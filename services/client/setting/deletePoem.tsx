import http from "@/services/http";
import {getCookie} from "cookies-next";

export const deletePooem = (id : any) => {
    const ID = Number(id)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    return http.delete(``, {headers})
};
