import http from "@/services/http";
import {getCookie} from "cookies-next";

export const updateNotifications = (updateNotification: any) => {
    const ID = updateNotification.id
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        text: updateNotification.Notification,
        enable: updateNotification.enable
    };

    return http.put(``, body, {headers})
};
