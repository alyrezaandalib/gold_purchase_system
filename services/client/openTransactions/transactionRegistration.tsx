import http from "@/services/http";
import {getCookie} from "cookies-next";

export const transactionRegistration = async ( id :any) => {
    const ID = String(id)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        status: 1,
    };

    return await http.patch(``, body, {headers});
};
