import http from "@/services/http";
import {getCookie} from "cookies-next";

export const rejectTheTransaction = async ( id :any) => {
    const ID = String(id)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        status: 0,
    };

    return await http.patch(``, body, {headers});
};
