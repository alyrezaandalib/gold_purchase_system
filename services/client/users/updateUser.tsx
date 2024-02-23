import http from "@/services/http";
import {getCookie} from "cookies-next";

export const UpdateUserInfo = (updateUserData: any) => {
    const ID = Number(updateUserData.id)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        id: updateUserData.id,
        first_name: updateUserData.FName,
        last_name: updateUserData.LName,
        phone_number: updateUserData.PhoneNumber,
        melli_code: updateUserData.NCode,
        postal_code: updateUserData.PostalCode,
        address: updateUserData.Address,
    };

    return http.put(`/`, body, {headers})
};