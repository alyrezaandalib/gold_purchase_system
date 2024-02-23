import http from "@/services/http";
import {getCookie} from "cookies-next";

export const addNewUser = (formData: any) => {
    // console.log(formData)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        first_name: formData.FName,
        last_name: formData.LName,
        phone_number: formData.PhoneNumber,
        melli_code: formData.NCode,
        postal_code: formData.PostalCode,
        address: formData.Address,
        password : formData.Password,
        group_id : formData.group_id ,
        username: formData.username,
    };

    return http.post("", body, {headers});
};
