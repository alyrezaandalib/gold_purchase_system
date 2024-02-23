import http from "@/services/http";
import {getCookie} from "cookies-next";

export const updatePoems = (updatePoem: any) => {
    const ID = updatePoem.id
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        text: updatePoem.Poem,
        enable: true
    };

    return http.put(``, body, {headers})
};
