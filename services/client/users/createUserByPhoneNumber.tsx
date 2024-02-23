import http from "@/services/http";
import {getCookie} from "cookies-next";

export const createUserByPhoneNumber = async (addNewUserByLink : any) => {
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        phone_number: addNewUserByLink.phone_number,
        group_id : addNewUserByLink.group_id
    };
    return await http.post("", body, {headers});
};
