import http from "@/services/http";
import {getCookie} from "cookies-next";

export const addStaticGroup = async (addGroupData: any) => {

    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        name: addGroupData.name,
    };

    return await http.post("", body, {headers});
};
