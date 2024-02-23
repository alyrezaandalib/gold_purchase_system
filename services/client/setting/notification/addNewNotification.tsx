import http from "@/services/http";
import {getCookie} from "cookies-next";

export const addNewNotification = async (formData: any) => {

    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        text:formData.Notification,
    };

    return await http.post("", body, {headers});
};
