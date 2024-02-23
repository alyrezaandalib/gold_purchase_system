import http from "@/services/http";
import {getCookie} from "cookies-next";

export const updateGroupInfo = (updateGroupData: any) => {
    const ID = updateGroupData.id
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        name: updateGroupData.name,
        amount: updateGroupData.amount,
        type: updateGroupData.type,
    };

    return http.put(``, body, {headers})
};