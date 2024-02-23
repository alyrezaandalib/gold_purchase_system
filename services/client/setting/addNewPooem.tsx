import http from "@/services/http";
import {getCookie} from "cookies-next";

export const addNewPooem = async (formData: any) => {
    // console.log(formData)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        text:formData.Poem,
        enable: true
    };

    // console.log(body)

    return await http.post("", body, {headers});
};
